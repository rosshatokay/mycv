class Settings::ProfileController < ApplicationController
  def index
    resume = current_user.resume || {}
    resume_data = {
      highlights: resume.highlights || [],
      role: resume.role,
      location: resume.location,
      bio: resume.bio,
      website_url: resume.website_url&.gsub("https://", "")&.gsub("http://", ""),
      linkedin_url: resume.linkedin_url,
      education: resume.education || {},
    }
    # resume_data["highlights"] = Array(resume_data["highlights"]).presence || [""]
    # resume_data["website_url"] = resume_data.website_url.gsub("https://", "").gsub("http://", "")

    render inertia: "Settings/EditProfile", props: {
      resume: resume_data.to_json,
    }
  end

  def update
    if current_user.update(user_params)
      flash.inertia[:toast] = { description: "Profile updated successfully!" }
      redirect_to settings_profile_index_path
    else
      flash.inertia[:toast] = { description: "Could not save profile!" }
      redirect_to settings_profile_index_path, inertia: { errors: inertia_errors_for(current_user) }
    end
  end

  private

  def user_params
    permitted = params.require(:user).permit(
      :full_name,
      :avatar,
      resume: [
        :bio,
        :role,
        :location,
        :website_url,
        :linkedin_url,
        highlights: [],
        education: [
          :start_year,
          :end_year,
          :major,
          :degree,
          :school,
          :gpa,
        ],
      ],
    )

    # Convert frontend 'resume' and 'education' structures into Active Record nested attributes
    return permitted unless permitted[:resume].present?

    resume_params = permitted.delete(:resume)

    # Ensure current_user's existing resume ID is bound
    resume_params[:id] = current_user.resume&.id

    if resume_params[:education].present?
      education_params = resume_params.delete(:education)
      # Ensure existing education ID is bound to prevent duplicate creation
      education_params[:id] = current_user.resume&.education&.id
      resume_params[:education_attributes] = education_params
    end

    # Sanitize and format URL schemes strictly
    if resume_params[:website_url].present?
      resume_params[:website_url] = sanitize_url(resume_params[:website_url])
    end

    permitted[:resume_attributes] = resume_params
    permitted
  end

  def sanitize_url(url)
    cleaned = url.strip.sub(%r{\Ahttps?://}, "")
    "https://#{cleaned}"
  end
end

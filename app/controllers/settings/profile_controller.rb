class Settings::ProfileController < ApplicationController
  def index
    resume = current_user.resume || {}
    resume_data = {
      highlights: resume.highlights,
      role: resume.role,
      location: resume.location,
      bio: resume.bio,
      website_url: resume.website_url,
      linkedin_url: resume.linkedin_url,
      education: resume.education,
    }
    # resume_data["highlights"] = Array(resume_data["highlights"]).presence || [""]
    # resume_data["website_url"] = resume_data.website_url.gsub("https://", "").gsub("http://", "")

    render inertia: "Settings/EditProfile", props: {
      resume: resume_data.to_json,
    }
  end

  def update
    if params[:user][:resume].present?
      params[:user][:resume_attributes] = params[:user].delete(:resume)

      if current_user.resume.present?
        params[:user][:resume_attributes][:id] = current_user.resume.id
      end

      if params[:user][:resume_attributes][:education].present?
        params[:user][:resume_attributes][:education_attributes] = params[:user][:resume_attributes].delete(:education)
      end
    end

    if current_user.update(user_params)
      flash.inertia[:toast] = { description: "Profile updated successfuly!" }
      redirect_to settings_profile_index_path
    else
      flash.inertia[:toast] = { description: "Could not save profile!" }
      redirect_to settings_profile_index_path, inertia: { errors: inertia_errors_for(current_user) }
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :full_name,
      resume_attributes: [
        :id,
        :bio,
        :role,
        :location,
        :website_url,
        :linkedin_url,
        highlights: [],
        education_attributes: [
          :start_year,
          :end_year,
          :major,
          :degree,
          :school,
          :gpa,
        ],
      ],
    )
  end
end

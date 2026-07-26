class Settings::ProfileController < ApplicationController
  def index
    render inertia: "Profiles/Edit", props: {
      resume: current_user.resume.to_json(only: [:bio, :location, :role, :website_url, :linkedin_url]),
    }
  end

  def update
    if params[:user][:resume].present?
      params[:user][:resume_attributes] = params[:user].delete(:resume)
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
        :bio,
        :role,
        :location,
        :website_url,
        :linkedin_url,
      ],
    )
  end
end

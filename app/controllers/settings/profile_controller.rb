class Settings::ProfileController < ApplicationController
  def index
    render inertia: "Profiles/Edit", props: {
      resume: current_user.resume.to_json(only: [:bio, :location, :role]),
    }
  end

  def update
    if current_user.update(user_params)
      flash.inertia[:toast] = { description: "Profile updated successfuly!" }
      redirect_to settings_profile_index_path
      # return
    else
      # redirect_to index, inertia: { errors: current_user.errors }
      # return
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
      ],
    )
  end
end

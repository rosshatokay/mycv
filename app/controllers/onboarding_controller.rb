class OnboardingController < ApplicationController
  skip_before_action :check_onboarding

  def index
    if current_user.onboarded?
      redirect_to root_path and return
    end

    resume = current_user.resume

    render inertia: "Onboarding/Index", props: {
      resume: {
        role: resume.role,
        location: resume.location,
        bio: resume.bio,
      },
      steps: {
        profile_completed: current_user.profile_completed?,
        about_completed: current_user.about_completed?,
        highlights_completed: current_user.highlights_completed?,
      },
    }
  end

  def update
    return redirect_to root_path if current_user.onboarded?

    current_user.assign_attributes(user_params)
    current_user.onboarded_at = Time.current

    if current_user.save(context: :onboarding)
      # flash.inertia[:toast] = { description: "Profile updated successfully!" }
      redirect_to onboarding_index_path
    else
      flash.inertia[:toast] = { description: "Could not save profile!" }
      redirect_to onboarding_index_path, inertia: { errors: inertia_errors_for(current_user) }
    end
  end

  private

  def user_params
    permitted = params.require(:user).permit(
      :avatar,
      :full_name,
      resume: [
        :bio,
        :location,
        :role,
        highlights: [],
      ],
    )

    # If no resume params were passed, just return what we have
    return permitted unless permitted[:resume].present?

    # Extract the resume hash
    resume_params = permitted.delete(:resume)

    # Bind the existing resume ID if it exists
    resume_params[:id] = current_user.resume&.id if current_user.resume.present?

    # Assign to resume_attributes for accepts_nested_attributes_for
    permitted[:resume_attributes] = resume_params

    permitted
  end
end

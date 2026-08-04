class ProfilesController < ApplicationController
  allow_unauthenticated_access only: %i[ show ]

  def show
    if params[:username].nil?
      redirect_to profile_path(current_user&.username) if user_signed_in?
      redirect_to root_path if !user_signed_in?
    else
      user = User.includes(resume: :projects).find_by(username: params[:username])
      resume = user.resume
      template_id = Template.valid_id?(resume.template_id) ? resume.template_id : "classic"
      resume_data = resume_data(resume)
      resume_data["highlights"] = Array(resume_data["highlights"]).presence || []
      resume_data["highlights"].reject!(&:empty?)

      render inertia: "Profiles/Show", props: {
        template_id: template_id,
        user: user.to_profile,
        projects: user.resume.formatted_projects || [],
        resume: resume_data,
        is_owner: current_user&.id === user.id,
        education: resume.education,
        work_experiences: resume.formatted_work_experiences,
      }
    end
  end

  private

  def resume_data(resume)
    resume&.slice(
      :location,
      :role,
      :phone_number,
      :bio,
      :highlights,
      :website_url,
      :linkedin_url
    )
  end
end

class ProfilesController < ApplicationController
  allow_unauthenticated_access only: %i[ show ]

  def show
    if params[:username].nil?
      redirect_to profile_path(current_user&.username) if user_signed_in?
      redirect_to root_path if !user_signed_in?
    else
      user = User.find_by(username: params[:username])
      resume_data = resume_data(user)
      resume_data["highlights"] = Array(resume_data["highlights"]).presence || []
      resume_data["highlights"].reject!(&:empty?)

      render inertia: "Profiles/Show", props: {
        user: user.to_profile,
        projects: user.resume.projects || [],
        resume: resume_data.to_json,
      }
    end
  end

  private

  def resume_data(user)
    user.resume&.slice(
      :location,
      :role,
      :phone_number,
      :bio,
      :highlights,
      :website_url,
      :linkedin_url
    )
  end

  def example_projects
    [
      {
        id: SecureRandom.base36,
        year: 2026,
        title: "Tomes Club",
        description: "Social e-reading website platform",
        points: [
          "Built a social e reading website with Ruby on Rails and Supabase (with PostgreSQL).",
          "Created dozens of UI components with Javascript, Rails Turbo and Stimulus.",
        ],
        images: [
          "https://cdn.dribbble.com/userupload/48504652/file/de81920d8b9e265eca5545ecec0850d5.jpg?resize=367x275&vertical=center",
          "https://cdn.dribbble.com/userupload/48508162/file/5bd1d3a6d0801163e02895cc7f99d99f.png?resize=367x275&vertical=center",
        ],
      },
      {
        id: SecureRandom.base36,
        year: 2025,
        title: "Gleam News",
        description: "Social e-reading website platform",
        points: [
          "Built a social e reading website with Ruby on Rails and Supabase (with PostgreSQL).",
          "Created dozens of UI components with Javascript, Rails Turbo and Stimulus.",
        ],
        images: [
          "https://cdn.dribbble.com/userupload/48503142/file/5ba48afe027cea3d194acbaef27dfa49.jpg?resize=367x275&vertical=center",
          "https://cdn.dribbble.com/userupload/48505787/file/ab05a28f14cd257e40f50ad72e5450d9.jpg?resize=367x275&vertical=center",
        ],
      },
    ]
  end
end

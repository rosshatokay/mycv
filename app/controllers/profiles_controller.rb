class ProfilesController < ApplicationController
  allow_unauthenticated_access only: %i[ show ]

  def show
    if params[:username].nil?
      redirect_to profile_path(current_user&.username) if user_signed_in?
      redirect_to root_path if !user_signed_in?
    else
      user = User.find_by(username: params[:username])

      render inertia: "Profiles/Show", props: {
        user: user.to_profile,
        projects: example_projects,
        resume: user.resume.to_json(only: [:role, :location, :bio, :website_url, :linkedin_url]),
      }
    end
  end

  private

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
        images: [],
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
        images: [],
      },
    ]
  end
end

class StaticController < ApplicationController
  allow_unauthenticated_access

  def index
    redirect_to profile_path(current_user.username) and return if user_signed_in?

    images = Template.all.map { |t| t[:preview_image_url] }
    # Array.new(24) { |i| "https://pub-199cbbb8716c47d894e05d31fd02edfe.r2.dev/images/#{i + 520}.jpg" }.map { |i| images << i }

    render inertia: "Static/Index", props: {
      images: images,
    }
  end

  def terms
    render inertia: "Static/Terms", props: {
      raw_terms: File.read("app/assets/terms.md"),
    }
  end

  def privacy
    render inertia: "Static/Privacy", props: {
      raw_privacy: File.read("app/assets/privacy.md"),
    }
  end
end

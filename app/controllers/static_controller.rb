class StaticController < ApplicationController
  allow_unauthenticated_access

  def index
    redirect_to profile_path(current_user.username) and return if user_signed_in?

    render inertia: "Static/Index"
  end
end

class RegistrationsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_path, alert: "Try again later." }

  def new
    if user_signed_in?
      flash.inertia[:toast] = { description: "You are already signed in" }
      redirect_to root_path and return
    end

    render inertia: "Auth/Signup"
  end

  def create
    return if user_signed_in?
    user = User.new(user_params)
    accepted_tos = params[:user][:accept_tos] === true

    user.errors.add(:accept_tos, "Terms of service and privacy policy must be accepted") unless accepted_tos

    if accepted_tos && user.save
      start_new_session_for user
      redirect_to root_path, notice: "Account created successfully!"
    else
      redirect_to new_user_registration_path, inertia: { errors: inertia_errors_for(user) }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end
end

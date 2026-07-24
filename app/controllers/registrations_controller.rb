class RegistrationsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_path, alert: "Try again later." }

  def new
    render inertia: "Auth/Signup"
  end

  def create
    user = User.new(user_params)

    if user.save
      start_new_session_for user
      redirect_to root_path, notice: "Account created successfully!"
    else
      formatted_errors = user.errors.to_hash.transform_keys do |key|
        "user.#{key}"
      end.transform_values(&:first)

      redirect_to register_path, inertia: { errors: formatted_errors }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end
end

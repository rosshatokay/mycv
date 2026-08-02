class Settings::SecurityController < ApplicationController
  def index
    render inertia: "Settings/Security"
  end

  def update
    if current_user.update(params.permit(:password, :password_confirmation))
      flash.inertia[:toast] = { description: "Password has been reset." }
      redirect_to root_path, notice: "Password has been reset."
    else
      flash.inertia[:toast] = { description: "Could not channge password" }
      redirect_to settings_security_index_path, alert: "Passwords did not match."
    end
  end
end

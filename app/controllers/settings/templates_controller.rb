class Settings::TemplatesController < ApplicationController
  def update
    is_valid = Template.valid_id?(params[:template_id])

    return if !is_valid

    if current_user.resume.update(template_id: params[:template_id])
      flash.inertia[:toast] = { description: "Template successfully changed" }
      render json: { success: true }
    else
      render json: { success: false }
    end
  end
end

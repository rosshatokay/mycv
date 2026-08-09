include ResumeData

class TemplatesController < ApplicationController
  allow_unauthenticated_access

  def index
    render inertia: "Templates/Index", props: {
      templates: [],
    }
  end

  def show
    is_valid_id = Template.valid_id?(params[:id])

    raise ActionController::RoutingError.new("Not Found") unless is_valid_id

    template = Template.find(params[:id])

    render inertia: "Templates/Show", props: {
      template: template,
      **template_placeholder,
      is_template_preview: true,
    }
  end

  private

  def template_placeholder
    ResumeData.placeholder
  end
end

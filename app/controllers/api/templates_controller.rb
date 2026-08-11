class Api::TemplatesController < ApplicationController
  def index
    render json: Template.all
  end
end

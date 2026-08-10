class Api::TemplatesController < ApplicationController
  def index
    sleep 1
    render json: Template.all * 2
  end
end

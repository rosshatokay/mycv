class ProjectsController < ApplicationController
  def index
    render inertia: "Projects/Index"
  end
end

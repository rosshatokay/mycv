class StaticController < ApplicationController
  def index
    render inertia: "Static/Index"
  end
end

class AnalyticsController < ApplicationController
  def index
    render inertia: "Analytics/Index"
  end
end

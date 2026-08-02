class Settings::AppearanceController < ApplicationController
  def index
    render inertia: "Settings/Appearance"
  end
end

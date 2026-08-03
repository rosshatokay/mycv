class ErrorsController < ApplicationController
  skip_before_action :check_onboarding if respond_to?(:check_onboarding)

  def not_found
    respond_to do |format|
      format.html {
        render inertia: "Errors/Index", props: {
                 status_code: 404,
                 title: "Page not found",
                 description: "The page you are looking for doesn't exist.",
               }, status: :not_found
      }
      format.json { render json: { error: "Not Found" }, status: :not_found }
    end
  end

  def unprocessable_entity
    respond_to do |format|
      format.html {
        render inertia: "Errors/Index", props: {
                 status_code: 422,
                 title: "Unprocessable Entity",
                 description: "The change you wanted was rejected. Try to refreshing this page.",
               }, status: :unprocessable_entity
      }
      format.json { render json: { error: "Unprocessable Entity" }, status: :unprocessable_entity }
    end
  end

  def internal_server_error
    respond_to do |format|
      format.html {
        render inertia: "Errors/Index", props: {
                 status_code: 500,
                 title: "Internal Server Error",
                 description: "Looks like something went wrong. Try refreshing this page in a bit.",
               }, status: :internal_server_error
      }
      format.json { render json: { error: "Internal Server Error" }, status: :internal_server_error }
    end
  end
end

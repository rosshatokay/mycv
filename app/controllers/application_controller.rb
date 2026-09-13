class ApplicationController < ActionController::Base
  include Authentication
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern

  helper_method :user_signed_in?
  helper_method :current_user

  inertia_share auth: -> {
                  {
                    user: current_user&.as_json(
                      only: [
                        :email, :username, :full_name,
                      ],
                    )&.merge({
                      id: current_user&.hashid,
                      avatar_url: current_user&.avatar_url,
                      is_admin: current_user&.admin?,
                    }),
                  }
                }

  before_action :check_onboarding

  def check_onboarding
    # Only redirect if they are logged in and haven't finished onboarding
    if authenticated? && !current_user.onboarded?
      redirect_to onboarding_index_path
    end
  end

  def current_user
    @current_user ||= Current.user
  end

  def user_signed_in?
    current_user.present?
  end

  unless Rails.env.production?
    around_action :n_plus_one_detect

    def n_plus_one_detect
      Prosopite.scan
      yield
    ensure
      Prosopite.finish
    end
  end

  private

  def inertia_errors_for(record, object_name = nil)
    prefix = object_name || record.model_name.param_key

    record.errors.to_hash.transform_keys do |key|
      "#{prefix}.#{key}"
    end.transform_values(&:first)
  end

  def seo_tags(title: "", description: "", image: "")
    arr = []

    if title.present?
      arr << { title: title }
      arr << { proprety: "og:title", content: "#{title} – Tomes" }
    end

    if description.present?
      arr << { name: "description", content: description }
      arr << { property: "og:description", content: description }

      arr << { name: "twitter:description", content: description }
    end

    arr << { property: "og:image", content: image.presence || "/splash.jpg" }
    arr << { name: "twitter:image", content: image.presence || "/splash.jpg" }

    arr << { name: "twitter:card", content: "summary" }
    [
      { property: "og:site_name", content: "Tomes" },
      { property: "og:url", content: request.url },
    ].map { |item| arr << item }

    arr
  end
end

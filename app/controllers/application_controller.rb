class ApplicationController < ActionController::Base
  include Authentication
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  helper_method :user_signed_in?
  helper_method :current_user

  inertia_share auth: -> {
                  {
                    user: current_user&.as_json(only: [:email, :username, :full_name])&.merge({ id: current_user&.hashid }),
                  }
                }

  def current_user
    @current_user ||= Current.user
  end

  def user_signed_in?
    current_user.present?
  end

  private

  def inertia_errors_for(record, object_name = nil)
    prefix = object_name || record.model_name.param_key

    record.errors.to_hash.transform_keys do |key|
      "#{prefix}.#{key}"
    end.transform_values(&:first)
  end
end

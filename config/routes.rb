class AuthenticatedConstraint
  def matches?(request)
    session_id = request.cookie_jar.signed[:session_id]
    return false unless session_id

    # Check that the session exists AND the user it belongs to still exists
    Session.exists?(id: session_id) && Session.find(session_id).user.present?
  end
end

Rails.application.routes.draw do
  get "login", to: "sessions#new", as: :login
  get "register", to: "registrations#new", as: :register
  get "/@:username", to: "profiles#show", as: :profile

  resource :registration, only: [:create]
  resource :session, only: [:create, :destroy]
  resources :passwords, param: :token

  namespace :settings do
    resources :profile, only: [:index] do
      collection do
        patch :update
      end
    end
  end

  # Redirect to localhost from 127.0.0.1 to use same IP address with Vite server
  constraints(host: "127.0.0.1") do
    get "(*path)", to: redirect { |params, req| "#{req.protocol}localhost:#{req.port}/#{params[:path]}" }
  end

  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "static#index"
end

source "https://rubygems.org"

gem "rails", "~> 8.1.3"
gem "pg", "~> 1.1"
gem "puma", ">= 5.0"
gem "jbuilder"
gem "haml"
gem "bcrypt", "~> 3.1.7"
gem "hashid-rails"
gem "prosopite"
gem "pg_query"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "imagekitio-rails"
gem "active_storage_validations"

gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem "bootsnap", require: false

gem "kamal", require: false

gem "thruster", require: false

gem "image_processing", "~> 1.2"

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  gem "bundler-audit", require: false

  gem "brakeman", require: false
  gem "dotenv-rails"
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "web-console"
  gem "rails-erd"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

gem "inertia_rails", "~> 3.22"

gem "vite_rails", "~> 3.11"

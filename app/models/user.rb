class User < ApplicationRecord
  include Hashid::Rails

  has_secure_password
  has_many :sessions, dependent: :destroy
  has_one :resume, dependent: :destroy
  has_many :projects, through: :resume, dependent: :destroy

  after_create :build_default_resume

  accepts_nested_attributes_for :resume, update_only: true

  BLACKLISTED_USERNAMES = File.readlines(Rails.root.join("config", "blacklist.txt")).map do |line|
    line.strip.downcase
  end.reject { |line| line.empty? || line.start_with?("#") }.freeze

  normalizes :email, with: ->(e) { e.strip.downcase }
  validates :email, presence: true, uniqueness: true
  validates :username,
            # presence: { on: ONBOARDING_STEP },
            uniqueness: true,
            format: { with: /\A[\w]+\z/, message: "only allows letters, numbers, and underscores", allow_blank: true },
            length: {
              minimum: 3,
              maximum: 20,
              message: "must be between 3 and 20 characters",
              allow_blank: true,
            },
            exclusion: {
              in: BLACKLISTED_USERNAMES,
              message: "not allowed",
            }
  validates :password, presence: true, length: { minimum: 8, message: "has to be at least 8 characters long" }, if: -> { password.present? }, allow_blank: true

  def to_profile
    {
      id: hashid,
      full_name: full_name,
      username: username,
      email: email,
    }
  end

  def avatar_url
    "https://images.unsplash.com/photo-1785064038262-8f469a571616?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D"
  end

  private

  def build_default_resume
    create_resume!
  end
end

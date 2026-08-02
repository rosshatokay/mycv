class User < ApplicationRecord
  include Hashid::Rails

  ONBOARDING_STEP = :onboarding

  has_secure_password
  has_many :sessions, dependent: :destroy
  has_one :resume, dependent: :destroy

  has_many :projects, through: :resume, dependent: :destroy
  has_many :work_experiences, through: :resume, dependent: :destroy
  has_one :education, through: :resume

  has_one_attached :avatar, service: :imagekit

  after_create :build_default_resume

  before_save :set_avatar_path, if: -> { avatar.attached? && avatar.attachment.blob.key.exclude?("/") }

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
  validates :avatar, content_type: ["image/png", "image/jpeg", "image/webp"], size: { less_than: 5.megabytes }
  validates :full_name, presence: { on: ONBOARDING_STEP }, length: {
                          minimum: 2,
                          maximum: 20,
                          message: "must be between 2 and 70 characters",
                          allow_blank: true,
                        }

  def onboarded?
    profile_completed? && about_completed? && highlights_completed?
  end

  def profile_completed?
    full_name.present?
  end

  def about_completed?
    resume.role.present? && resume.location.present? && resume.bio.present?
  end

  def highlights_completed?
    resume.highlights.present? && !resume.highlights.all?(&:empty?)
  end

  def to_profile
    {
      id: hashid,
      full_name: full_name,
      username: username,
      email: email,
      avatar_url: avatar_url,
    }
  end

  def avatar_url(size = 100)
    avatar.attached? ? avatar.service.url(avatar.blob.key, transformation: [{ width: size, height: size }]) : nil
  end

  private

  def build_default_resume
    create_resume!
  end

  def set_avatar_path
    # We prepend the folder structure to the existing random key
    blob = avatar.blob
    blob.key = "#{Rails.env}/users/avatars/#{blob.key}"
  end
end

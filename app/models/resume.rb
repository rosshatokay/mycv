class Resume < ApplicationRecord
  ONBOARDING_STEP = :onboarding

  belongs_to :user

  has_many :projects, dependent: :destroy
  has_many :work_experiences, dependent: :destroy

  has_one :education

  validates_with PostfixUrlValidator, attributes: [:website_url]
  validates :linkedin_url, format: {
                             with: /\A\/in\/([a-zA-Z0-9_-]{3,100})\/?\z/,
                             message: "must be a valid LinkedIn profile path",
                           }, allow_blank: true

  validates :role, length: { maximum: 100 }, presence: { on: ONBOARDING_STEP }, allow_blank: true
  validates :location, length: { maximum: 100 }, presence: { on: ONBOARDING_STEP }, allow_blank: true
  validates :bio, length: { maximum: 1000 }, presence: { on: ONBOARDING_STEP }, allow_blank: true

  after_validation :format_custom_url, if: -> { website_url.present? && errors.empty? }
  validate :validate_highlights_format

  accepts_nested_attributes_for :education, update_only: true

  def formatted_projects(curr_user = nil)
    projects&.map { |p|
      raw_url = p.url.gsub("http://", "").gsub("https://", "")
      {
        title: p.title,
        id: p.hashid,
        highlights: p.highlights || [],
        url: "https://#{raw_url}",
        description: p.description,
        year: p.year,
        is_owner: p.resume.user.id === curr_user&.id,
        images: p.get_images_urls,
      }
    } || []
  end

  def formatted_work_experiences
    work_experiences&.map { |w|
      {
        **w.slice(:company, :role, :start_year, :end_year),
        location: w.location,
        id: w.hashid,
      }
    }
  end

  private

  def validate_highlights_format
    return if highlights.nil?

    unless highlights.is_a?(Array)
      errors.add(:highlights, "must be an array")
      return
    end

    if highlights.size > 4
      errors.add(:highlights, "cannot exceed 4 items")
    end

    if highlights.any? { |h| h.to_s.length > 150 }
      errors.add(:highlights, "each highlight must be under 150 characters")
    end
  end

  def format_custom_url
    self.website_url = "https://#{website_url.strip.downcase.gsub("https://", "").gsub("http://", "")}"
  end
end

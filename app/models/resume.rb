class Resume < ApplicationRecord
  belongs_to :user
  has_many :projects, dependent: :destroy

  validates_with PostfixUrlValidator, attributes: [:website_url]
  validates :linkedin_url, format: {
                             with: /\A\/in\/([a-zA-Z0-9_-]{3,100})\/?\z/,
                             message: "must be a valid LinkedIn profile path",
                           }, allow_blank: true

  after_validation :format_custom_url, if: -> { website_url.present? && errors.empty? }

  private

  def format_custom_url
    self.website_url = "https://#{website_url.strip.downcase}"
  end
end

class Resume < ApplicationRecord
  belongs_to :user

  validate :valid_website_url
  validates :linkedin_url, format: {
                             with: /\A\/in\/([a-zA-Z0-9_-]{3,100})\/?\z/,
                             message: "must be a valid LinkedIn profile path",
                           }, allow_blank: true

  private

  def valid_website_url
    return if website_url.blank?

    normalized_url = website_url.gsub("https://", "")
    uri = URI.parse("https://#{normalized_url}")

    unless uri.is_a?(URI::HTTP) && uri.host.present?
      errors.add(:website_url, "is not a valid URL")
    end
  rescue URI::InvalidURIError
    errors.add(:website_url, "is not a valid URL")
  end
end

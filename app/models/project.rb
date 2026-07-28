class Project < ApplicationRecord
  include Hashid::Rails

  belongs_to :resume

  validates_with PostfixUrlValidator, attributes: [:url]
  after_validation :format_custom_url, if: -> { url.present? && errors.empty? }

  def stripped_url
    url.gsub("https://", "").gsub("http://", "")
  end

  private

  def format_custom_url
    self.url = "https://#{url.strip.downcase}"
  end
end

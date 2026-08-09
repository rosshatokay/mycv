class Project < ApplicationRecord
  include Hashid::Rails

  belongs_to :resume

  validates_with PostfixUrlValidator, attributes: [:url]
  after_validation :format_custom_url, if: -> { url.present? && errors.empty? }

  has_many_attached :images, service: :imagekit

  before_save :set_image_paths, if: -> { images.attached? }

  def stripped_url
    url.gsub("https://", "").gsub("http://", "")
  end

  def get_images_urls
    result = images.attached? ? images.map { |img|
      img.service.url(img.blob.key, transformation: [{ width: 1200, height: 800, crop: "fill" }])
    } : []

    [
      "https://rosshatokay.dev/assets/img/tomes/img4.jpg",
      "https://rosshatokay.dev/assets/img/tomes/img5.jpg",
    ].map { |img| result << img }

    result
  end

  private

  def format_custom_url
    self.url = "https://#{url.strip.downcase}"
  end

  def set_image_paths
    images.each do |attachment|
      blob = attachment.blob
      if blob.key.exclude?("/")
        blob.key = "#{Rails.env}/projects/images/#{blob.key}"
      end
    end
  end
end

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
    images.attached? ? images.map { |img|
      img.service.url(img.blob.key, transformation: [{ width: 600, height: 400, crop: "fill" }])
    } : []
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

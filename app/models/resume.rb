class Resume < ApplicationRecord
  belongs_to :user

  has_many :projects, dependent: :destroy
  has_one :education

  validates_with PostfixUrlValidator, attributes: [:website_url]
  validates :linkedin_url, format: {
                             with: /\A\/in\/([a-zA-Z0-9_-]{3,100})\/?\z/,
                             message: "must be a valid LinkedIn profile path",
                           }, allow_blank: true

  after_validation :format_custom_url, if: -> { website_url.present? && errors.empty? }

  accepts_nested_attributes_for :education, update_only: true

  def formatted_projects(curr_user = nil)
    projects.map { |p|
      {
        title: p.title,
        id: p.hashid,
        highlights: p.highlights || [],
        url: p.url,
        description: p.description,
        year: p.year,
        is_owner: p.resume.user.id === curr_user&.id,
        # images: p.get_images_urls,
        images: [
          "https://ik.imagekit.io/highlightcv/development/projects/images/s9fztwdxvpdsraiggxlmoxd2rz7p?tr=c-fill,h-400,w-600",
          "https://i.pinimg.com/1200x/73/a5/7c/73a57c4f3a3ed5c396aba3226ea99294.jpg",
          "https://minimal.gallery/wp-content/uploads/2022/02/rafa-cobiella-2-1440x800.jpg",
        ],
      }
    }
  end

  private

  def format_custom_url
    self.website_url = "https://#{website_url.strip.downcase.gsub("https://", "").gsub("http://", "")}"
  end
end

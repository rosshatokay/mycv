class Template
  ALL = [
    {
      id: "classic",
      name: "Classic",
      preview_image_url: "/templates/previews/classic.png",
    },
  ].freeze

  def self.all
    ALL
  end

  def self.find(id)
    ALL.find { |t| t[:id] == id.to_s } || ALL.first
  end

  def self.valid_id?(id)
    ALL.any? { |t| t[:id] == id.to_s }
  end
end

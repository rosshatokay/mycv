class PostfixUrlValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank?

    # 1. Use 'value' (the actual URL string), NOT 'website_url'
    normalized_url = value.gsub("https://", "").gsub("http://", "")
    uri = URI.parse("https://#{normalized_url}")

    # 2. Use 'record.errors' instead of 'errors'
    unless uri.is_a?(URI::HTTP) && uri.host.present? && uri.host.include?(".")
      record.errors.add(attribute, options[:message] || "is not a valid URL")
    end
  rescue URI::InvalidURIError
    record.errors.add(attribute, options[:message] || "is not a valid URL")
  end
end

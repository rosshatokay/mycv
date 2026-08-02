class WorkExperience < ApplicationRecord
  include Hashid::Rails

  belongs_to :resume

  validates :role, presence: true
  validates :city, presence: true
  validates :country, presence: true, inclusion: {
                        in: ISO3166::Country.codes,
                        message: "%{value} is not a valid country code",
                      }

  validates :start_year, presence: true, numericality: {
                           only_integer: true,
                           greater_than_or_equal_to: 1900,
                           less_than_or_equal_to: 2100,
                         }

  validates :end_year, numericality: {
                         only_integer: true,
                         greater_than_or_equal_to: 1900,
                         less_than_or_equal_to: 2100,
                       }, allow_blank: true

  # validate chronological order
  validate :start_year_must_be_before_or_equal_to_end_year

  def location
    "#{city}, #{country}"
  end

  private

  def start_year_must_be_before_or_equal_to_end_year
    return if start_year.blank? || end_year.blank?

    if start_year > end_year
      errors.add(:start_year, "must be less than or equal to end year")
    end
  end
end

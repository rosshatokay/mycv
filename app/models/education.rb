class Education < ApplicationRecord
  belongs_to :resume

  # validate presence and bounds for both years
  validates :start_year, :end_year, presence: true, numericality: {
                            only_integer: true,
                            greater_than_or_equal_to: 1900,
                            less_than_or_equal_to: 2100,
                          }

  # validate chronological order
  validate :start_year_must_be_before_or_equal_to_end_year

  private

  def start_year_must_be_before_or_equal_to_end_year
    return if start_year.blank? || end_year.blank?

    if start_year > end_year
      errors.add(:start_year, "must be less than or equal to end year")
    end
  end
end

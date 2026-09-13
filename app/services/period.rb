class Period
  DEFAULT = "today".freeze

  PERIODS = {
    "today" => -> {
      [Time.current.all_day, 1.day.ago.all_day]
    },
    "last_7_days" => -> {
      [7.days.ago.beginning_of_day..Time.current, 14.days.ago.beginning_of_day..7.days.ago.end_of_day]
    },
    "this_month" => -> {
      [Time.current.all_month, 1.month.ago.all_month]
    },
  }.freeze

  def self.ranges(key)
    valid_key = PERIODS.key?(key) ? key : DEFAULT
    current_range, previous_range = PERIODS[valid_key].call

    [valid_key, current_range, previous_range]
  end
end

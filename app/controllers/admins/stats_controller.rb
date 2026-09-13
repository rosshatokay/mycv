class Admins::StatsController < Admins::BaseController
  include Sortable
  include Filterable

  def index
    period_param = params[:period].presence || "today"
    selected_period, current_range, previous_range = Period.ranges(period_param)

    # Scoped queries for current vs previous periods
    users_current = User.with_attached_avatar.where(created_at: current_range)
    users_previous = User.where(created_at: previous_range)

    resumes_current = Resume.includes(user: [avatar_attachment: :blob]).where(updated_at: current_range)
    resumes_previous = Resume.where(updated_at: previous_range)

    chart_data = build_user_chart_data(current_range, selected_period)
    activity_data = build_activity_data(users_current.first(3), resumes_current.first(3))

    render inertia: "Admins/Index", props: {
      stats: {
        users: {
          current: users_current.count,
          previous: users_previous.count,
        },
        active_resumes: {
          current: resumes_current.count,
          previous: resumes_previous.count,
        },
      },
      chart_data: chart_data,
      current_filters: {
        period: selected_period,
      },
      activities: activity_data,
    }
  end

  private

  def build_activity_data(users, resumes)
    users_data = users.map { |u|
      {
        name: u.full_name,
        created_at: u.created_at,
        avatar_url: u.avatar_url(48),
        action: "signed_up",
      }
    }
    resumes_data = resumes.map { |r|
      {
        name: r.user.full_name,
        created_at: r.updated_at,
        avatar_url: r.user.avatar_url(48),
        action: "updated_resume",
      }
    }

    [users_data, resumes_data].flatten!.sort_by! { |obj| obj[:created_at] }.reverse!
  end

  def build_user_chart_data(range, period)
    if period == "today"
      # Group by hour for single-day views
      raw_counts = User.where(created_at: range)
                       .group("EXTRACT(HOUR FROM created_at)::integer")
                       .count

      (0..23).map do |hour|
        {
          label: "#{hour.to_s.rjust(2, "0")}:00",
          users: raw_counts[hour] || 0,
        }
      end
    else
      # Group by date for multi-day views ('last_7_days', 'this_month')
      raw_counts = User.where(created_at: range)
                       .group("DATE(created_at)")
                       .count # returns { Date => Integer } or { String => Integer }

      (range.begin.to_date..range.end.to_date).map do |date|
        count = raw_counts[date] || raw_counts[date.to_s] || 0
        {
          label: date.strftime("%b %d"), # e.g., "Sep 13"
          users: count,
        }
      end
    end
  end
end

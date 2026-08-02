class WorkExperiencesController < ApplicationController
  def index
    render inertia: "WorkExperience/Index", props: {
      work_experiences: current_user.resume.formatted_work_experiences,
    }
  end

  def new
    render inertia: "WorkExperience/EditNew", props: {
      work_experience: {},
      countries_list: countries_list.sort_by { |c| c[:label] },
    }
  end

  def create
    w_e = current_user.resume.work_experiences.build(work_experience_params)

    if w_e.save
      flash.inertia[:toast] = { description: "Work experience created successfully" }
      redirect_to work_experiences_path
    else
      flash.inertia[:toast] = { description: "Something went wrong" }
      redirect_to new_work_experiences_path, inertia: { errors: inertia_errors_for(w_e) }
    end
  end

  def edit
    we = current_user.work_experiences.find(params[:id])

    render inertia: "WorkExperience/EditNew", props: {
      is_edit: true,
      work_experience: {
        id: we.hashid,
        role: we.role,
        company: we.company,
        start_year: we.start_year,
        end_year: we.end_year,
        city: we.city,
        country: we.country,
      },
      countries_list: countries_list.sort_by { |c| c[:label] },
    }
  end

  def update
    we = current_user.work_experiences.find(params[:id])

    if we.update(work_experience_params)
      flash.inertia[:toast] = { description: "Work experience created successfully" }
      redirect_to work_experiences_path
    else
      flash.inertia[:toast] = { description: "Something went wrong" }
      redirect_to new_work_experiences_path, inertia: { errors: inertia_errors_for(we) }
    end
  end

  private

  def work_experience_params
    params.require(:work_experience).permit(
      :city,
      :country,
      :company,
      :end_year,
      :start_year,
      :role
    )
  end

  def countries_list
    ISO3166::Country.all.map { |c|
      {
        label: c.iso_short_name,
        value: c.alpha2,
      }
    }
  end
end

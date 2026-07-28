class ProjectsController < ApplicationController
  def index
    render inertia: "Projects/Index", props: {
      projects: current_user.resume.projects.map { |p|
        {
          title: p.title,
          url: p.url,
          description: p.description,
          year: p.year,
          id: p.hashid,
          highlights: p.highlights || [],
        }
      },
    }
  end

  def new
    render inertia: "Projects/New", props: {
      project: {},
    }
  end

  def edit
    project = current_user.projects.find(params[:project_id])
    project.highlights = Array(project.highlights).presence || [""]

    render inertia: "Projects/New", props: {
      is_edit: true,
      project: {
        id: project.hashid,
        title: project.title,
        description: project.description,
        url: project.stripped_url,
        year: project.year,
        highlights: project.highlights || [],
      },
    }
  end

  def update
    project = current_user.projects.find(params[:project_id])

    if project.update(project_params)
      flash.inertia[:toast] = { description: "Project details updated successfully" }
      redirect_to edit_project_path(project.hashid)
    else
      flash.inertia[:toast] = { description: "Something went wrong" }
      redirect_to new_project_path, inertia: { errors: inertia_errors_for(project) }
    end
  end

  def create
    project = current_user.projects.build(project_params)

    if project.save
      flash.inertia[:toast] = { description: "Project created successfully" }
      redirect_to projects_path
    else
      flash.inertia[:toast] = { description: "Something went wrong" }
      redirect_to new_project_path, inertia: { errors: inertia_errors_for(project) }
    end
  end

  private

  def project_params
    params.require(:project).permit(
      :title,
      :description,
      :url,
      :year,
      highlights: [],
    )
  end
end

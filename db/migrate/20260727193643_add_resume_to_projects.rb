class AddResumeToProjects < ActiveRecord::Migration[8.1]
  def change
    add_reference :projects, :resume, null: false, foreign_key: true
  end
end

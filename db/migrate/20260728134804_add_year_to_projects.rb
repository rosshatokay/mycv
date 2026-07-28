class AddYearToProjects < ActiveRecord::Migration[8.1]
  def change
    add_column :projects, :year, :integer, null: false
  end
end

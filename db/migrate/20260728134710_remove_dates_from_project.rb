class RemoveDatesFromProject < ActiveRecord::Migration[8.1]
  def change
    remove_column :projects, :start_date, :date
    remove_column :projects, :end_date, :date
  end
end

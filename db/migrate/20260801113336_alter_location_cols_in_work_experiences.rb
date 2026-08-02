class AlterLocationColsInWorkExperiences < ActiveRecord::Migration[8.1]
  def change
    change_table :work_experiences do |t|
      t.remove :location, type: :string
      t.string :city
      t.string :country
    end
  end
end

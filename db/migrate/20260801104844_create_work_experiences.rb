class CreateWorkExperiences < ActiveRecord::Migration[8.1]
  def change
    create_table :work_experiences do |t|
      t.references :resume, null: false, foreign_key: true
      t.string :role
      t.string :company
      t.string :location
      t.integer :start_year, null: false
      t.integer :end_year

      t.timestamps
    end
  end
end

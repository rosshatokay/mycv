class CreateEducations < ActiveRecord::Migration[8.1]
  def change
    create_table :educations do |t|
      t.references :resume, null: false, foreign_key: true
      t.string :school
      t.string :degree
      t.integer :start_year
      t.integer :end_year
      t.string :major
      t.decimal :gpa, precision: 3, scale: 2

      t.timestamps
    end
  end
end

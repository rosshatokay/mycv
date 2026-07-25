class CreateProjects < ActiveRecord::Migration[8.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.references :user, null: false, foreign_key: true
      t.string :description
      t.json :highlights
      t.string :url
      t.date :start_date, null: false
      t.date :end_date

      t.timestamps
    end
  end
end

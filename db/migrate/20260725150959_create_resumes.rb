class CreateResumes < ActiveRecord::Migration[8.1]
  def change
    create_table :resumes do |t|
      t.string :location
      t.string :role
      t.string :bio
      t.string :website_url
      t.string :phone_number
      t.json :highlights
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

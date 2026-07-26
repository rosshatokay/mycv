class AddLinkedInUrlToResumes < ActiveRecord::Migration[8.1]
  def change
    add_column :resumes, :linkedin_url, :string
  end
end

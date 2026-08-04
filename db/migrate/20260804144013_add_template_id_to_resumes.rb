class AddTemplateIdToResumes < ActiveRecord::Migration[8.1]
  def change
    add_column :resumes, :template_id, :string, default: "classic", null: false
    add_index :resumes, :template_id
  end
end

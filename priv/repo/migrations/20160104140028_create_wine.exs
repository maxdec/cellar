defmodule Cellar.Repo.Migrations.CreateWine do
  use Ecto.Migration

  def change do
    create table(:wines) do
      add :name, :string
      add :designation, :string
      add :vintage, :integer
      add :ready_to_drink, :string
      add :color, :string
      add :notes, :string

      timestamps
    end
    execute "ALTER TABLE wines ADD FULLTEXT INDEX `ft_name_designation_color` (name, designation, color);"

  end
end

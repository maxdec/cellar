defmodule Cellar.Repo.Migrations.CreateBottle do
  use Ecto.Migration

  def change do
    create table(:bottles) do
      add :acquisition, :date
      add :degustation, :date
      add :notes, :string
      add :row, :integer
      add :col, :integer
      add :wine_id, references(:wines)

      timestamps
    end
    create index(:bottles, [:wine_id])

  end
end

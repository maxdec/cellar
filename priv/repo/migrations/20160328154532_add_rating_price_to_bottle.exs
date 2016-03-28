defmodule Cellar.Repo.Migrations.AddRatingPriceToBottle do
  use Ecto.Migration

  def change do
    alter table(:bottles) do
      add :rating, :integer
      add :price, :integer
    end
  end
end

defmodule Cellar.Bottle do
  use Cellar.Web, :model

  schema "bottles" do
    field :acquisition, Ecto.Date
    field :degustation, Ecto.Date
    field :notes, :string
    field :row, :integer
    field :col, :integer
    belongs_to :wine, Cellar.Wine, foreign_key: :wine_id

    timestamps
  end

  @required_fields ~w(acquisition row col wine_id)
  @optional_fields ~w(degustation notes)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end

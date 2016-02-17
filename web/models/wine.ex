defmodule Cellar.Wine do
  use Cellar.Web, :model

  schema "wines" do
    field :name, :string
    field :designation, :string
    field :vintage, :integer
    field :ready_to_drink, :string
    field :color, :string
    field :notes, :string
    # has_many :bottles, Cellar.Bottle

    timestamps
  end

  @required_fields ~w(name designation vintage ready_to_drink color)
  @optional_fields ~w(notes)

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

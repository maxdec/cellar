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
  @colors ~w(red white rose)a

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_inclusion(:color, @colors)
    |> validate_inclusion(:vintage, 1900..2050)
    |> validate_format(:ready_to_drink, ~r/^[0-9]{4}(-[0-9]{4})?$/) # '2016' or '2016-2018'
  end

  def search(query, search_input) do
    search_term = search_input
    |> String.split(" ")
    |> Enum.map(&("#{&1}*"))
    |> Enum.join(" ")

    from(w in query,
      where: fragment("MATCH(name, designation, color) AGAINST(? IN BOOLEAN MODE)", ^search_term),
      order_by: [desc: fragment("MATCH(name, designation, color) AGAINST(? IN BOOLEAN MODE)", ^search_term)])
  end
end

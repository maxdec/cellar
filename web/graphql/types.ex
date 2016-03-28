defmodule Cellar.GraphQL.Types do
  use Absinthe.Schema

  @desc "A Wine"
  object :wine do
    field :id,              non_null(:id)
    field :name,            non_null(:string)
    field :designation,     non_null(:string)
    field :vintage,         non_null(:integer)
    field :ready_to_drink,  non_null(:string)
    field :color,           non_null(:string)
    field :notes,           :string
    field :bottles,         list_of(:bottle)
    field :inserted_at,     non_null(:timestamp)
    field :updated_at,      non_null(:timestamp)
  end

  @desc "A Bottle of Wine"
  object :bottle do
    field :id,          non_null(:id)
    field :wine,        non_null(:wine)
    field :row,         non_null(:integer)
    field :col,         non_null(:integer)
    field :acquisition, non_null(:date)
    field :degustation, :date
    field :price,       :integer
    field :rating,      :integer
    field :notes,       :string
    field :inserted_at, non_null(:timestamp)
    field :updated_at,  non_null(:timestamp)
  end

  @desc "A Color of Wine"
  enum :color do
    value :red, description: "Color Red"
    value :rose, description: "Color Rose"
    value :white, description: "Color White"
  end

  @desc "The :timestamp scalar type represents a Ecto.DateTime"
  scalar :timestamp do
    parse &Ecto.DateTime.cast(&1)
    serialize &Ecto.DateTime.to_string(&1)
  end

  @desc "The :date scalar type represents a Ecto.Date"
  scalar :date do
    parse &Ecto.Date.cast(&1)
    serialize &Ecto.Date.to_string(&1)
  end

end

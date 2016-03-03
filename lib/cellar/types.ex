defmodule Cellar.Types do
  defmodule Timestamp do
    defstruct name: "Timestamp", description:
      """
      The `Timestamp` scalar type represents a Ecto.DateTime
      """
  end

  defmodule Date do
    defstruct name: "Date", description:
      """
      The `Date` scalar type represents a Ecto.Date
      """
  end
end

defimpl GraphQL.Types, for: Cellar.Types.Timestamp do
  def parse_value(_, value), do: Ecto.DateTime.cast!(value)
  def serialize(_, value), do: Ecto.DateTime.to_string(value)
end

defimpl GraphQL.Types, for: Cellar.Types.Date do
  def parse_value(_, value), do: Ecto.Date.cast!(value)
  def serialize(_, value), do: Ecto.Date.to_string(value)
end

defmodule Cellar.Timestamp do
  defstruct name: "Timestamp", description:
    """
    The `Timestamp` scalar type represents a Ecto.DateTime
    """
end

defimpl GraphQL.Types, for: Cellar.Timestamp do
  def parse_value(_, value), do: Ecto.DateTime.cast(value)
  def serialize(_, value), do: Ecto.DateTime.to_string(value)
end

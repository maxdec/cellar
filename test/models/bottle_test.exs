defmodule Cellar.BottleTest do
  use Cellar.ModelCase

  alias Cellar.Bottle

  @valid_attrs %{acquisition: "2010-04-17", col: 42, degustation: "2010-04-17", notes: "some content", row: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Bottle.changeset(%Bottle{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Bottle.changeset(%Bottle{}, @invalid_attrs)
    refute changeset.valid?
  end
end

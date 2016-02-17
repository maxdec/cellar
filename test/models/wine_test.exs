defmodule Cellar.WineTest do
  use Cellar.ModelCase

  alias Cellar.Wine

  @valid_attrs %{color: "some content", designation: "some content", name: "some content", notes: "some content", ready_to_drink: "some content", vintage: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Wine.changeset(%Wine{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Wine.changeset(%Wine{}, @invalid_attrs)
    refute changeset.valid?
  end
end

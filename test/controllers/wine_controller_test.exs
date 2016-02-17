defmodule Cellar.WineControllerTest do
  use Cellar.ConnCase

  alias Cellar.Wine
  @valid_attrs %{color: "some content", designation: "some content", name: "some content", notes: "some content", ready_to_drink: "some content", vintage: 42}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, wine_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    wine = Repo.insert! %Wine{}
    conn = get conn, wine_path(conn, :show, wine)
    assert json_response(conn, 200)["data"] == %{"id" => wine.id,
      "name" => wine.name,
      "designation" => wine.designation,
      "vintage" => wine.vintage,
      "ready_to_drink" => wine.ready_to_drink,
      "color" => wine.color,
      "notes" => wine.notes}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, wine_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, wine_path(conn, :create), wine: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Wine, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, wine_path(conn, :create), wine: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    wine = Repo.insert! %Wine{}
    conn = put conn, wine_path(conn, :update, wine), wine: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Wine, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    wine = Repo.insert! %Wine{}
    conn = put conn, wine_path(conn, :update, wine), wine: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    wine = Repo.insert! %Wine{}
    conn = delete conn, wine_path(conn, :delete, wine)
    assert response(conn, 204)
    refute Repo.get(Wine, wine.id)
  end
end

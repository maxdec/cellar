defmodule Cellar.BottleControllerTest do
  use Cellar.ConnCase

  alias Cellar.Bottle
  @valid_attrs %{acquisition: "2010-04-17", col: 42, degustation: "2010-04-17", notes: "some content", row: 42}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, bottle_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    bottle = Repo.insert! %Bottle{}
    conn = get conn, bottle_path(conn, :show, bottle)
    assert json_response(conn, 200)["data"] == %{"id" => bottle.id,
      "acquisition" => bottle.acquisition,
      "degustation" => bottle.degustation,
      "notes" => bottle.notes,
      "row" => bottle.row,
      "col" => bottle.col}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, bottle_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, bottle_path(conn, :create), bottle: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Bottle, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, bottle_path(conn, :create), bottle: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    bottle = Repo.insert! %Bottle{}
    conn = put conn, bottle_path(conn, :update, bottle), bottle: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Bottle, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    bottle = Repo.insert! %Bottle{}
    conn = put conn, bottle_path(conn, :update, bottle), bottle: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    bottle = Repo.insert! %Bottle{}
    conn = delete conn, bottle_path(conn, :delete, bottle)
    assert response(conn, 204)
    refute Repo.get(Bottle, bottle.id)
  end
end

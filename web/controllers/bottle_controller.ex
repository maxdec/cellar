defmodule Cellar.BottleController do
  use Cellar.Web, :controller

  alias Cellar.Bottle

  plug :scrub_params, "bottle" when action in [:create, :update]

  def index(conn, _params) do
    bottles = Bottle |> Repo.all() |> Repo.preload(:wine)
    render(conn, "index.json", bottles: bottles)
  end

  def create(conn, %{"bottle" => bottle_params}) do
    changeset = Bottle.changeset(%Bottle{}, bottle_params)

    case Repo.insert(changeset) do
      {:ok, bottle} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", bottle_path(conn, :show, bottle))
        |> render("show.json", bottle: bottle)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Cellar.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    bottle = Repo.get!(Bottle, id) |> Repo.preload(:wine)
    render(conn, "show.json", bottle: bottle)
  end

  def update(conn, %{"id" => id, "bottle" => bottle_params}) do
    bottle = Repo.get!(Bottle, id)
    changeset = Bottle.changeset(bottle, bottle_params)

    case Repo.update(changeset) do
      {:ok, bottle} ->
        render(conn, "show.json", bottle: bottle)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Cellar.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    bottle = Repo.get!(Bottle, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(bottle)

    send_resp(conn, :no_content, "")
  end
end

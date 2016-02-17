defmodule Cellar.WineController do
  use Cellar.Web, :controller

  alias Cellar.Wine

  plug :scrub_params, "wine" when action in [:create, :update]

  def index(conn, _params) do
    wines = Repo.all(Wine)
    render(conn, "index.json", wines: wines)
  end

  def create(conn, %{"wine" => wine_params}) do
    changeset = Wine.changeset(%Wine{}, wine_params)

    case Repo.insert(changeset) do
      {:ok, wine} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", wine_path(conn, :show, wine))
        |> render("show.json", wine: wine)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Cellar.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    wine = Repo.get!(Wine, id)
    render(conn, "show.json", wine: wine)
  end

  def update(conn, %{"id" => id, "wine" => wine_params}) do
    wine = Repo.get!(Wine, id)
    changeset = Wine.changeset(wine, wine_params)

    case Repo.update(changeset) do
      {:ok, wine} ->
        render(conn, "show.json", wine: wine)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Cellar.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    wine = Repo.get!(Wine, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(wine)

    send_resp(conn, :no_content, "")
  end
end

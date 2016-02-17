defmodule Cellar.WineView do
  use Cellar.Web, :view

  def render("index.json", %{wines: wines}) do
    %{data: render_many(wines, Cellar.WineView, "wine.json")}
  end

  def render("show.json", %{wine: wine}) do
    %{data: render_one(wine, Cellar.WineView, "wine.json")}
  end

  def render("wine.json", %{wine: wine}) do
    %{id: wine.id,
      name: wine.name,
      designation: wine.designation,
      vintage: wine.vintage,
      ready_to_drink: wine.ready_to_drink,
      color: wine.color,
      notes: wine.notes}
  end
end

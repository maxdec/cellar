defmodule Cellar.BottleView do
  use Cellar.Web, :view

  def render("index.json", %{bottles: bottles}) do
    %{data: render_many(bottles, Cellar.BottleView, "bottle.json")}
  end

  def render("show.json", %{bottle: bottle}) do
    %{data: render_one(bottle, Cellar.BottleView, "bottle.json")}
  end

  def render("bottle.json", %{bottle: bottle}) do
    %{
      id: bottle.id,
      acquisition: bottle.acquisition,
      degustation: bottle.degustation,
      notes: bottle.notes,
      row: bottle.row,
      col: bottle.col,
      wine: render_one(bottle.wine, Cellar.WineView, "wine.json")
    }
  end
end

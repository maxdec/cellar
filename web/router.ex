defmodule Cellar.Router do
  use Cellar.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Cellar do
    pipe_through :api
    # forward "/", GraphQL.Plug, schema: {TestSchema, :schema}
    resources "/wines", WineController, except: [:new, :edit]
    resources "/bottles", BottleController, except: [:new, :edit]
  end

  scope "/graphql" do
    pipe_through :api
    forward "/", Absinthe.Plug, schema: Cellar.GraphQL.Schema
  end

  scope "/", Cellar do
    pipe_through :browser # Use the default browser stack

    get "/*anything", PageController, :index
  end
end

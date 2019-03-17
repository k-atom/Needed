defmodule NeededWeb.Router do
  use NeededWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :browserNeeded do
    plug :put_layout, {NeededWeb.LayoutView, "app.html"}
  end

  # pipeline :api do
  #   plug :accepts, ["json"]
  # end

  scope "/", NeededWeb do
    pipe_through :browser
    pipe_through :browserNeeded

    get "/", PageController, :index
    get "/login", PageController, :index
    get "/Needed", NeededController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", NeededWeb do
  #   pipe_through :api
  # end
end

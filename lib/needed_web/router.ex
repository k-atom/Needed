defmodule NeededWeb.Router do
  use NeededWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :browseree do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_layout, false
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", NeededWeb do
    pipe_through :browser

    get "/", PageController, :index
    # get "/Needed", NeededController, :index
  end

  scope "/Needed" do
    pipe_through :browseree

    get "/", NeededWeb.NeededController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", NeededWeb do
  #   pipe_through :api
  # end
end

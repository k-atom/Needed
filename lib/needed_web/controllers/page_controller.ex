defmodule NeededWeb.PageController do
  use NeededWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

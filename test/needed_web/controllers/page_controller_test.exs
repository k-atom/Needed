defmodule NeededWeb.PageControllerTest do
  use NeededWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "n-browser"
  end

  test "GET /login", %{conn: conn} do
    conn = get(conn, "/login")
    assert html_response(conn, 200) =~ "n-browser"
  end

  test "GET /needed", %{conn: conn} do
    conn = get(conn, "/needed")
    assert html_response(conn, 200) =~ "n-browser"
  end
end

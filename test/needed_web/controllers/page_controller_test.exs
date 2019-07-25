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

  test "GET /Needed", %{conn: conn} do
    conn = get(conn, "/Needed")
    assert html_response(conn, 200) =~ "n-browser"
  end
end

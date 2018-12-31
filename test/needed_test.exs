defmodule NeededTest do
  use ExUnit.Case
  doctest Needed

  test "greets the world" do
    assert Needed.hello() == :world
  end
end

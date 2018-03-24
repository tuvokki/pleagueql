defmodule Pleague.Accounts do
  # Stubbed out for now.
  def find_user(id) do
    %{
      name: "Fake user #{id}",
      id: id
    }
  end

  def all_users do
    %{
      name: "Fake user 1",
      id: 1
    }
  end
end

defmodule Cellar.CellarSchema do
  import Ecto.Query

  alias Cellar.Repo
  alias Cellar.Wine
  alias Cellar.Bottle
  alias Cellar.Timestamp
  alias Cellar.Types.Date
  alias Cellar.Types.Timestamp

  alias GraphQL.Schema
  alias GraphQL.Type.ObjectType
  alias GraphQL.Type.String
  alias GraphQL.Type.Enum, as: EnumQL
  alias GraphQL.Type.ID
  alias GraphQL.Type.Int
  alias GraphQL.Type.NonNull
  alias GraphQL.Type.List

  @defaults_pagination %{limit: 10, offset: 0}

  def schema do
    wine = %ObjectType{
      name: "Wine",
      description: "A Wine",
      fields: %{
        id:             %{type: %NonNull{ofType: %String{}}},
        name:           %{type: %NonNull{ofType: %String{}}},
        designation:    %{type: %NonNull{ofType: %String{}}},
        vintage:        %{type: %NonNull{ofType: %Int{}}},
        ready_to_drink: %{type: %NonNull{ofType: %String{}}},
        color:          %{type: %NonNull{ofType: colors_enum}},
        notes:          %{type: %String{}},
        # bottles:        %{type: %List{ofType: bottle}},
        inserted_at:  %{type: %NonNull{ofType: %Timestamp{}}},
        updated_at:   %{type: %NonNull{ofType: %Timestamp{}}},
      }
    }

    bottle = %ObjectType{
      name: "Bottle",
      description: "A Bottle of Wine",
      fields: %{
        id:           %{type: %NonNull{ofType: %String{}}},
        wine:         %{type: %NonNull{ofType: wine}},
        row:          %{type: %NonNull{ofType: %Int{}}},
        col:          %{type: %NonNull{ofType: %Int{}}},
        acquisition:  %{type: %NonNull{ofType: %Date{}}},
        degustation:  %{type: %Date{}},
        notes:        %{type: %String{}},
        inserted_at:  %{type: %NonNull{ofType: %Timestamp{}}},
        updated_at:   %{type: %NonNull{ofType: %Timestamp{}}},
      }
    }

    query = %ObjectType{
      name: "CellarQuery",
      description: "Root of the Cellar Schema",
      fields: %{
        wine: %{
          type: wine,
          args: %{id: %{type: %NonNull{ofType: %ID{}}}},
          resolve: &get_wine/3
        },

        wines: %{
          type: %List{ofType: wine},
          args: %{
            limit: %{type: %Int{}},
            offset: %{type: %Int{}}
          },
          resolve: &get_wines/3
        },

        bottle: %{
          type: bottle,
          args: %{id: %{type: %NonNull{ofType: %ID{}}}},
          resolve: &get_bottle/3
        },

        bottles: %{
          type: %List{ofType: bottle},
          args: %{
            limit: %{type: %Int{}},
            offset: %{type: %Int{}}
          },
          resolve: &get_bottles/3
        },
      }
    }

    mutations = %ObjectType{
      name: "CellarMutations",
      description: "Mutations for the Cellar",
      fields: %{
        createWine: %{
          name: "CreateWine",
          description: "Create a new Wine",
          type: wine,
          args: %{
            name:           %{type: %NonNull{ofType: %String{}}},
            designation:    %{type: %NonNull{ofType: %String{}}},
            vintage:        %{type: %NonNull{ofType: %Int{}}},
            ready_to_drink: %{type: %NonNull{ofType: %String{}}},
            color:          %{type: %NonNull{ofType: %String{}}},
            notes:          %{type: %String{}},
          },
          resolve: &create_wine/3
        },

        updateWine: %{
          name: "UpdateWine",
          description: "Update a Wine",
          type: wine,
          args: %{
            id:             %{type: %NonNull{ofType: %ID{}}},
            name:           %{type: %String{}},
            designation:    %{type: %String{}},
            vintage:        %{type: %Int{}},
            ready_to_drink: %{type: %String{}},
            color:          %{type: %String{}},
            notes:          %{type: %String{}},
          },
          resolve: &update_wine/3
        },

        createBottle: %{
          name: "CreateBottle",
          description: "Create a new Bottle of Wine",
          type: bottle,
          args: %{
            id:           %{type: %NonNull{ofType: %String{}}},
            wine:         %{type: %NonNull{ofType: %ID{}}},
            row:          %{type: %NonNull{ofType: %Int{}}},
            col:          %{type: %NonNull{ofType: %Int{}}},
            acquisition:  %{type: %NonNull{ofType: %Int{}}},
            degustation:  %{type: %Int{}},
            notes:        %{type: %String{}},
          },
          resolve: &create_bottle/3
        }
      }
    }

    %Schema{
      query: query,
      mutation: mutations
    }
  end

  #########
  # WINES #
  #########
  defp get_wine(_, %{id: id}, _), do: Wine |> Repo.get(id)

  defp get_wines(_, args, _) do
    %{limit: limit, offset: offset} = Map.merge(@defaults_pagination, args)
    Wine |> offset(^offset) |> limit(^limit) |> Repo.all
  end

  defp create_wine(_, args, _) do
    case Wine.changeset(%Wine{}, args)|> Repo.insert do
      {:ok, wine} -> wine
      {:error, _} -> %{id: "ERROR"} # changeset.changes
    end
  end

  defp update_wine(_, args = %{id: id}, _) do
    wine = Repo.get!(Wine, id)# |> Repo.preload(:bottles)
    IO.inspect args
    changeset = Wine.changeset(wine, args)
    case Repo.update(changeset) do
      {:ok, wine} -> wine
      {:error, _} -> %{id: "ERROR"} #changeset.changes
    end
  end

  ###########
  # BOTTLES #
  ###########
  defp get_bottle(_, %{id: id}, ast) do
    Bottle |> Repo.get(id) |> smart_preload(ast, :wine)
  end


  defp get_bottles(_, args, ast) do
    %{limit: limit, offset: offset} = Map.merge(@defaults_pagination, args)
    Bottle
      |> offset(^offset)
      |> limit(^limit)
      |> Repo.all
      |> smart_preload(ast, :wine)
  end

  defp create_bottle(_, args, _) do
    case Bottle.changeset(%Bottle{}, args)|> Repo.insert do
      {:ok, bottle} -> bottle
      {:error, _} -> %{id: "ERROR"} # changeset.changes
    end
  end

  ###########
  # HELPERS #
  ###########
  def colors_enum do
    %{
      name: "Color",
      description: "Color of the wine. Can be [red|white|rose]",
      values: %{
        red: %{value: "red", description: "Red"},
        white: %{value: "white", description: "White"},
        rose: %{value: "rose", description: "Rosé"}
      }
    } |> EnumQL.new
  end

  defp get_selections(ast) do
    hd(ast[:field_asts])[:selectionSet][:selections]
  end

  defp has?(selections, field) do
    Enum.any?(selections, fn s -> s[:name][:value] == field end)
  end

  defp smart_preload(query, ast, field) do
    case get_selections(ast) |> has?(to_string(field)) do
      true -> query |> Repo.preload(field)
      _ -> query
    end
  end
end

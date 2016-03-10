defmodule Cellar.GraphQL.Schema do
  use Absinthe.Schema
  import Ecto.Query

  alias Cellar.Repo
  alias Cellar.Wine
  alias Cellar.Bottle
  import_types Cellar.GraphQL.Types

  @defaults_pagination %{limit: 10, offset: 0}
  @defaults_cellar %{
    rows: Cellar.rows,
    cols: Cellar.cols
  }

  @desc "Root of the Cellar Schema"
  query do
    @desc "Retrieve the rows of the Cellar"
    field :rows, type: list_of(list_of(:bottle)) do
      resolve &get_rows/2
    end

    @desc "Retrieve one Wine from its ID"
    field :wine, type: :wine do
      arg :id, non_null(:id)
      resolve &get_wine/2
    end

    @desc "Retrieve a list of Wines"
    field :wines, type: list_of(:wine) do
      arg :limit, :integer
      arg :offset, :integer
      arg :q, :string
      resolve &get_wines/2
    end

    @desc "Retrieve one Bottle from its ID"
    field :bottle, type: :bottle do
      arg :id, non_null(:id)
      resolve &get_bottle/2
    end

    @desc "Retrieve a list of Bottles"
    field :bottles, type: list_of(:bottle) do
      arg :limit, :integer
      arg :offset, :integer
      resolve &get_bottles/2
    end
  end

  @desc "Mutations for the Cellar"
  mutation do

    @desc "Create a new Wine"
    field :create_wine, type: :wine do
      arg :name,           non_null(:string)
      arg :designation,    non_null(:string)
      arg :vintage,        non_null(:integer)
      arg :ready_to_drink, non_null(:string)
      arg :color,          non_null(:string)
      arg :notes,          :string
      resolve &create_wine/2
    end

    @desc "Update a Wine"
    field :update_wine, type: :wine do
      arg :id,             non_null(:id)
      arg :name,           :string
      arg :designation,    :string
      arg :vintage,        :integer
      arg :ready_to_drink, :string
      arg :color,          :string
      arg :notes,          :string
      resolve &update_wine/2
    end

    @desc "Create a new Bottle"
    field :create_bottle, type: :bottle do
      arg :wine,        non_null(:id)
      arg :row,         non_null(:integer)
      arg :col,         non_null(:integer)
      arg :acquisition, non_null(:date)
      arg :degustation, :date
      arg :notes,       :string
      resolve &create_bottle/2
    end

    @desc "Update a Bottle"
    field :update_bottle, type: :bottle do
      arg :id,          non_null(:id)
      arg :wine_id,     :id
      arg :row,         :integer
      arg :col,         :integer
      arg :acquisition, :date
      arg :degustation, :date
      arg :notes,       :string
      resolve &update_bottle/2
    end
  end

  ##########
  # CELLAR #
  ##########
  defp get_rows(_args, ast) do
    bottles = Bottle
    |> where([b], is_nil(b.degustation))
    |> Repo.all
    |> smart_preload(ast, :wine)
    |> assemble_rows

    {:ok, bottles}
  end

  defp assemble_rows(bottles) do
    bottles
    # group by row number
    |> Enum.group_by(&(&1.row))
    # fill missing rows
    |> fill_missing(default_rows)
    # sort each row and transform back to a List
    |> Enum.map(fn ({_, bottles}) -> assemble_row(bottles) end)
  end

  defp assemble_row(bottles) do
    bottles
    |> Enum.into(%{}, &({&1.col, &1}))
    |> fill_missing(default_row)
    |> Enum.map(fn({_, bottle}) -> bottle end)
  end

  defp fill_missing(initialMap, defaultMap), do: Map.merge(defaultMap, initialMap)

  defp default_rows do
    0..@defaults_cellar.rows-1 |> Enum.map(&({&1, []})) |> Map.new
  end

  defp default_row do
    0..@defaults_cellar.cols-1 |> Enum.map(&({&1, nil})) |> Map.new
  end

  #########
  # WINES #
  #########
  defp get_wine(%{id: id}, _), do: {:ok, Repo.get(Wine, id)}

  defp get_wines(%{ q: nil }, _), do: {:ok, []}
  defp get_wines(%{ q: "" }, _), do: {:ok, []}
  defp get_wines(%{ q: q } = args, _) do
    %{limit: limit, offset: offset} = Map.merge(@defaults_pagination, args)
    wines = Wine
    |> Wine.search(q)
    |> offset(^offset)
    |> limit(^limit)
    |> Repo.all

    {:ok, wines}
  end

  defp get_wines(args, _) do
    %{limit: limit, offset: offset} = Map.merge(@defaults_pagination, args)
    wines = Wine
    |> order_by([desc: :id])
    |> offset(^offset)
    |> limit(^limit)
    |> Repo.all

    {:ok, wines}
  end

  defp create_wine(args, _) do
    cleared_args = clear_nil_params(args)
    insert = %Wine{}
    |> Wine.changeset(cleared_args)
    |> Repo.insert

    case insert do
      {:error, changeset} -> {:error, changeset.errors}
      ok -> ok
    end
  end

  defp update_wine(args = %{id: id}, _) do
    wine = Repo.get(Wine, id) |> Repo.preload(:bottles)
    if is_nil(wine) do
      {:error, "The Wine with id #{id} cannot be found."}
    else
      cleared_args = clear_nil_params(args)
      changeset = Wine.changeset(wine, cleared_args)
      case Repo.update(changeset) do
        {:error, changeset} -> {:error, changeset.errors}
        ok -> ok
      end
    end
  end

  ###########
  # BOTTLES #
  ###########
  defp get_bottle(%{id: id}, ast) do
    bottle = Bottle |> Repo.get(id) |> smart_preload(ast, :wine)
    {:ok, bottle}
  end

  defp get_bottles(args, ast) do
    %{limit: limit, offset: offset} = Map.merge(@defaults_pagination, args)
    bottle = Bottle
    |> order_by([desc: :id])
    |> offset(^offset)
    |> limit(^limit)
    |> Repo.all
    |> smart_preload(ast, :wine)

    {:ok, bottle}
  end

  defp create_bottle(args, ast) do
    cleared_args = clear_nil_params(args)
    case Bottle.changeset(%Bottle{}, cleared_args) |> Repo.insert do
      {:ok, bottle} -> {:ok, smart_preload(bottle, ast, :wine)}
      {:error, changeset} -> {:error, changeset.errors}
    end
  end

  defp update_bottle(args = %{id: id}, ast) do
    bottle = Repo.get(Bottle, id)
    if is_nil(bottle) do
      {:error, "The Bottle with id #{id} cannot be found."}
    else
      cleared_args = clear_nil_params(args)
      changeset = Bottle.changeset(bottle, cleared_args)
      case Repo.update(changeset) do
        {:ok, bottle} -> {:ok, smart_preload(bottle, ast, :wine)}
        {:error, changeset} -> {:error, changeset.errors}
      end
    end
  end

  ###########
  # HELPERS #
  ###########
  defp clear_nil_params(args) do
    args
    |> Enum.filter(fn {_, v} -> v != nil end)
    |> Enum.into(%{})
  end

  defp get_selections(ast_node) do
    ast_node.selection_set.selections
  end

  defp is?(%Absinthe.Language.FragmentSpread{}, _field) do
    true # to be safe, because we can't access the fragment here
  end
  defp is?(%Absinthe.Language.InlineFragment{} = frag, field) do
    frag |> get_selections |> has?(field)
  end
  defp is?(selection, field), do: selection.name == field

  defp has?(selections, field) do
    Enum.any?(selections, &(is?(&1, field)))
  end

  defp smart_preload(query, ast, field) do
    case ast.ast_node |> get_selections |> has?(to_string(field)) do
      true -> Repo.preload(query, field)
      _ -> query
    end
  end
end

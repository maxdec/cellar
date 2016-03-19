defmodule Mix.Tasks.Cellar.Digest do
  use Mix.Task

  def run(args) do
    Mix.Shell.IO.cmd "NODE_ENV=production ./node_modules/.bin/webpack --progress -p"
    :ok = Mix.Tasks.Phoenix.Digest.run(args)
  end
end

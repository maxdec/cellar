#!/bin/sh
#Initial setup
mix deps.get --only prod
mix compile

# Compile assets
npm run compile
mix phoenix.digest

# Custom tasks (like DB migrations)
mix ecto.migrate

# Finally run the server
PORT=4001 mix phoenix.server

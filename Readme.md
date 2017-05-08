pleague graphql

`yarn`

mv local.env to `.env` to use locally installed version of Mongo
you can unzip, yarn and npm start the local-pleaguedb.zip to start mongo at port 3002
or create a .env pointing to a real mongo instance:

  DB_HOST=[value]
  DB_PORT=[value]
  DB_USER=[value]
  DB_PASS=[value]
  DB_NAME=[value]

open: [http://localhost:3000/graphiql](http://localhost:3000/graphiql?query=%7B%0A%09players%20%7B%0A%20%20%20%20name%0A%20%20%20%20elo%0A%20%20%7D%0A%7D)

yay!
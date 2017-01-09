# LoLTournaments
Simple League of Legends web app that allows users to create and manage tournaments they are hosting. Players interested can search, apply and modify their applications.

## Instructions
1. Host a PostgreSQL server on port `5432`.
2. Create 2 separate databases one called `test-lol-tournaments` and the other called `lol-tournaments`.
3. Run `npm install` in the home directory of project to get all dependencies.
4. Run `npm run dev-server` to run server connected to `Test-LoLTeams` database. Run `npm run dev-front` to run the front end hosted on `localhost:8080`.

Extra: To populate database with dummy data, run `npm run seed-db`

>NOTE: Can configure database settings if you change the config file in `api/config/config.json`.

## TODO:
1. Figure out why logging in doesn't cause view change

## Stuff to Refactor:
1. Routes since there is some repeated code

## Future
1. Translate routes to graphQL
2. Create balanced teams given list of participants and their ranks
5. Team descriptions

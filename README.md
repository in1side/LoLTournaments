# LoLTournaments
Simple League of Legends web app that allows users to create and manage tournaments they are hosting. Players interested can search, apply and modify their applications.

## Instructions
>NOTE: Unfortunately uses hard-coded Auth0 callbacks and credentials. If you want to run locally, you will need to have your own Auth0 account and app, with username settings active in Auth0's database, and app client secret to replace them all. Sorry for the inconvenience, I will hopefully have a live demo up when done.

1. Host a PostgreSQL server on port `5432`.
2. Create 2 separate databases one called `test-lol-tournaments` and the other called `lol-tournaments`.
3. Run `npm install` in the home directory of project to get all dependencies.
4. Run `npm run dev-server` to run server connected to `test-lol-tournaments` database. Run `npm run dev-front` to run the front end hosted on `https://localhost:8080`.

>NOTE: Can configure database settings if you change the config file in `api/config/config.json`.

## TODO:
1. Figure out how to not hard-code user auth
2. Only allow registration if registration deadline not passed
3. Format UTC times to client's machine time
4. Server should send error statuses with message

## Stuff to Refactor:
1. Routes since there is some repeated code
2. user type checking within components

## Future
1. Translate routes to graphQL
2. Create balanced teams given list of participants and their ranks
5. Team descriptions

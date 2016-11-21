# LoLTeams
League of Legends web app that allows players to create, manage and coordinate teams.

## Instructions
1. Host a PostgreSQL server on port `5432`.
2. Create 2 separate databases one called `Test-LoLTeams` and the other called `database_production`.
3. Run `npm install` in the home directory of project to get all dependencies.
4. Run `npm run dev-server` to run server connected to `Test-LoLTeams` database. Run `npm run dev-front` to run the front end hosted on `localhost:8080`.

Extra: To populate database with dummy data, run `npm run seed-db`

>NOTE: Can configure database settings if you change the config file in `api/config/config.json`.

## TODO:
1. ~~Basic front-end that connects to API~~
2. User login/create account
3. Store and get user id on client-side
4. Handle fetch error and success (includes server response formats)
5. Change DB to catch errors and not crash
6. ~~Show list of teams~~
7. ~~Basic team info page~~
8. Limit DB results to only necessary attributes
9. ~~Seed file for testing DB~~
10. Click on team to view its info
11. App navigation
12. Unit test routes

## Stuff to Refactor:
1. ~~Routes since there is some repeated code~~
2. Make objects contain one type only!!!

## Future
1. Translate routes to graphQL

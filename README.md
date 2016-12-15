# LoLTeams
Simple League of Legends web app that allows users to create and manage tournaments they are hosting.

## Instructions
1. Host a PostgreSQL server on port `5432`.
2. Create 2 separate databases one called `Test-LoLTeams` and the other called `database_production`.
3. Run `npm install` in the home directory of project to get all dependencies.
4. Run `npm run dev-server` to run server connected to `Test-LoLTeams` database. Run `npm run dev-front` to run the front end hosted on `localhost:8080`.

Extra: To populate database with dummy data, run `npm run seed-db`

>NOTE: Can configure database settings if you change the config file in `api/config/config.json`.

## TODO:
1. ~~Basic front-end that connects to API~~
2. ~~User login/create account~~
3. ~~Store and get user id on client-side -> Authorize Auth0 profile to be sent back~~
4. Handle fetch error and success (includes server response formats)
5. Change DB to catch errors and not crash
6. ~~Show list of teams~~
7. ~~Basic team info page~~
8. ~~Seed file for testing DB~~
9. ~~Click on team to view its info~~
10. ~~App navigation (FIX TEAMS)~~
11. Unit test routes
12. ~~Toggling views returns component state to default unless otherwise needed~~
13. Create teams only if creator's user account exists
14. Edit team members
15. Team invite accept/decline mechanism
16. Format table contents for Home and Edit Teams


## Stuff to Refactor:
1. ~~Routes since there is some repeated code~~
2. Make objects contain one type only!!!
3. Limit DB results to only necessary attributes


## Future
1. Translate routes to graphQL
2. Create balanced teams given list of participants and their ranks
3. Input availability to practice
4. Schedule of all team member availability
5. Team descriptions

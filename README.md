# home-task-2

execute "npm run start"  to run the application

these are the endpoints you can hit:

for creating user:
    POST localhost:8080/user/create

for updating user:
    PUT localhost:8080/user/:userId

for soft delete user:
    DELETE localhost:8080/user/:userId

for retrieve user:
    GET localhost:8080/user/:userId

for autosuggest users:
    GET localhost:8080/user/:loginSubstring/:limit
    where "loginSubstring" is an string that is used to filter by user login and "limit" is the maximum of users to retrieve
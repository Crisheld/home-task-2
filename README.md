# home-task-2

execute "npm run start"  to run the application<br />

these are the endpoints you can hit:<br />

for creating user:<br />
&nbsp;&nbsp;&nbsp;&nbsp;POST localhost:8080/user/create<br />
<br />
for updating user:<br />
&nbsp;&nbsp;&nbsp;&nbsp;PUT localhost:8080/user/:userId<br />
<br />
for soft delete user:<br />
&nbsp;&nbsp;&nbsp;&nbsp;DELETE localhost:8080/user/:userId<br />
<br />
for retrieve user:<br />
&nbsp;&nbsp;&nbsp;&nbsp;GET localhost:8080/user/:userId<br />
<br />
for autosuggest users:<br />
&nbsp;&nbsp;&nbsp;&nbsp;GET localhost:8080/user/:loginSubstring/:limit<br />
&nbsp;&nbsp;&nbsp;&nbsp;where "loginSubstring" is an string that is used to filter by user login and "limit" is the maximum of users to retrieve<br />
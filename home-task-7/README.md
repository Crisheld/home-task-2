# home-task-6

execute "npm run start"  to run the application<br />

these are the endpoints you can hit:<br />

for login:<br />
&nbsp;&nbsp;&nbsp;&nbsp;POST localhost:8080/login<br />
<br />
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

for creating group:<br />
&nbsp;&nbsp;&nbsp;&nbsp;POST localhost:8080/group/create<br />
<br />
for updating group:<br />
&nbsp;&nbsp;&nbsp;&nbsp;PUT localhost:8080/group/:groupId<br />
<br />
for hard delete group:<br />
&nbsp;&nbsp;&nbsp;&nbsp;DELETE localhost:8080/group/:groupId<br />
<br />
for retrieve group:<br />
&nbsp;&nbsp;&nbsp;&nbsp;GET localhost:8080/group/:groupId<br />
<br />
for retrieve all groups:<br />
&nbsp;&nbsp;&nbsp;&nbsp;GET localhost:8080/group/list<br />
for adding users to one group:<br />
&nbsp;&nbsp;&nbsp;&nbsp;POST localhost:8080/group/:groupId/add_users<br />
# JWT based authorization for Nest.js

## Installation

I assume you have node, yarn/npm and postgres


First of all you have to download dependencies
```bash
npm i
```

Then check config in
```bash
nano .env
```

and start in watch mode
```bash
npm run start
```

or in production mode
```bash
npm run build
npm run start:prod
```


## Usage 

You can log in to the application using trejgun@gmail.com/My5up3r5tr0ngP@55w0rd by executing this CURL request

```bash
curl \
-X POST http://localhost:3000/auth/login \
-d '{"email": "trejgun@gmail.com", "password": "My5up3r5tr0ngP@55w0rd"}' \
-H "Content-Type: application/json"
```

This will give you JWT token
```json
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyZWpndW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE1NjU4NTgwMDUsImV4cCI6MTU2NTg1ODA2NX0.jqfDhj-sSHtOiT41eD0vBuj64lgBg87oGIyJ78c5gus"}
```

Put this token in header of each of your subsequent requests

```bash
curl \
http://localhost:3000/users/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU3Mjc4MjA1MiwiZXhwIjoxNTcyNzgyMTEyfQ.JwBpPo8eK4WAY2hs4orkbQ7j-QShGToMixUiadGJZf4"

```

This will return your info
```json
{"id":1,"email":"trejgun@gmail.com","roles":["admin"]}
```

```bash
curl \
http://localhost:3000/users/list \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU3Mjc4MjA1MiwiZXhwIjoxNTcyNzgyMTEyfQ.JwBpPo8eK4WAY2hs4orkbQ7j-QShGToMixUiadGJZf4"

```

This will return a list of users
```json
{"list":[{"id":1,"email":"trejgun@gmail.com","roles":["admin"]}],"count":1}
```

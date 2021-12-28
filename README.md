```
Please note that the default branch of this repository is 'main'
```

# Cinephile Diary API

A simple Movie API that creates and stores a movie object based on provided within a request: user's credentials and movie title. Also, fetch a list of movies created by the user.

Movie object contains following data:
   ```
     Title: string
     Released: date
     Genre: string
     Director: string
   ```

## Endpoints

### `POST /movies`

- Request should contain: "username", "password", "title".

### `GET /movies`

- Request should contain: "username", "password".

## Mock users

The auth service defines two user accounts that you should use

1. `Basic` user (allowed to create 5 movies per month):

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user (ulimited one):

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Known issues

- You might encounter MODULE_NOT_FOUND errors in running containers after running `docker-compose up`. For now, the workaround is to:
  - run `nvm use` to make sure you locally (host machine) use the same version of Node that is used in the containers (see Dockerfiles)
  - run `npm install` locally in **each service directory** and next in **root project directory**
  - now you can run `docker-compose up`

example:
```
nvm use 14.15 \
&& cd ./auth-sr && npm install \
&& cd ../movies-srv && npm install \
&& cd ../ && npm install
```

## Credits

Movies data is fetched from OMDb API (https://omdbapi.com/).

Auth serice is provided by Netguru (https://github.com/netguru/nodejs-recruitment-task).

## Application structure

Movie API service code is located under `./movies-srv` directory.

Auth service code is located under `./auth-srv` directory.

Application uses mongodb as a database service.

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer.

Generating tokens in auth service needs to provide env variable
`JWT_SECRET` for docker-compose. The same secret is used by Movie API service to verify the JWT tokens:
```
JWT_SECRET=<your-secret>
```

You need to create OMDB apikey and provide it as env variable for docker-compose:
```
OMDB_APIKEY=<your-key>
```

Setting up a database requires providing env variables for docker-compose:

```
MONGODB_USERNAME=<your-mongodb-root-username>
MONGODB_PASSWORD=<your-mongodb-root-password>
```

## Run locally

1. Clone this repository
2. Run with docker-compose from project root dir:

```
JWT_SECRET=secret \
OMDB_APIKEY=<your-key> \
MONGODB_USERNAME=root \
MONGODB_PASSWORD=password \
docker-compose up -d
```
You might need to run `npm-install` in each of two services first before runnning `docker-compose up`.

When running the stack again with `docker-compose`, sometimes it is needed to rebuild it. Just use the flag `--build` or use separate command of `docker-compose build`.

By default the auth service will start on port `3000` but you can override the default value by setting additional `AUTH_SRC_PORT` env var when runnind `docker-compose`.

The movies service run on default port of `8080` and `9229` for debugging.

To stop the services stack run:

```
docker-compose down
```

## JWT payload

The auth token gives access to basic information about the
user, including its role.

```
{
  "userId": 123,
  "name": "Basic Thomas",
  "role": "basic",
  "iat": 1606221838,
  "exp": 1606223638,
  "iss": "https://www.netguru.com/",
  "sub": "123"
}
```

## Example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

## Checklist

- Dockerize ✔
- Define database access layer
- Define services access layer (external OMDB API)
- Define routes and controllers
- Define middleware for verifying user authentication and user type restrictions
- Remember of proper error handling
- Complete this RADME further
- Write unit tests
- Write some integration tests
- Configure CI/CD pipeline with GitHub Actions
- Create a sample Pull Request

## Important notes

- This is a training and recruitment task project. Kkeep in mind that it is not intended to be used outside development environment for now.
- Since I don't commit editor's specific files, here is a sample content of VS Code `launch.json` I used to debugging:
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "remoteRoot": "/app/src",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}/movies-srv/",
      "protocol": "inspector",
      "restart": true,
    }
  ],
  "compounds": []
}
```

## Ideas for further develompent

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
`JWT_SECRET`. The same secret is used by Movie API service to verify the JWT tokens.

You need to create OMDB apikey and provide it as env variable for docker-compose:
`OMDB_APIKEY=YOURKEY`

## Run locally

1. Clone this repository
1. Run from root dir

```
JWT_SECRET=secret OMDB_APIKEY=YOURKEY docker-compose up -d
```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

To stop the authorization service run

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
- Database setup
- Define data model
- Define controllers and routes
- Complete this RADME further
- Write unit tests
- Write some integration tests
- Configure CI/CD pipeline with GitHub Actions
- Create a sample Pull Request

## Important notes

- This is a training and recruitment task project, keep in mind that it is not inteded to use outside development environment for now.

## Ideas for further develompent

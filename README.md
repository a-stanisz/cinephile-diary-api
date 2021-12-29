```
Please note that the default branch of this repository is 'main'
```

# 🎬 Cinephile Diary API

 **A simple Movie API that creates, stores, and fetches movie records of the authenticated user.**

## 🚗 How to run it?

First, clone this repository.

### 🔍 Application structure 

Movie API service code is located under `./movies-srv` directory.

Auth service code is located under `./auth-srv` directory.

Application uses mongodb as a database service.

### 📝 Prerequisites 

You need to have `docker` and `docker-compose` installed on your host-machine.

It might be needed to have `node` with `npm` and `nvm` installed locally too.

You need to provide environmental variables: 

```
MOVIES_SRV_NAME=movies-srv
MOVIES_SRV_PORT=3002
AUTH_SRV_NAME=auth-srv
AUTH_SRV_PORT=3000
JWT_SECRET=<secret>
MONGODB_SRV_NAME=mongodb
DB_PORT=27017
MONGODB_USERNAME=<db-username>
MONGODB_PASSWORD=<password>
EXAMPLE_DB_NAME=example-database
OMDB_APIKEY=<your-omdb-apikey>

```
Most of the environmental variables have their defaults set as above, so you need to specify at least:  
`JWT_SECRET`, `MONGODB_USERNAME`, `MONGODB_PASSWORD` and `OMDB_APIKEY`.  

Please note that **you need to provide \<your-omdb-apikey\>** from OMDB website. You can get it [here](http://www.omdbapi.com/apikey.aspx). 

You can also replace all other above example-values with your custom ones of course. This can be convenient, especially when it comes to the values of exposed ports.

You can store env vars in the `.env` file at the root directory of the project or provide them inline with `docker-compose up`.

### Run it 🤞

Finally, you can run it with `docker-compose up`:

```
JWT_SECRET=<secret> MONGODB_USERNAME=<db-username> \ MONGODB_PASSWORD=<password> OMDB_APIKEY=<your-omdb-apikey> \ docker-compose up -d
```

To stop the services stack run:

```
docker-compose down -v
```
The `-v` (`--volume`) flag removes volumes created for the application.

## 💔 Known issues 

#### **1. Errors of 'MODULE_NOT_FOUND'**

You might encounter MODULE_NOT_FOUND errors in running containers after running `docker-compose up`. Docker configs need some tweaking but I didn't figure it out yet. So please, run `docker-compose down`, and if you don't know what causes the problem, here is the workaround I use for now:
  - run `nvm use` to make sure you locally (host machine) use the same version of Node that is used in the containers (see Dockerfiles)
  - run `npm install` locally in **each service directory** and next in the **root project directory**
  - now you can run `docker-compose up --build -d` (`--build` flag rebuild image). If the problem still exists, try first delete all `node_modules` and `package-lock.json` (🥶) and try to do above again 

example:
```
nvm use 14.15 \
&& cd ./auth-sr && npm install \
&& cd ../movies-srv && npm install \
&& cd ../ && npm install
```
#### **2. Anonymous volumes taking up space**

- Note that project's containers use `anonymous volumes` that are newly created each time of startup. To avoid them taking up too much space on your host-disk, please use `--volumes` flag on `docker-compose down`:
```
docker-compose down -v
```


## Credits

The task is provided by [Netguru](https://www.netguru.com/).

Movies data is fetched from [OMDb API](https://omdbapi.com/).

Auth service is provided within [the task repository](https://github.com/netguru/nodejs-recruitment-task).

## Checklist

- Dockerize ✔
- Define domain model ✔
- Define routes and controllers ✔
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

## Possible further improvements

- Avoid repetitive code, e.g. in the responses
- Better error handling, e.g. with unified methods spread across the application
- Improve docker configs, e.g. optimize for production so the Dockerfile could be one and the same for all stages
- Consider separating domain model layer, data access layer, and database abstraction layer

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

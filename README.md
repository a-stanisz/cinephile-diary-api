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
Most of the environmental variables have their defaults set as above,except those in angle brackets, so you need to specify at least:  
`JWT_SECRET`, `MONGODB_USERNAME`, `MONGODB_PASSWORD` and `OMDB_APIKEY`.  

Please note that **you need to provide \<your-omdb-apikey\>** from OMDB website. You can get it [here](http://www.omdbapi.com/apikey.aspx). 

You can also replace all other above example-values with your custom ones of course. This can be convenient, especially when it comes to the values of exposed ports.

You can store env vars in the `.env` file at the root directory of the project or provide them inline with `docker-compose up`.

## Run it 🤞

Finally, you can run it with `docker-compose up`:

```
JWT_SECRET=<secret> MONGODB_USERNAME=<db-username> \ MONGODB_PASSWORD=<password> OMDB_APIKEY=<your-omdb-apikey> \ docker-compose up -d
```

To stop the services stack run:

```
docker-compose down -v
```
The `-v` (`--volume`) flag removes volumes created for the services.

## 💔 Known issues 

#### **1. Errors of 'MODULE_NOT_FOUND'**

You might encounter MODULE_NOT_FOUND errors in running containers after running `docker-compose up`. Docker configs need some tweaking but I didn't figure it out yet. Here is the workaround I use for now:
  - run `docker-compose down -v`
  - run `nvm use` to make sure you locally (host machine) use the same version of Node that is used in the containers (see Dockerfiles)
  - run `npm install` locally in **each service directory** and next in the **root project directory**
  - now you can run `docker-compose up --build -d` (`--build` flag rebuild image). If the problem still exists, try first delete all `node_modules` and `package-lock.json` (🥶) and try to do above again. 

example:
```
docker-compose down -v \
nvm use 14.15 \
&& cd ./auth-sr && npm install \
&& cd ../movies-srv && npm install \
&& cd ../ && npm install
```
#### **2. Anonymous volumes taking up space**

- Note that the project's containers use `anonymous volumes` that are newly created each time of startup. To avoid them taking up too much space on your hostdisk, please use `--volumes` flag that removes them on `docker-compose down`.
```
docker-compose down -v
```
## 🕵🏽‍♂️ How to try it out

### 👉🏽 Authorization service (`auth-srv`) 

To authorize users you need to use Auth service based on JWT tokens that by default runs at the `PORT 3000`.



S
end POST requests to the Auth service with 'username' and 'password' of a example users used in the task to get users' tokens.

### 👉🏽 Movies service (`movies-srv`)

By default the movie service service runs at `PORT 3002`.

It provides two endpoints:  

1. `POST /movies`
   
   - 
2. 

Send POST or GET requests with token in the header to test the /movies endpoint of the Movie service.

Example request:

```
example request 

```
### 👉🏽 Database service (`mongodb`)

By default the database service runs at `PORT 27017`.

Maybe you'll want to preview the database service using some interactive tool. To log in, select `Username/Password` as the authentication method and use the credentials you defined as environment variables:
```
MONGODB_USERNAME=<db-username>
MONGODB_PASSWORD=<password> 
```
These are the ROOT credentials used at the db init.

## 🏅 Credits

- The task is provided by [Netguru](https://www.netguru.com/) as well as the Auth service that was included in [the original task repository](https://github.com/netguru/nodejs-recruitment-task). 

- Movie data is fetched from [OMDb API](https://omdbapi.com/).

## ✍🏾 Checklist

- Setup with a database connection (MongoDB) ✅
- Dockerize ✅
- Define domain model ✅
- Define routes and controllers ✅
- Define middleware for verifying user authentication ✅
- Handle user type restrictions ✅
- Remember of proper error handling 🏴󠁳󠁯󠁳󠁯󠁿
- Write unit tests 🚩
- Configure CI/CD pipeline with GitHub Actions 🚩
- Create a sample Pull Request 🚩

## 🚧 Important notes

- This is a training and recruitment task project. Keep in mind that it is not intended to be used anywhere for now, especially outside development environment or something
- Since I don't commit editor-specific files, here is a sample content of VS Code `launch.json` I used to debugging:
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: Attach 9229 --inspect",
      "type": "node",
      "request": "attach",
      "remoteRoot": "/app",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}/movies-srv",
      "protocol": "inspector",
      "restart": true,
    }
  ]
}
```

## 👨🏾‍🚀 Possible/needed further improvements

- Validation of user request payload
- Cover more usage behavior, e.g. right now you can add the same movie multiple times
- It would be nice to have type checking, preferably using TypeScript. Also, required movie properties could be retrieved using Movie Schema
- Avoid repetitive code, e.g. unify responses with some dedicated function or remove redundant if-checks 
- Better error handling, e.g. with unified methods spread across the application
- Improve Docker configs, e.g. optimize for production so the Dockerfile could be one and the same for all stages
- Consider separation of domain model layer, data access layer, and database abstraction layer

### 👋🏽 Thanks!
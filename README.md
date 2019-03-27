# Fullstack web application using Vue2, element-ui, Nodejs, Express, Mysql, Gulp4 and Webpack4.

## Introduction
This project demonstrates the basic CRUD functions combining Vue2 (Typescript), Vuex, element-ui, Nodejs (Typescript), Express, Mysql. 
It uses Gulp for running task and TSLint for the server side, and uses Webpack4 for bundling front-end code. 
You can use this web application doing trip planning.

## Prerequisites
1. The latest version of Nodejs need to be installed.
2. Docker MySQL5 container

### Docker MySQL container preparation
1. Run `docker pull mysql:5`
2. Run `docker volume create mysqldata`
3. Run `docker run --name mysql5 -p 3306:3306 -v mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5`
4. Run `docker run -it --link mysql5:mysql --rm mysql:5 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'`
5. Setup database and user
```
mysql> CREATE DATABASE tripplanner;
mysql> CREATE USER 'sa'@'172.17.0.1' IDENTIFIED BY '(IJN8uhb';
mysql> GRANT ALL ON tripplanner.* TO 'sa'@'172.17.0.1';
mysql> FLUSH PRIVILEGES;
```
6. Check privileges `mysql> SHOW GRANTS FOR 'sa'@'172.17.0.1';`
7. If you want to rerun docker container, run `docker run mysql5`

## How do I get set up? ###

* Clone the repo: 
```
git clone https://github.com/LaurenceHo/vue-trip-planner.git
```
* Install npm package:
```
npm install
```
* Launch the whole web application: 
```
npm run start-server
```
* Visit in your browser: `http://localhost:8080`

* If you want to start client only
```
npm run start-client
```
## API Document (from Express server's view)
```
1.  retrieveTrips         (POST)   http://localhost:8080/api/trip
2.  retrieveTripDetail    (GET)    http://localhost:8080/api/trip/:trip_id
3.  createTrip            (POST)   http://localhost:8080/api/trip/create
4.  updateTrip            (PUT)    http://localhost:8080/api/trip/update
5.  deleteTrip            (DELETE) http://localhost:8080/api/trip/:trip_id

6.  retrieveTripDays      (GET)    http://localhost:8080/api/trip/:trip_id/day
7.  retrieveTripDayDetail (GET)    http://localhost:8080/api/trip/:trip_id/day/:trip_day_id
8.  createTripDay         (POST)   http://localhost:8080/api/trip/:trip_id/day/create
9.  updateTripDay         (PUT)    http://localhost:8080/api/trip/:trip_id/day/update
10. deleteTripDay         (DELETE) http://localhost:8080/api/trip/:trip_id/day/:trip_day_id

11.  retrieveEvent        (POST)   http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event
12.  createEvent          (POST)   http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event/create
13.  updateEvent          (PUT)    http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event/update
14.  deleteEvent          (DELETE) http://localhost:8080/api/trip/:trip_id/day/:trip_day_id/event/:event_id

15. userRegister          (POST)   http://localhost:8080/api/user/register
16. userSignin            (POST)   http://localhost:8080/api/user/signin
16. userUpdate            (POST)   http://localhost:8080/api/user/update
17. userLogout            (GET)    http://localhost:8080/api/user/logout
```

## Directory Structure
```
vue-trip-planner
    ├── client
    │    ├── config
    │    │    ├── webpack.common.js
    │    │    ├── webpack.dev.js
    │    │    ├── webpack.prod.js
    │    ├── src
    │    │    ├── assets
    │    │         ├── default-avatar.png
    │    │         ├── favicon.png
    │    │         ├── vue-logo.png
    │    │    ├── Components
    │    │         ├── Dashboard.vue
    │    │         ├── Hamburger.vue
    │    │         ├── SiderMenu.vue
    │    │         ├── TopBar.vue
    │    │         ├── TripForm.vue
    │    │    ├── models
    │    │    │    ├── category.ts
    │    │    │    ├── event.ts
    │    │    │    ├── trip.ts
    │    │    ├── services
    │    │    │    ├── trip-service.ts
    │    │    ├── store
    │    │    │    ├── store.ts    
    │    │    ├── style
    │    │    │    ├── style.css
    │    │    ├── App.vue
    │    │    ├── main.ts
    │    │    ├── router.ts
    │    │    ├── vue-shims.d.ts
    │    ├── index.html
    │    ├── tsconfig.json
    ├── dist
    │    ├── client (generated by webpack)
    │    ├── server (generated by Gulp)
    ├── node_modules (generated by npm)
    ├── server
    │    ├── src
    │    │    ├── bin
    │    │    │    ├── www
    │    │    ├── controllers
    │    │    │    ├── base-controller.ts
    │    │    │    ├── event-controller.ts
    │    │    │    ├── trip-controller.ts
    │    │    │    ├── trip-day-controller.ts
    │    │    │    ├── user-controller.ts
    │    │    ├── database
    │    │    │    ├── knex.ts
    │    │    │    ├── schema.ts
    │    │    ├── models
    │    │    │    ├── category.ts
    │    │    │    ├── event.ts
    │    │    │    ├── trip.ts
    │    │    │    ├── trip-day.ts
    │    │    │    ├── user.ts
    │    │    ├── repositories
    │    │    │    ├── base-repository.ts
    │    │    │    ├── event-repository.ts
    │    │    │    ├── trip-day-repository.ts
    │    │    │    ├── trip-repository.ts
    │    │    │    ├── user-repository.ts
    │    │    ├── routes
    │    │    │    ├── event-route.ts
    │    │    │    ├── trip-day-route.ts
    │    │    │    ├── trip-route.ts
    │    │    │    ├── user-route.ts
    │    │    ├── services
    │    │    │    ├── base-service.ts
    │    │    │    ├── event-service.ts
    │    │    │    ├── trip-day-service.ts
    │    │    │    ├── trip-service.ts
    │    │    │    ├── user-service.ts
    │    │    ├── server.ts
    ├── .gitignore
    ├── gulpfile.ts
    ├── LICENSE.md
    ├── package.json
    ├── package-lock.json (generted by npm)
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
```
### TypeScript / Javascript Naming rule
https://google.github.io/styleguide/jsguide.html

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

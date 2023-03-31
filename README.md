# packiot_test

This repository is a CRUD RESTful API in nodejs and using postgresql.

## Dependencies

* Docker
* Nodejs
* body-parser (solved by nodejs)
* chai (solved by nodejs)
* chai-http (solved by nodejs)
* express (solved by nodejs)
* mocha (solved by nodejs)
* sequelize (solved by nodejs)

## Instalation

1. Clone the repository
2. cd packiot_test
3. run docker run -d -p 5432:5432 --name node-postgres -e POSTGRES_PASSWORD=packiot -e POSTGRES_DB=packiot_todos -e POSTGRES_USER=packiot_user postgres
3. npm i
4. npm test

## Troubleshooting
* If there is a process running on the 5432 port, run sudo ss -lptn 'sport = :5432' and kill the respective PID
* If this kill is too agressive, just change the docker port for another number and, also, change the port variable from database_model.js directly

## Insights
* I tried to used dotenv to provide better ways to change postgresql database information on the fly, which would remove the necessity of hard coded port numbers, passwords and other information. However, I did not figure out some problems with it, thus I chose to do a more direct, but simple approach.
* In the first versions of my implementation I tried to use node-postgres, which is a module to connect with postgresql databases. Unfortunately, I found it very "close" to SQL, thus, I chose Sequelize to provide a more "code-like" approach. In Sequelize, create, insert and other operations can be called by functions, which removes the SQL necessity.
* After some time cracking my head with the tests, I could not figure out how to call two services and use them in the same test. This really bugs me, because I wanted to make more tests.

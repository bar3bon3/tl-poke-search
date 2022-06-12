# TrueLayer Pokemon search

## Quick start

The fastest way to run the application is via `Docker Compose`.

Installation instructions can be found [here](https://docs.docker.com/compose/install/), if you already have `Docker Desktop` installed on your machine you should be good to go.

Run the application from the project root with:

```sh
docker-compose up
```

The command will take some time, once completed the application will be available at [http://localhost:3000](http://localhost:3000).

## Project features

Full Stack application that given a Pokemon name, returns its description and its legendary status.


### Tech - Frontend

- `react`
- `axios` for HTTP requests
- `react-router-dom` for application routing
- `sass` for application styling
- `testing-library/jest-dom`, `testing-library/react`, `msw`, for tests and API mocking


### Tech - Backend

- `node.js` + `express.js`
- `axios` for HTTP requests
- `cors` for CORS handling
- `ts-jest`, `supertest`, `msw`, for tests and API mocking

## Troubleshooting

If you are having any issues running the Dockerized version of the application you can always run the frontend and the backend individually by follwing the instructions provided in each folder:

- [poke-search-backend/README.md](poke-search-backend/README.md)
- [poke-search-frontend/README.md](poke-search-frontend/README.md)

## QA

> Which parts are you most proud of? Why?

I'm quite happy with the frontend UI, done without any CSS framework, which is not a really common scenario nowadays. It's simple and functional with a relatively small CSS bundle. The randomize feature also is really helpful to get familiar with the application.

> Where did you spend more time? What was the most difficult?

I spent some time figuring out how to setup and implement the node.js + express.js tests and API mocking, I didn't have much experience on that.

> How did you find the test overall? Did you have issues or difficulties completing it?

It was a fun project, and I'm happy with the outcome, not really dificult even if it took more than 3 hours to complete. 

It is ok as an MVP but there are a lot of improvements:

- Better React components decoupling and configuration via props
- Test components in isolation
- Better use of Typescript annotations
- Better error handling
- Code commenting is minimal as per React guidelines, development team may enforce different guidelines
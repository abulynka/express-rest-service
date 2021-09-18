# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone {repository URL}
```

## Installing NPM modules

```bash
npm install
```

## Running application

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm test
```

To run only one of all test suites (users, boards or tasks)

```bash
npm test <suite name>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```bash
npm run test:auth <suite name>
```

To run test and stop on failure

```bash
npm run test --bail
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```bash
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Using Docker

Install docker-compose and docker applications.
Run `docker-compose up` to run nestjs with postgres installation. File .env contains neccessary settings.

### Work with remote repository (administration)

```bash
docker login

docker tag express-rest-service_express abulynka/express-rest-service_express
docker push abulynka/express-rest-service_express

docker tag express-rest-service_postgres abulynka/express-rest-service_postgres
docker push abulynka/express-rest-service_postgres
```

### Images on docker hub

Images on docker hub:

```bash
docker pull abulynka/express-rest-service_postgres
docker pull abulynka/express-rest-service_express
```

### Run Migration in Docker

Run:

```bash
docker exec -ti nestjs sh
npm run typeorm migration:run
exit
```

Revert:

```bash
docker exec -ti nestjs sh
npm run typeorm migration:revert
exit
```

### Run tests with authentication

Run server:

```bash
docker-compose up
```

Run migration:

```bash
docker exec -ti nestjs sh
npm run typeorm migration:run
exit
```

Run tests:

```bash
npm run test:auth
```

## Comparing nestjs with express and fastify engines using artillery app

.env file has USE_FASTIFY flag. `USE_FASTIFY=false` - uses express engine, `USE_FASTIFY=true` - uses fastify engine

Commands:

```bash
npm run artillery
```

### Express engine log

```yaml
All virtual users finished
Summary report @ 11:07:41(+0300) 2021-07-11
  Scenarios launched:  300
  Scenarios completed: 300
  Requests completed:  1800
  Mean response/sec: 171.59
  Response time (msec):
    min: 0
    max: 70
    median: 2
    p95: 56
    p99: 58
  Scenario counts:
    0: 300 (100%)
  Codes:
    200: 1500
    201: 300
```

### Fastify engine log

```yaml
All virtual users finished
Summary report @ 11:09:12(+0300) 2021-07-11
  Scenarios launched:  300
  Scenarios completed: 300
  Requests completed:  1800
  Mean response/sec: 171.59
  Response time (msec):
    min: 0
    max: 71
    median: 2
    p95: 55
    p99: 59
  Scenario counts:
    0: 300 (100%)
  Codes:
    200: 1500
    201: 300
```

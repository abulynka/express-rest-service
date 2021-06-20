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
Run `docker-compose up` to run express with postgres installation. File .env contains neccessary settings.

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
docker exec -ti express sh
npm run typeorm migration:run
exit
```

Revert:

```bash
docker exec -ti express sh
npm run typeorm migration:revert
exit
```

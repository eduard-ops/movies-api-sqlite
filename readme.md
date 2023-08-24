## Movies Api

### Commands:

- `npm start` &mdash; start the server in production modes
- `npm run start:dev` &mdash; server start in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors

### To run through docker

### Command:

docker run --name movies -p 4000:3000 -e APP_PORT=3000 edwardops/movies-api-sqlite:latest

# CinemaApp API

## Run application locally

> Application uses PostgreSQL DBMS

1. Run `npm install` to install dependencies

2. Add `env.yaml` file into project root directory with the following lines.

```yaml
base:
  JWT_SECRET: <YOUR_JWT_SECRET_KEY>

development:
  ~compose: base
  PORT: 5000
  DB_NAME: <DATABASE_NAME>
  DB_USER: <DATABASE_USER>
  DB_PASSWORD: <DATABASE_PASSWORD>
  DB_HOST: <DATABASE_HOST>
  DB_PORT: <DATABASE_PORT>
```

3. Run `npm start`.

4. CONGRATS! Application should be running on `localhost:5000`.

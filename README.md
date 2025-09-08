# Skrew

A full-stack NestJS application with GraphQL, Prisma ORM, Redis, and WebSockets. This project is designed for a card game backend, featuring modular architecture, authentication, real-time communication, and PostgreSQL database integration.

## Features

- **NestJS**: Modular, scalable server-side application framework.
- **GraphQL**: API with Apollo Server and code-first schema generation.
- **Prisma ORM**: Type-safe database access for PostgreSQL.
- **Redis**: Session and cache management.
- **JWT Authentication**: Secure API endpoints.
- **WebSockets**: Real-time communication using Socket.IO.
- **Task Scheduling**: With `@nestjs/schedule`.
- **E2E and Unit Testing**: Jest integration.

## Project Structure

```
src/
  app.module.ts         # Main NestJS module
  card/                 # Card entity modules
  cardInstance/         # Card instance modules
  hand/                 # Hand modules
  table/                # Table modules
  turn/                 # Turn modules
  user/                 # User modules
  websockets/           # WebSocket gateway
  common/               # Shared decorators, guards, types, utils
  middlewares/          # Auth middleware, JWT constants
  prisma/               # Prisma service, schema, and seeds
   seeds/              # Seed scripts and data
schema.gql              # Generated GraphQL schema
prisma/schema.prisma    # Prisma schema
.env                    # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- PostgreSQL
- Redis

### Installation

1. **Clone the repository:**

```sh
git clone <repo-url>
cd skrew
```

2. **Install dependencies:**

```sh
pnpm install
# or
npm install
# or
yarn install
```

3. **Configure environment variables:**

- Copy `.env.example` to `.env` and update values as needed.
- Example:
  ```env
  DATABASE_URL="postgresql://user:password@localhost:5432/skrew"
  NODE_ENV="development"
  API_JWT_SECRET="your_jwt_secret"
  API_JWT_ISSUER="skrew-api"
  table_expires_in="10 * 60 * 1000"
  ```

4. **Set up the database:**

```sh
pnpm push
# or
npx prisma db push
```

5. **(Optional) Seed the database:**

```sh
pnpm seed
# or
npx prisma db seed
```

6. **Start the development server:**

```sh
pnpm dev
# or
npm run dev
# or
yarn dev
```

7. **Access GraphQL Playground:**

- Visit [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Scripts

- `pnpm dev` — Start server in watch mode
- `pnpm build` — Build the project
- `pnpm start` — Start the server
- `pnpm push` — Push Prisma schema to DB
- `pnpm seed` — Seed the database
- `pnpm reset` — Reset the database
- `pnpm test` — Run tests

## Technologies Used

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [GraphQL](https://graphql.org/)
- [Redis](https://redis.io/)
- [Socket.IO](https://socket.io/)
- [Jest](https://jestjs.io/)

## License

This project is UNLICENSED. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute or open issues for improvements!

# Centenodev V2 Strapi

Headless Strapi CMS feeding content to a [Next.js frontend](https://github.com/Centeno448/centenodev-v2-next) for [centenodev.com](https://www.centenodev.com/)

## Running

Install dependencies running `npm install` and run in development mode with `npm run dev`

Requires the following environment variables to be present in a `.env` file:

```bash

# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=
DATABASE_FILENAME=
JWT_SECRET=

# Next JS
NEXTJS_BASE_URL=http://127.0.0.1:3000
NEXTJS_REVALIDATION_TOKEN=
```

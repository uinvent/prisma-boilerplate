# Prisma-Boilerplate

Boilerplate project with dependencies that are required to start Prisma based application development

## Dependencies

1. Prisma Version 1.34
2. Docker Compose
3. Postgres 10.3

## Background

This application will be using locally deployed database 'postgres' and schema 'boilerplate'

## Development Steps

Follow steps from https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/

### Changes made for boilerplate

1. Updated docker-compose.yml to use locally hosted postgres database

### Extra Knowledge

1. "docker-compose up -d"
   1. This will deploy Prisma Server on localhost:4466 and Prisma API
2. "prisma init --endpoint http://localhost:4466"
   1. Will create two files prisma.yml and datamodel.prisma
3. "prisma deploy"
   1. Will deploy prisma API 2. Migrates types to database
   2. Prisma Admin will be available on http://localhost:4466/\_admin
   3. Now database will have a default table created [user]
   4. http://localhost:4466 will be available for mutations, types, queries etc.]
4. "prisma generate"
   1. Will create prisma client inside ./generated/prisma-client/
5. In index.ts prisma client API is being used; which is a wrapper on Prisma API hosted on Prisma Server

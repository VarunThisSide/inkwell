* using hono package for using express syntax in cloudflare backend server.
* using prisma for syntax ease and database query language independency.
* using prisma postgres database here.
* used prisma accelerate for connection pooling, so that our database is not down in development because of hundreds of links to the database. database will refuse connection after a limit. prisma isn't directly compatible with cloudflare due to having node js dependency packages like engine, whereas cloudflare has its own runtime.
* jwt for authentication
* IMPROVEMENT : pagination is left to be added in route /post/bulk
* published commonly used TS types in npm so that I can use it to both frontend and backend
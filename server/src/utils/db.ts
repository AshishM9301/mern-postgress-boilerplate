import pg from "pg";

const db = new pg.Pool({
  connectionString:
    "postgresql://postgres:123456@localhost:5432/mern?schema=public",
});

export default db;

import db from "../utils/db";

export const userCreation = async (
  req: any,
  res: any,
  next: (arg0?: unknown) => void
) => {
  try {
    let query = `
    CREATE TABLE IF NOT EXISTS public.user (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(100) NULL,
      lastName VARCHAR(100) NULL,
      email VARCHAR(100) UNIQUE NULL,
      password VARCHAR(100) NULL
    )
  `;

    console.log("query", query);

    let q = await db.query(query);

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

import modelString from "../utils/modelString";
import db from "../utils/db";

const User = {
  id: "SERIAL PRIMARY KEY",
  firstName: "VARCHAR(200) NOT NULL",
  lastName: "VARCHAR(200)",
  email: "VARCHAR(200) UNIQUE NOT NULL",
  password: "VARCHAR(200) NOT NULL",
};

export default User;

export const createUser = async () => {
  let subQuery = modelString(User);
  let query = `CREATE TABLE IF NOT EXISTS public.user (${subQuery})`;

  await db.query(query);
};

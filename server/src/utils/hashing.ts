import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const hashing = async (tobeHashed: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);

  let hashedData = await bcrypt.hash(tobeHashed, salt);

  return hashedData;
};

export default hashing;

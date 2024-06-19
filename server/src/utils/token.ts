import jwt from "jsonwebtoken";
import { UserType } from "../types/User";

const genToken = (data: any) => {
  let accessToken = "";
  let refreshToken = "";
  try {
    const secretKey = String(process.env.SECRET_KEY); // Replace with your actual secret key
    accessToken = jwt.sign(data, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
    refreshToken = jwt.sign(data, secretKey, { expiresIn: "7d" });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    return { accessToken, refreshToken };
  }
  //   return { accessToken, refreshToken };
};

const verifyToken = (token: string) => {
  const secretKey = String(process.env.SECRET_KEY); // Replace with your actual secret key

  try {
    const decoded = jwt.verify(token, secretKey) as UserType;
    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { genToken, verifyToken };

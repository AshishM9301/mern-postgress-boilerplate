import zod, { z } from "zod";
import db from "../../utils/db";
import createHttpError from "http-errors";
import modelKeys from "../../utils/modelKeys";
import UserModel from "../../models/User";
import hashing from "../../utils/hashing";
import excludeKey from "../../utils/excludeObj";
import { User, UserType } from "../../types/User";
import { genToken } from "../../utils/token";

const register = async (
  req: { body: any },
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    User.parse(req.body);

    let payload: UserType = req.body;

    let checkEmailQuery = `
   SELECT u.*
   FROM public.user u
   WHERE u.email = '${payload.email}'
`;

    let checkUser = await db.query(checkEmailQuery);

    if (checkUser.rows.length > 0) {
      // Email exists, proceed to the next step
      // Do something here
      // console.log("Email exists, proceed to the next step");
      throw createHttpError.Unauthorized("Email Already registered");
    } else {
      // Email does not exist
      // console.log("Email does not exist");

      let newPassword = await hashing(payload.password);

      const keysString = modelKeys(UserModel);

      // console.log(newPassword);

      let saveUserQuery = `
      INSERT INTO public.user(${keysString}) 
      VALUES(
        '${payload.firstName}','${payload.lastName}','${payload.email}','${newPassword}'
      ) RETURNING *
      `;

      let newUser = await db.query(saveUserQuery);
      // console.log("New user inserted:", newUser.rows[0]);
      let user: UserType = newUser.rows[0];

      console.log("user", user);

      const data = excludeKey(user, "password");

      const { accessToken, refreshToken } = genToken(data);

      // console.log("token", refreshToken);

      // Handle the case where the email does not exist
      return res.status(200).json({
        success: true,
        data: data,
        token: accessToken,
        refreshToken,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default register;

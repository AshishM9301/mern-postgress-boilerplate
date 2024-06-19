import zod, { z } from "zod";
import db from "../../utils/db";
import createHttpError from "http-errors";
import compare from "../../utils/comparePassword";
import excludeKey from "../../utils/excludeObj";
import { UserType } from "../../types/User";
import { genToken } from "../../utils/token";

const login = async (
  req: { body: any },
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const User = z.object({ email: z.string(), password: z.string() });

    User.parse(req.body);

    type User = z.infer<typeof User>;

    let payload: User = req.body;

    let checkEmailQuery = `
   SELECT u.*
   FROM public.user u
   WHERE u.email = '${payload.email}'
`;

    let checkUser = await db.query(checkEmailQuery);

    if (checkUser.rows.length > 0) {
      // Email exists, proceed to the next step
      // Do something here
      // console.log("Email exists, proceed to the next step", checkUser.rows[0]);

      let user: UserType = checkUser.rows[0];
      const comp = await compare(payload.password, user.password);
      const data = excludeKey(user, "password");

      if (!comp) {
        throw createHttpError.Unauthorized("Password is Wrong");
      } else {
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
    } else {
      // Email does not exist
      // console.log("Email does not exist");
      throw createHttpError.Unauthorized("Email not found");
      // Handle the case where the email does not exist
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default login;

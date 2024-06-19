import { z } from "zod";

export const User = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

type User = z.infer<typeof User>;

export interface UserType extends User {
  id?: number;
}

import isAlphanumeric from "validator/es/lib/isAlphanumeric";
import { z } from "zod";

export const Username = z
  .string({ required_error: "Username is required" })
  .refine((arg) => isAlphanumeric(arg, undefined, { ignore: "-_." }), {
    message:
      "Username must only contain letters, numbers, periods, hyphens or dashes",
  });

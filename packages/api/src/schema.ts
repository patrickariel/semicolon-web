import isAlphanumeric from "validator/es/lib/isAlphanumeric";
import { z } from "zod";

export const Username = z
  .string()
  .refine((arg) => isAlphanumeric(arg, undefined, { ignore: "-_." }));

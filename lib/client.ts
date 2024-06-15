import { contract } from "@semicolon/api";
import { initQueryClient } from "@ts-rest/react-query";

export const client = initQueryClient(contract, {
  baseUrl: process.env.API_URL ?? "http://localhost:4000",
  validateResponse: true,
});

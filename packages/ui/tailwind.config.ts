import sharedConfig from "@semicolon/tailwind-config";
import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [sharedConfig],
} satisfies Pick<Config, "content" | "presets">;

export default config;

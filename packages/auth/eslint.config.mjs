// @ts-check
import library from "@semicolon/eslint-config/library.mjs";
import tseslint from "typescript-eslint";

export default tseslint.config(...library, {
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});

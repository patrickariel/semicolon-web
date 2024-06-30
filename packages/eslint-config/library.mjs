// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.ConfigArray} */
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      // INFO: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69660
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);

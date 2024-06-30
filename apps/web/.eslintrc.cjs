module.exports = {
  extends: ["@semicolon/eslint-config/next.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
};

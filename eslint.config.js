import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  js.configs.recommended,

  // Configuração do Jest
  {
    files: ["**/*.test.js", "**/*.spec.js", "**/__tests__/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Node globals
        process: "readonly",
        console: "readonly",
        // Jest globals
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "error",
      "jest/no-identical-title": "error",
    },
  },
];

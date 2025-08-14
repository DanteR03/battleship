import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  eslintPluginPrettierRecommended,
]);

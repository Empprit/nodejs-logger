import globals from "globals";
import { defineConfig } from "eslint/config";

// Konfig
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier/flat";

// Plugin
import js from "@eslint/js";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.node,
        },
    },

    // Konfig lainnya ditaruh di sini.
    prettier,
    tseslint.configs.recommended,
]);

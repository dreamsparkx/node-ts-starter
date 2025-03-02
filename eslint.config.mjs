import pluginJs from "@eslint/js"
import globals from 'globals'
import tselint from "typescript-eslint"
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    {files: ["src/**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    ...tselint.configs.recommended,
    {
        ignores: ["dist/*", "docs/**/*", "coverage/*", "**/*.d.ts", "src/public/", "src/types/", "jest.config.js"]
    },
    eslintConfigPrettier,
]
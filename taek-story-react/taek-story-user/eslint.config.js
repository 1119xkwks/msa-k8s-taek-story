import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier"; // ✅ 추가
import configPrettier from "eslint-config-prettier"; // ✅ 추가

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier, // ✅ Prettier 플러그인 추가
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...configPrettier.rules, // ✅ ESLint 규칙과 Prettier 충돌 제거
      "prettier/prettier": ["error"], // ✅ Prettier 규칙 위반 시 에러 처리
      "no-unused-vars": "off",
      "react/prop-types": "off",
    },
  },
];

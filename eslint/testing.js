import vitest from "@vitest/eslint-plugin";
import { defineFlatConfig } from "eslint-define-config";
// @ts-expect-error No type declarations.
import { default as jestDom } from "eslint-plugin-jest-dom";
import playwright from "eslint-plugin-playwright";
// @ts-expect-error No type declarations.
import { default as testingLibrary } from "eslint-plugin-testing-library";

export default defineFlatConfig([
	{
		...playwright.configs["flat/recommended"],
		files: ["**/e2e/**/*"],
		rules: {
			...playwright.configs["flat/recommended"].rules,
		},
	},
	{
		files: ["**/*.spec.ts"],
		languageOptions: {
			globals: {
				...vitest.environments.env.globals,
			},
		},

		plugins: {
			vitest,
		},

		rules: {
			...vitest.configs.recommended.rules,
			"unicorn/filename-case": "off",
			"vitest/valid-expect": "off",
		},

		settings: {
			vitest: {
				typecheck: true,
			},
		},
	},
	{
		files: ["**/*.spec.ts"],
		...testingLibrary.configs["flat/dom"],
		...jestDom.configs["flat/recommended"],
	},
]);

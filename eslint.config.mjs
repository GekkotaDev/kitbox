// @ts-expect-error: no type definitions
import eslint from "@eslint/js";
import query from "@tanstack/eslint-plugin-query";
// @ts-expect-error: no type definitions
import prettier from "eslint-config-prettier";
import { defineFlatConfig } from "eslint-define-config";
import oxlint from "eslint-plugin-oxlint";
import perfectionist from "eslint-plugin-perfectionist";
// @ts-expect-error: no type definitions
import promise from "eslint-plugin-promise";
import svelte from "eslint-plugin-svelte";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import ts from "typescript-eslint";

import configs from "./eslint/configs.js";
import ignores from "./eslint/ignores.js";

export default [
	...defineFlatConfig([
		eslint.configs.recommended,
		...ts.configs.recommended,
		perfectionist.configs["recommended-natural"],
		promise.configs["flat/recommended"],
		unicorn.configs["flat/recommended"],
		...query.configs["flat/recommended"],
		...svelte.configs["flat/recommended"],
		prettier,
		...svelte.configs["flat/prettier"],
		{
			ignores,

			languageOptions: {
				globals: {
					...globals.browser,
					...globals.node,
				},

				parserOptions: {
					parser: ts.parser,
				},
			},

			rules: {
				"no-lonely-if": "warn",
				"no-undef": "off",
			},
		},
		{
			files: ["**/*.svelte"],
			ignores,

			languageOptions: {
				globals: {
					...globals.browser,
				},

				parserOptions: {
					parser: ts.parser,
				},
			},

			rules: {
				"unicorn/filename-case": 0,
			},
		},
		...configs,
	]),

	// Disable rules already handled by oxlint.
	oxlint.configs["flat/recommended"],
];

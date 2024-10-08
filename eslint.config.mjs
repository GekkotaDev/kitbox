import { defineFlatConfig } from "eslint-define-config";

import globals from "globals";

// @ts-expect-error: no type definitions
import eslint from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
// @ts-expect-error: no type definitions
import prettier from "eslint-config-prettier";
// @ts-expect-error: no type definitions
import promise from "eslint-plugin-promise";
import sonarjs from "eslint-plugin-sonarjs";
import svelte from "eslint-plugin-svelte";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import ts from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import oxlint from "eslint-plugin-oxlint";

const ignores = [
	"**/*.config.*",
	"**/.svelte-kit/",
	"**/build/",
	"**/dist*",
	"**/src-tauri/",
	"**/node_modules/",
];

export default [
	...defineFlatConfig([
		eslint.configs.recommended,
		...ts.configs.recommended,
		promise.configs["flat/recommended"],
		unicorn.configs["flat/recommended"],
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

			plugins: {
				"simple-import-sort": simpleImportSort,
			},

			rules: {
				"no-lonely-if": "warn",
				"no-undef": 0,

				"simple-import-sort/imports": "warn",
				"simple-import-sort/exports": "warn",

				"jsdoc/require-param-type": 0,
				"jsdoc/require-returns-type": 0,
				"jsdoc/tag-lines": 0,
			},
		},
		{
			files: ["**/*.svelte"],
			ignores,

			languageOptions: {
				parserOptions: {
					parser: ts.parser,
				},
			},
		},
		{
			...jsdoc.configs["flat/recommended"],
			files: ["**/*.js"],
			ignores,
		},
		{
			...jsdoc.configs["flat/recommended-typescript"],
			files: ["**/*.ts", "**/*.svelte"],
			ignores,
		},
		{
			...sonarjs.configs.recommended,
			files: ["**/*.ts", "**/*.js", "./screening/"],
			ignores,
		},
	]),

	oxlint.configs["flat/recommended"],
];

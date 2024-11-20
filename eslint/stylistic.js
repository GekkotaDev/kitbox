import { defineFlatConfig } from "eslint-define-config";

import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/**
 * https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#custom-grouping
 */
const importGroups = [
	// CSS imports
	[String.raw`.css$`],

	// Side effect imports.
	[String.raw`^\u0000`],

	// Node.js builtins prefixed with `node:`.
	[String.raw`^node:`],

	// Svelte APIs.
	// Ideally these would be emphasized first and foremost.
	[String.raw`^svelte\b`, String.raw`^svelte\/.*`],

	// Packages.
	// Things that start with a letter (or digit or underscore), or `@` followed by a letter.
	[String.raw`^@?\w`],

	// Features.
	[String.raw`^\(features\)`],

	// $lib.
	[String.raw`^\$lib`],

	[String.raw`^\$ui`, String.raw`^~icon`],

	// Absolute imports and other imports such as Vue-style `@/foo`.
	// Anything not matched in another group.
	[String.raw`^`],

	// Relative imports.
	// Anything that starts with a dot.
	[String.raw`^\.`],
];

export default defineFlatConfig([
	{
		plugins: {
			"@stylistic/js": stylisticJs,
		},

		rules: {
			"@stylistic/js/object-curly-newline": [
				"error",
				{
					ExportDeclaration: "never",
					ImportDeclaration: "never",
					ObjectExpression: {
						minProperties: 1,
					},
					ObjectPattern: {
						multiline: true,
					},
				},
			],
			"@stylistic/js/object-property-newline": [
				"error",
				{
					allowAllPropertiesOnSameLine: false,
				},
			],
		},
	},
	{
		plugins: {
			"@stylistic/ts": stylisticTs,
		},

		rules: {},
	},
	{
		plugins: {
			"simple-import-sort": simpleImportSort,
		},

		rules: {
			"simple-import-sort/exports": "warn",
			"simple-import-sort/imports": [
				"warn",
				{
					groups: importGroups,
				},
			],
		},
	},
	{
		rules: {
			// Handled by eslint-plugin-simple-import-sort.
			"perfectionist/sort-exports": "off",
			"perfectionist/sort-imports": "off",
			"perfectionist/sort-named-exports": "off",
			"perfectionist/sort-named-imports": "off",

			"svelte/derived-has-same-inputs-outputs": "error",
		},
	},
]);

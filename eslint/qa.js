import { defineFlatConfig } from "eslint-define-config";

import jsdoc from "eslint-plugin-jsdoc";
import sonarjs from "eslint-plugin-sonarjs";

import ignores from "./ignores.js";

export default defineFlatConfig([
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
		rules: {
			"jsdoc/tag-lines": "off",
		},
	},

	{
		...sonarjs.configs.recommended,
		files: ["**/*.ts", "**/*.js"],
		ignores,
	},
]);

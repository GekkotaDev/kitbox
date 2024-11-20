import { defineFlatConfig } from "eslint-define-config";

export default defineFlatConfig([
	{
		rules: {
			"no-else-return": "error",
		},
	},
	{
		files: [
			"apps/**/src/**/*.js",
			"apps/**/src/**/*.ts",
			"apps/**/src/**/*.svelte",
		],
		rules: {
			"no-restricted-syntax": [
				"error",
				{
					message: [
						"Use the except() API over catch and match the Result type",
					].join(" "),
					selector: "CatchClause",
				},
				{
					message: ["Replace finally keyword with defer()"].join(" "),
					selector: 'TryStatement[handler.type="CatchClause"][finalizer!=null]',
				},
			],
		},
	},
]);

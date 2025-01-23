import { configs } from "@gcko/eslint-config";

export default await configs({
	extensions: {
		prettier: true,
		query: true,
		svelte: true,
		test: true,
	},

	fp: [
		"no-exceptions",
		"no-inheritance",
		"no-loops",
		"no-mutability",
		"no-side-effects",
	],

	importOrder: [
		// CSS imports
		[String.raw`.css$`],

		// Side effect imports.
		[String.raw`^\u0000`],

		// Node.js builtins prefixed with `node:`.
		[String.raw`^node:`],

		// Svelte APIs.
		// Ideally these would be emphasized first and foremost.
		[String.raw`^svelte\b`, String.raw`^svelte\/.*`],

		[String.raw`^(\$$|\$\/)`, String.raw`^(_$|_\/)`, String.raw`^@?\w`],

		// Features.
		[String.raw`^\(features\)`, String.raw`^~\/`],

		// SvelteKit Imports.
		[String.raw`^\$app`, String.raw`^\$env`, String.raw`^\$lib`],

		[String.raw`^\$`],

		// Absolute imports and other imports such as Vue-style `@/foo`.
		// Anything not matched in another group.
		[String.raw`^`],

		// Relative imports.
		// Anything that starts with a dot.
		[String.raw`^\.`],
	],

	tsconfigRootDir: import.meta.dirname,

	typed: true,
});

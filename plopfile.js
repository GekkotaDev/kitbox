// eslint-disable-next-line jsdoc/require-jsdoc
export default function plopfile(
	/** @type {import('plop').NodePlopAPI} */
	plop,
) {
	plop.setGenerator("package", {
		actions: [
			{
				path: "./packages/{{name}}/package.json",
				templateFile: "./templates/package/package.json.hbs",
				type: "add",
			},
			{
				path: "./packages/{{name}}/tsconfig.json",
				templateFile: "./templates/package/tsconfig.json.hbs",
				type: "add",
			},
			{
				path: "./packages/{{name}}/tsup.config.ts",
				templateFile: "./templates/package/tsup.config.ts.hbs",
				type: "add",
			},
			{
				path: "./packages/{{name}}/vitest.config.ts",
				templateFile: "./templates/package/vitest.config.ts.hbs",
				type: "add",
			},
		],
		description: "monorepo package.",
		prompts: [
			{
				message: "name of the package.",
				name: "name",
				type: "input",
			},
		],
	});
}

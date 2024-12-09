import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// #region Utilities
/**
 * @param {string} key
 * @param {string} path
 */
const alias = (key, path) => {
	const aliases = {
		key: path,
	};

	aliases[`${key}/*`] = path.endsWith("/") ? `${path}*` : `${path}/*`;

	return aliases;
};
// #endregion

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: "404.html",
		}),

		alias: {
			...alias("$", "./src/lib/utils"),
			...alias("$asset", "./src/assets"),
			...alias("$component", "./src/lib/components"),
			...alias("$model", "./src/lib/models"),
			...alias("$type", "./src/lib/types"),
			...alias("$ui", "./src/lib/shadcn/components/ui"),
			...alias("~", "./src/lib/features"),
		},
	},

	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
};

export default config;

import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: "404.html",
		}),

		alias: {
			$asset: "./src/assets",
			"$asset/*": "./src/assets/*",
			$type: "./src/lib/types",
			"$type/*": "./src/lib/types/*",
			$ui: "./src/lib/shadcn/components",
			"$ui/*": "./src/lib/shadcn/components/*",
			"~": "./src/lib/features",
			"~/*": "./src/lib/features/*",
		},
	},

	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
};

export default config;

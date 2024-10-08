import { purgePolyfills } from "unplugin-purge-polyfills";
import { defineConfig } from "vitest/config";

export default defineConfig({
	build: {
		outDir: "../app/build-isolation",
	},

	plugins: [purgePolyfills.vite({})],

	test: {
		coverage: {
			provider: "v8",
		},

		globals: true,
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});

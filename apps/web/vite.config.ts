import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelteInspector } from "@sveltejs/vite-plugin-svelte-inspector";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { MagicRegExpTransformPlugin } from "magic-regexp/transform";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import { purgePolyfills } from "unplugin-purge-polyfills";
import Components from "unplugin-svelte-components/vite";
import { comlink } from "vite-plugin-comlink";
import { kitRoutes } from "vite-plugin-kit-routes";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		MagicRegExpTransformPlugin.vite(),

		comlink(),

		kitRoutes(),

		AutoImport({
			dirs: ["./src/lib/globals"],

			eslintrc: {
				enabled: true,
			},

			imports: [
				{
					from: "$app/navigation",
					imports: ["goto"],
				},

				{
					from: "$lib/ROUTES",
					imports: ["route"],
				},

				{
					from: "svelte",
					imports: ["onDestroy", "onMount"],
				},

				{
					from: "temporal-polyfill",
					imports: ["Temporal"],
				},

				{
					from: "ts-brix",
					imports: [
						"Enum",
						"P",
						"defer",
						"err",
						"except",
						"match",
						"ofType",
						"ok",
						"none",
						"pattern",
						"pipe",
						"some",
						"types",
					],
				},
			],

			include: [
				/\.svelte.[jt]s$/, // .svelte.js, .svelte.ts
				/\.[jt]sx?$/, // .ts, .tsx, .js, .jsx
				/\.svelte$/, // .svelte
				/\.svx$/, // .svx
				/\.md$/, // .md
			],
		}),

		Components({
			dirs: ["./src/lib/globals"],
			dts: true,
			exclude: [
				/[/\\]\.git[/\\]/,
				/[/\\]\.svelte-kit[/\\]/,
				/[/\\]build[/\\]/,
				/[/\\]node_modules[/\\]/,
				/[/\\]shadcn[/\\]/,
				/[/\\]static[/\\]/,
				/[/\\]spec[/\\]/,
				/[/\\]test[/\\]/,
			],
		}),

		enhancedImages(),

		sveltekit(),

		svelteInspector({}),

		SvelteKitPWA(),

		Icons({
			compiler: "svelte",
		}),

		/*
      Automatically purge dependencies from he who shall not be named from your
      bundle and replace them with native equivalents.
     */
		purgePolyfills.vite({}),

		visualizer({
			emitFile: true,
			filename: "bundle-size.html",
		}),
	],

	test: {
		coverage: {
			provider: "v8",
		},

		globals: true,
		include: ["src/**/*.{test,spec}.{js,ts}"],

		typecheck: {
			enabled: true,
			tsconfig: "./tsconfig.spec.json",
		},
	},

	worker: {
		plugins: () => [comlink()],
	},
});

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
import { kitRoutes } from "vite-plugin-kit-routes";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    MagicRegExpTransformPlugin.vite(),

    kitRoutes(),

    AutoImport({
      eslintrc: {
        enabled: true,
      },

      imports: [
        {
          from: "$app/navigation",
          imports: [
            "afterNavigate",
            "beforeNavigate",
            "goto",
            "onNavigate",
            "preloadCode",
            "preloadData",
            "pushState",
            "replaceState",
          ],
        },

        {
          from: "$lib/ROUTES",
          imports: ["route"],
        },

        {
          from: "@nanostores/persistent",
          imports: ["persistentAtom", "persistentMap"],
        },

        {
          from: "@tanstack/svelte-query",
          imports: [
            "createQuery",
            "createQueries",
            "createInfiniteQuery",
            "createMutation",
            "useQueryClient",
            "useIsFetching",
            "uesIsMutating",
          ],
        },

        {
          from: "nanostores",
          imports: ["map", "deepMap", "atom", "computed"],
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
            "Result",
            "err",
            "match",
            "ok",
            "ofTypes",
            "P",
            "pipe",
            "result",
            "resultOf",
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

      dirs: [
        "./src/lib/global",
        "./src/lib/types",

        "./src/lib/features/**/context",
        "./src/lib/features/**/stores",
        "./src/lib/features/**/use/shared",
        "./src/lib/features/**/types/shared",
      ],
    }),

    Components({
      dts: true,
      dirs: ["./src/lib/features/**/components"],
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

    svelteInspector({
      /* plugin options */
    }),

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
  },
});

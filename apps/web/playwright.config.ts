import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "e2e",

	webServer: {
		command: "pnpm run build && pnpm run preview",
		port: 4173,
	},
});

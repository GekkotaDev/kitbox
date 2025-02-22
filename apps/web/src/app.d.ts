import type * as app from "@tauri-apps/api/app";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		__TAURI__: {
			app?: typeof app;
			// ... the other tauri modules
		};
	}
}

export {};

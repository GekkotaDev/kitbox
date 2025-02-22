import type * as app from "@tauri-apps/api/app";

declare global {
	interface Window {
		__TAURI__: {
			app?: typeof app;
			// ... the other tauri modules
		};

		__TAURI_ISOLATION_HOOK__: <T = unknown>(payload: T) => unknown;
	}
}

export {};

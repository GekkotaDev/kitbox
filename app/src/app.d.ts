import type * as app from "@tauri-apps/api/app";

// See https://kit.svelte.dev/docs/types#app
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

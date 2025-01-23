# KitBox

My desktop + mobile application starter template to get common boilerplate out of the way.

## Getting Started

**Note**: Given this template is tailored for my own use, some instructions and packages may not apply to you nor should you expect support from me. I can not guarantee stability either.

```powershell
pnpm dlx giget@latest gh:gekkotadev/kitbox
```

### Checklist

- [ ] Rename `App.code-workspace` to your app's name.
- [ ] Install/enable recommended extensions.
- [ ] Rename all references to the default app name.
- [ ] (Optional) Change license as needed.
- [ ] (Optional) Setup Conventional Commits tooling. (commitizen, changelogen, etc.)

## Features

For reference, KitBox features the following in its tech stack.

- 👟 Frontend powered by [SvelteKit](https://kit.svelte.dev/) w/ Svelte 5. Straightforward abstraction over vanilla JavaScript and a lightweight experience for end users.
- ⚙️ Native platform code via [Tauri](https://v2.tauri.app/).
- 🧪 [Vitest](https://vitest.dev/). Fast, comprehensive unit testing framework with integration into Vite's build pipeline.
- 🪺 Opinionated file nesting configuration. It won't solve having too many configuration files but it will reduce visual clutter in your file explorer.
- 🪄 [Automatic](https://github.com/unplugin/unplugin-auto-import) [imports](https://github.com/Mohamed-Kaizen/unplugin-svelte-components). No bundle bloat. Type safe. Use APIs directly as if they were built-in primitives.
- 🚦 [Typed routing](https://www.kitql.dev/docs/tools/06_vite-plugin-kit-routes). Opt-in automatic and transparent intellisense for your application's routes.
- 🧰 Multiple utilities included out of the box. Enjoy pattern matching, result types, type safe context and more.

It does not concern itself with server-side code, that is outside of the scope of this template.

For PWA support, see `@vite-pwa/sveltekit`. The template should still be applicable even if Tauri is omitted post template cloning, just remove the native directory.

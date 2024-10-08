import { init, locale, register, waitLocale } from "svelte-i18n"

import { browser } from "$app/environment"

import type { MessageID } from "../dot-key-extraction"

type Locale = [string, Promise<object> | (() => Promise<object>)]
type ID<T extends object> = MessageID<Omit<T, "default">>

// eslint-disable-next-line jsdoc/require-returns
/**
 * Inject translation messages into the current page.
 *
 * @param options Runtime behavior configuration.
 * @param locales List of translation messages.
 */
export const addLocales = <T extends Locale[], Schema = T[0][1]>(
	options: Partial<{
		fallbackLocale: string
	}>,
	...locales: T
) => {
	const { fallbackLocale = "en" } = options

	locales.map((locale) => {
		const [code, messages] = locale

		if (typeof messages === "function") return register(code, messages)
		register(code, () => messages)
	})

	init({
		fallbackLocale,
		initialLocale: browser ? window.navigator.language : fallbackLocale,
	})

	return {
		id: "" as ID<
			Awaited<
				Schema extends Promise<object>
					? Schema
					: ReturnType<Schema extends () => Promise<object> ? Schema : never>
			>
		>,

		of: (
			value:
				| ID<
						Awaited<
							Schema extends Promise<object>
								? Schema
								: ReturnType<
										Schema extends () => Promise<object> ? Schema : never
									>
						>
				  >
				| (string & {}),
		) => value,
	} as const
}

export const loadLocales = async () => {
	if (browser) {
		locale.set(window.navigator.language)
	}

	await waitLocale()
}

const addLocale =
	<T extends object>(module: Promise<object & { default: T }>) =>
	async () =>
		(await module).default

export { addLocale as locale }

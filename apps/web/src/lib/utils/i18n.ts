import { init, locale, register, waitLocale } from "svelte-i18n";

import { browser } from "$app/environment";

// https://stackoverflow.com/a/76547796
// eslint-disable-next-line sonarjs/redundant-type-aliases
type TranslationString = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExcludedTypes = (...arguments_: any[]) => any;

type Dot<T extends string, U extends string> = "" extends U ? T : `${T}.${U}`;

/**
 * All valid translation IDs that can be passed in the `$format` store inferred
 * from either a schema or the 0th dictionary.
 */
type MessageID<Messages> = Messages extends TranslationString
	? ""
	: Messages extends readonly unknown[]
		? MessageID<Messages[number]>
		: {
				[Key in keyof Messages &
					string]: Messages[Key] extends TranslationString
					? Key
					: Messages[Key] extends ExcludedTypes
						? never
						: Dot<Key, MessageID<Messages[Key]>>;
			}[keyof Messages & string];

type Locale = [string, (() => Promise<object>) | Promise<object>];
type ID<T extends object> = MessageID<Omit<T, "default">>;

// eslint-disable-next-line jsdoc/require-returns
/**
 * Inject translation messages into the current page.
 * @param options Runtime behavior configuration.
 * @param locales List of translation messages.
 */
export const addLocales = <T extends Locale[], Schema = T[0][1]>(
	options: Partial<{
		fallbackLocale: string;
	}>,
	...locales: T
) => {
	const { fallbackLocale = "en" } = options;

	locales.map((locale) => {
		const [code, messages] = locale;

		if (typeof messages === "function") return register(code, messages);
		register(code, () => messages);
	});

	init({
		fallbackLocale,
		initialLocale: browser ? globalThis.navigator.language : fallbackLocale,
	});

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
				| ({} & string)
				| ID<
						Awaited<
							Schema extends Promise<object>
								? Schema
								: ReturnType<
										Schema extends () => Promise<object> ? Schema : never
									>
						>
				  >,
		) => value,
	} as const;
};

export const loadLocales = async () => {
	if (browser) {
		locale.set(globalThis.navigator.language);
	}

	await waitLocale();
};

const addLocale =
	<T extends object>(module: Promise<{ default: T } & object>) =>
	async () =>
		// eslint-disable-next-line unicorn/no-await-expression-member
		(await module).default;

export { addLocale as locale };

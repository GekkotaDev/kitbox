// Derived from this answer.
// https://stackoverflow.com/a/76547796

// eslint-disable-next-line sonarjs/redundant-type-aliases
type TranslationString = string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExcludedTypes = (...args: any[]) => any

type Dot<T extends string, U extends string> = "" extends U ? T : `${T}.${U}`

/**
 * All valid translation IDs that can be passed in the `$format` store inferred
 * from either a schema or the 0th dictionary.
 */
export type MessageID<Messages> = Messages extends TranslationString
	? ""
	: Messages extends readonly unknown[]
		? MessageID<Messages[number]>
		: {
				[Key in keyof Messages &
					string]: Messages[Key] extends TranslationString
					? Key
					: Messages[Key] extends ExcludedTypes
						? never
						: Dot<Key, MessageID<Messages[Key]>>
			}[keyof Messages & string]

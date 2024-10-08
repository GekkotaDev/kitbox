<script module lang="ts">
export interface StateContext<S extends symbol, T> {
	key: S

	new (): T
}
</script>

<script lang="ts">
import { setContext, type Snippet } from "svelte"

interface Properties {
	children?: Snippet
	providers: (
		| StateContext<symbol, unknown>
		| (() => { key: symbol; state: unknown })
	)[]
}

let { children, providers: stores }: Properties = $props()

stores.map((store) => {
	if ("key" in store) return setContext(store.key, new store())
	// eslint-disable-next-line sonarjs/inconsistent-function-call
	const { key, state } = store()
	setContext(key, state)
})
</script>

{@render children?.()}

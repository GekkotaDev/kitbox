<script lang="ts">
import type { Snippet } from "svelte"
import { tw } from "$macro/tw" with { type: "macro" }

interface Properties {
	class?: string
	children: Snippet
	typeface?: boolean
}

let { class: classname = "", children, typeface: type }: Properties = $props()

const typeface = $derived(
	match(type)
		.with(true, () => tw`font-body`)
		.with(P.optional(false), () => "")
		.exhaustive(),
)
</script>

<p class={cn("leading-7 [&:not(:first-child)]:mt-6", classname, typeface)}>
	{@render children()}
</p>

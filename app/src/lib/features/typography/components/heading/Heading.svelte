<script lang="ts">
import { cn } from "$lib/utils"
import { tw } from "$macro/tw" with { type: "macro" }
import type { Snippet } from "svelte"

interface Properties {
	class?: string
	size: 1 | 2 | 3 | 4
	children: Snippet
	typeface?: boolean
}

const {
	class: classname,
	size,
	typeface: type,
	children,
}: Properties = $props()

const heading = $derived(
	match(size)
		.with(
			1,
			() => tw`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`,
		)
		.with(
			2,
			() =>
				tw`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0`,
		)
		.with(3, () => tw`scroll-m-20 text-2xl font-semibold tracking-tight`)
		.with(4, () => tw`scroll-m-20 text-xl font-semibold tracking-tight`)
		.exhaustive(),
)

const typeface = $derived(
	match(type)
		.with(true, () => tw`font-sans`)
		.with(P.optional(false), () => "")
		.exhaustive(),
)
</script>

{#if size === 1}
	<h1 class={cn(classname, heading, typeface)}>
		{@render children()}
	</h1>
{:else if size === 2}
	<h2 class={cn(classname, heading, typeface)}>
		{@render children()}
	</h2>
{:else if size === 3}
	<h3 class={cn(classname, heading, typeface)}>
		{@render children()}
	</h3>
{:else if 4}
	<h4 class={cn(classname, heading, typeface)}>
		{@render children()}
	</h4>
{/if}

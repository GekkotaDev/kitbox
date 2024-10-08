<script lang="ts">
import { cn } from "$lib/utils"
import type { Snippet } from "svelte"

interface Properties {
	class?: string
	children: Snippet
}

let { class: classname = "", children }: Properties = $props()
</script>

<small class={cn("text-sm font-medium leading-none", classname)}>
	{@render children()}
</small>

<script lang="ts">
import { cn } from "$lib/utils"
import type { Snippet } from "svelte"

interface Properties {
	class?: string
	children: Snippet
}

let { class: classname = "", children }: Properties = $props()
</script>

<div class={cn("text-lg font-semibold", classname)}>
	{@render children()}
</div>

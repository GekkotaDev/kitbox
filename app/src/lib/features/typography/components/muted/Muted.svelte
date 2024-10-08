<script lang="ts">
import { cn } from "$lib/utils"
import type { Snippet } from "svelte"

interface Properties {
	class?: string
	children: Snippet
}

let { class: classname = "", children }: Properties = $props()
</script>

<p class={cn("text-sm text-muted-foreground", classname)}>
	{@render children()}
</p>

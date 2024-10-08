<script lang="ts">
import { cn } from "$lib/utils"
import type { Snippet } from "svelte"

interface Properties {
	class?: string
	children: Snippet
}

let { class: classname = "", children }: Properties = $props()
</script>

<blockquote class={cn("mt-6 border-l-2 pl-6 italic", classname)}>
	{@render children()}
</blockquote>

<script lang="ts">
import { cn } from "$lib/utils"
import type { Snippet } from "svelte"

interface Properties {
	class?: string
	children: Snippet
}

let { class: classname = "", children }: Properties = $props()
</script>

<ol class={cn("my-6 ml-6 list-disc [&>li]:mt-2", classname)}>
	{@render children()}
</ol>

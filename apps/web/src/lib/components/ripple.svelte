<script lang="ts">
import type { Snippet } from "svelte"
import { ripple } from "svelte-ripple-action"

interface Properties {
	children: Snippet
	container: Snippet<[{ className: string; rippled: Snippet }]>
}

const { children, container }: Properties = $props()
</script>

{#snippet wrapper()}
	{@render children()}
	<div
		use:ripple
		aria-hidden="true"
		class="absolute size-full rounded-[inherit]"
	></div>
{/snippet}

{@render container({ className: "relative", rippled: wrapper })}

<!--
@component

## Ripple

Utility to add a Material Design ripple to an arbitrary component.

### Snippets

#### Container

Element whose responsibility is to contain the ripple inside it.

Property    | Description
------------|---
`className` | Mandatory styling needed to contain the ripple.
`rippled`   | The ripple area alongside the child elements.

#### Children

Elements contained in the area where the ripple is applied.

### Example

```svelte
<Ripple>
	{#snippet container({ className, rippled })}
		<Button class={className}>
			{@render rippled()}
		</Button>
	{/snippet}

	<IconBack/>
</Ripple>
```
-->

import { untrack } from "svelte";

export default Object.assign(
	(dependencies: () => void, effect: () => void) => {
		$effect(() => {
			dependencies();
			untrack(effect);
		});
	},
	{
		defer: Object.assign(
			(dependencies: () => void, effect: () => void) => {
				let initial = true;

				$effect(() => {
					dependencies();

					if (initial) {
						initial = false;
						return;
					}

					untrack(effect);
				});
			},
			{
				pre: (dependencies: () => void, effect: () => void) => {
					let initial = true;

					$effect.pre(() => {
						dependencies();

						if (initial) {
							initial = false;
							return;
						}

						untrack(effect);
					});
				},
			},
		),

		pre: (dependencies: () => void, effect: () => void) => {
			$effect.pre(() => {
				dependencies();
				untrack(effect);
			});
		},
	},
);

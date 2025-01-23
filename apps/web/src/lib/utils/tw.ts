export const tw = (
	strings: TemplateStringsArray,
	...templates: (null | string | undefined)[]
) => {
	const classnameStack = strings.map((string, index) => {
		const template = templates.at(index);
		return template ? `${string} ${template}` : string;
	});

	const lastTemplate = templates.at(-1);
	if (lastTemplate) {
		// eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-unused-vars
		const _ = classnameStack.push(lastTemplate);
	}

	return classnameStack.join(" ");
};

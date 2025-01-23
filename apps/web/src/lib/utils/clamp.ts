export const clamp = (
	range: { maximum: number; minimum: number },
	value: number,
) => {
	const { maximum, minimum } = range;
	if (maximum < minimum)
		return error(
			new RangeError("The values for minimum and maximum are reversed."),
		);

	return ok(Math.min(Math.max(value, minimum), maximum));
};

export default clamp;

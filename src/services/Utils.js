
export function defaultValue(tested, defaultValue) {
	return typeof tested !== "undefined" ? tested : defaultValue
}

export function round(value, precision) {
	let multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}

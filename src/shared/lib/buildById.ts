export const buildById = <T extends { id: number | string }>(
	items: T[],
): Record<string | number, T> => {
	return Object.fromEntries(items.map((item) => [item.id, item]));
};

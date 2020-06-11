export const formatCount = (count: number | undefined): string => {
	if (count)
		return count >= 1000 ? (count / 1000).toFixed(1) + "k+" : count + "";
	return "0";
};

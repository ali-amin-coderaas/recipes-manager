export const formatTimeStamp = (timestamp) => {
	const date = new Date(timestamp);
	return date.toLocaleDateString();
};

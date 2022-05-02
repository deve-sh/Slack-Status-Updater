const getTodayISOString = () => {
	let now = new Date();
	const offset = now.getTimezoneOffset();
	now = new Date(now.getTime() - offset * 60 * 1000);
	return now.toISOString().split("T")[0];
};

module.exports = getTodayISOString;

const getBaseExpiryISOTime = () => {
	const now = new Date();
	const nextHour = (now.getHours() + 1) % 24;
	return `${nextHour < 10 ? "0" : ""}${nextHour}:00`;
};

module.exports = getBaseExpiryISOTime;

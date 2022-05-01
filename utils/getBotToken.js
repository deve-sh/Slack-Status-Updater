module.exports = async (teamId) => {
	const admin = require("../firebase");
	// Any user's token info matching the team id, to extract the bot token for the workspace/team.
	let userToken = (
		await admin
			.firestore()
			.collection("usertokens")
			.where("team.id", "==", teamId)
			.limit(1)
			.get()
	).docs;
	if (userToken[0] && userToken[0].data()) userToken = userToken[0].data();
	if (userToken && userToken.token_type === "bot" && userToken.access_token) {
		const botToken = userToken.access_token;
		return botToken;
	}
	return null;
};

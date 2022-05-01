module.exports = async (userId) => {
	const admin = require("../firebase");
	const userToken = (
		await admin.firestore().collection("usertokens").doc(userId).get()
	).data();
	if (userToken && userToken.authed_user && userToken.authed_user.access_token)
		return userToken.authed_user.access_token;
	return null;
};

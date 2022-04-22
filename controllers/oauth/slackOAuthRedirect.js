const qs = require("qs");
const { SERVER_ERROR } = require("../../constants");
const admin = require("../../firebase");

const startSlackOAuth = async (req, res) => {
	const message = (status, message) => res.status(status).json({ message });
	const clientId = process.env.SLACK_CLIENT_ID;
	const clientSecret = process.env.SLACK_CLIENT_SECRET;
	const slackRedirectUrl = process.env.SLACK_REDIRECT_URL;

	if (!clientId || !clientSecret || !slackRedirectUrl)
		return message(500, SERVER_ERROR);

	const { code } = req.query;

	if (!code) return message(400, "Invalid Request");

	// Get the access token and other info for the user and workspace.
	const axios = require("axios");
	try {
		const requestBody = qs.stringify({
			code,
			redirect_uri: slackRedirectUrl,
			client_id: clientId,
			client_secret: clientSecret,
		});
		const resp = await axios.post(
			"https://slack.com/api/oauth.v2.access",
			requestBody,
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		);
		if (!resp.data.ok) throw new Error(resp.data.error);

		await admin
			.firestore()
			.collection("usertokens")
			.doc(resp.data.authed_user.id)
			.set({ ...resp.data, createdAt: new Date(), updatedAt: new Date() });
		return res.json(resp.data);
	} catch (err) {
		console.log(
			"Error during token retreival and storage to database: ",
			err && err.response && err.response.data ? err.response.data : err
		);
		return message(500, SERVER_ERROR);
	}
};

module.exports = startSlackOAuth;

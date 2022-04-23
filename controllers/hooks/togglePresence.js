/* Slash Command to toggle presence status for a user. */
const axios = require("axios");

module.exports = async (req, res) => {
	const message = (text) =>
		res.json({
			text,
			response_type: "ephemeral",
		});
	const { user_id, response_url } = req.body || {};
	const sendResponseToSlack = (text) =>
		axios.post(response_url, {
			text,
			response_type: "ephemeral",
		});
	try {
		// Respond to slack immediately to avoid a 3s timeout error.
		message(`Updating your presence status <@${user_id}>`);

		// Process the data and send back response using the `response_url` property received from Slack in the body.
		const admin = require("../../firebase");
		const userToken = (
			await admin.firestore().collection("usertokens").doc(user_id).get()
		).data();
		if (!userToken)
			return message(
				`<@${user_id}> 😕 Uh oh! You have not authorized us to perform this action on your behalf yet. Please install our app for you in this workspace using the 'Add Apps' section.`
			);

		// Get User's current presence.
		const { data: presenceInfo } = await axios.get(
			"https://slack.com/api/users.getPresence",
			{
				headers: {
					Authorization: `Bearer ${userToken.authed_user.access_token}`,
				},
			}
		);

		const { presence = "active" } = presenceInfo || {};

		await axios.post(
			"https://slack.com/api/users.setPresence",
			{ presence: presence === "active" ? "away" : "auto" },
			{
				headers: {
					Authorization: `Bearer ${userToken.authed_user.access_token}`,
				},
			}
		);
		return sendResponseToSlack("We have updated your presence indicator.");
	} catch (err) {
		console.log(err);
		return sendResponseToSlack(
			"Something went wrong on our end. We'll be fixing this issue soon. Sorry for the inconvenience. 😟"
		);
	}
};

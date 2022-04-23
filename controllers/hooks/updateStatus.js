/* Slash Command to update status for a set amount of time. */
const axios = require("axios");

module.exports = async (req, res) => {
	const message = (text) =>
		res.json({
			text,
			response_type: "ephemeral",
		});
	const { user_id, text = "", response_url } = req.body || {};
	const sendResponseToSlack = (text) =>
		axios.post(response_url, {
			text,
			response_type: "ephemeral",
		});
	try {
		// Respond to slack immediately to avoid a 3s timeout error.
		message(`Updating your status <@${user_id}>`);

		// Process the data and send back response using the `response_url` property received from Slack in the body.
		const admin = require("../../firebase");
		const userToken = (
			await admin.firestore().collection("usertokens").doc(user_id).get()
		).data();
		if (!userToken)
			return message(
				`<@${user_id}> 😕 Uh oh! You have not authorized us to perform this action on your behalf yet. Please install our app for you in this workspace using the 'Add Apps' section.`
			);

		// Format user's slack status.
		const emojiPattern = /:.*:\s/;
		const statusPattern = /[\w\s\d\-]+\s/;
		const timePattern = /\s[\d]+[mh]/; // (number)m/h/s

		const emoji = (text.match(emojiPattern) || ["💬"])[0].trim();
		const statusText = (text.match(statusPattern) || ["Away"])[0].trim();
		const statusTill = (text.match(timePattern) || ["0"])[0].trim();

		let expirationFromNow = statusTill.match(/\d+/);
		const expirationTimeUnit = statusTill.split(/\d/).pop();

		if (expirationFromNow === "0") expirationFromNow = 0;
		if (expirationTimeUnit === "m")
			expirationFromNow = 60 * (parseInt(expirationFromNow) || 0);
		if (expirationTimeUnit === "h")
			expirationFromNow = 3600 * (parseInt(expirationFromNow) || 0);
		if (expirationTimeUnit === "s")
			expirationFromNow = parseInt(expirationFromNow) || 0;

		const statusExpiresAt =
			parseInt(new Date().getTime() / 1000) +
			(parseInt(expirationFromNow) || 0);

		await axios.post(
			`https://slack.com/api/users.profile.set`,
			{
				profile: {
					status_text: statusText,
					status_emoji: emoji,
					status_expiration:
						expirationFromNow === 0
							? 0 // Non expiring status
							: statusExpiresAt,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${userToken.authed_user.access_token}`,
				},
			}
		);
		return sendResponseToSlack(
			"We have updated your status to " +
				emoji +
				" " +
				statusText +
				" for " +
				statusTill
		);
	} catch (err) {
		console.log(err);
		return sendResponseToSlack(
			"Something went wrong on our end. We'll be fixing this issue soon. Sorry for the inconvenience. 😟"
		);
	}
};

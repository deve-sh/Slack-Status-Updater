// Endpoint to serve/publish a view on the app_home_opened event.
const axios = require("axios");
const qs = require("qs");
const getBotToken = require("../../utils/getBotToken");
const appHome = require("../../views/slackBlotKit/appHome");

module.exports = async (req, res) => {
	const message = (text) => res.json({ text, message: text });
	try {
		const { team_id = "", event = {} } = req.body || {};
		const { type, user: user_id } = event;

		if (type === "app_home_opened") {
			const botToken = await getBotToken(team_id);
			if (botToken) {
				const view = JSON.stringify(appHome());
				const args = { user_id, view };
				const response = await axios.post(
					"https://slack.com/api/views.publish",
					qs.stringify(args),
					{
						headers: {
							Authorization: `Bearer ${botToken}`,
							"Content-Type": "application/x-www-form-urlencoded",
						},
					}
				);
				return res.json(response.data);
			}
		}
		return message("Invalid Event");
	} catch (err) {
		console.log(err);
		return message(
			"Some error occurred during the event processing: " + err.message
		);
	}
};

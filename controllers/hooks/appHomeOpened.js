// Endpoint to serve/publish a view on the app_home_opened event.
const axios = require("axios");
const qs = require("qs");

module.exports = async (req, res) => {
	const message = (text) => res.json({ text, message: text });
	try {
		const { team_id = "", event = {} } = req.body || {};
		const { type, user: user_id } = event;

		if (type === "app_home_opened") {
			// Process the data and send back response using the `response_url` property received from Slack in the body.
			const admin = require("../../firebase");
			// Any user's token info matching the team id, to extract the bot token for the workspace/team.
			let userToken = (
				await admin
					.firestore()
					.collection("usertokens")
					.where("team.id", "==", team_id)
					.limit(1)
					.get()
			).docs;
			if (userToken[0] && userToken[0].data()) userToken = userToken[0].data();
			if (
				userToken &&
				userToken.token_type === "bot" &&
				userToken.access_token
			) {
				const botToken = userToken.access_token;
				const view = JSON.stringify({
					type: "home",
					title: {
						type: "plain_text",
						text: "Slack Status Updater",
					},
					blocks: [
						{
							type: "section",
							text: {
								type: "mrkdwn",
								text: "*Welcome!* \nThis is the home for Status Updater app. You can update your slack status here.",
							},
							accessory: {
								type: "button",
								action_id: "open_status_updater_form",
								text: {
									type: "plain_text",
									text: "Update Your Status",
								},
							},
						},
						{ type: "divider" },
					],
				});
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

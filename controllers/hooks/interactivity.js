const axios = require("axios");
const qs = require("qs");
const getBotToken = require("../../utils/getBotToken");
const getUserToken = require("../../utils/getUserToken");
const statusUpdateModalView = require("../../views/slackBlotKit/statusUpdateModalView");

module.exports = async (req, res) => {
	try {
		res.sendStatus(200);
		const payload = JSON.parse(req.body.payload || "{}");
		const { trigger_id, team = {}, type, user, actions = [], view } = payload;
		if (!(team && user && actions && team.id && user.id && actions.length))
			return;

		if (actions[0].action_id === "open_status_updater_form") {
			const [botToken] = await getBotToken(team.id);
			if (!botToken) return;

			const statusUpdateModalViewBlocks = statusUpdateModalView();

			const args = {
				token: botToken,
				trigger_id: trigger_id,
				view: JSON.stringify(statusUpdateModalViewBlocks),
			};

			await axios.post("https://slack.com/api/views.open", qs.stringify(args));
			return;
		}
		if (type === "view_submission") {
			// Handling submission event for the above modal.
			const userToken = await getUserToken(user.id);
			if (!userToken) return;

			// Format user's slack status.
			const text =
				view.state.values.status_text_and_emoji.content.value || "💬 Away";
			const emojiPattern = /:.*:\s/;
			const statusPattern = /[\w\s\d\-]+/;

			const emoji = (text.match(emojiPattern) || ["💬"])[0].trim();
			const statusText = (text.match(statusPattern) || ["Away"])[0].trim();
			const statusExpiresAt = new Date(new Date().getTime() + 86400 * 1000);

			await axios.post(
				`https://slack.com/api/users.profile.set`,
				{
					profile: {
						status_text: statusText,
						status_emoji: emoji,
						status_expiration: statusExpiresAt,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
		}
	} catch (err) {
		console.log(err);
	}
};

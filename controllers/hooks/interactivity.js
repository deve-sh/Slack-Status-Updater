const axios = require("axios");
const qs = require("qs");
const getBotToken = require("../../utils/getBotToken");
const getUserToken = require("../../utils/getUserToken");
const statusUpdateModalView = require("../../views/slackBlotKit/statusUpdateModalView");
const getBaseExpiryISOTime = require("../../utils/getBaseExpiryISOTime");
const getTodayISOString = require("../../utils/getTodayISOString");

module.exports = async (req, res) => {
	try {
		res.send("");
		const payload = JSON.parse(req.body.payload || "{}");
		const {
			trigger_id,
			team = {},
			type,
			user,
			actions = [],
			view = {},
		} = payload;
		if (!(team && user && team.id && user.id)) return;

		if (
			actions &&
			actions.length &&
			actions[0].action_id === "open_status_updater_form"
		) {
			const botToken = await getBotToken(team.id);
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
				view.state.values.status_text_and_emoji.status_text_and_emoji.value ||
				"💬 Away";
			const expiryTimeEntered =
				view.state.values.status_expiry_time.status_expiry_time.selected_time ||
				getBaseExpiryISOTime();
			const expiryDateEntered =
				view.state.values.status_expiry_date.status_expiry_date.selected_date ||
				getTodayISOString();
			const statusPattern = /[\w\s\d\-]+/;

			const statusText = (text.match(statusPattern) || ["Away"])[0].trim();
			const emoji = text.split(statusPattern)[0].trim() || "💬";
			const statusExpiresAt = new Date(
				`${expiryDateEntered}T${expiryTimeEntered}:00`
			);

			await axios.post(
				`https://slack.com/api/users.profile.set`,
				{
					profile: {
						status_text: statusText,
						status_emoji: emoji,
						status_expiration: parseInt(statusExpiresAt / 1000),
					},
				},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			return;
		}
	} catch (err) {
		console.log(err);
	}
};

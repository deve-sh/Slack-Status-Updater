const axios = require("axios");
const qs = require("qs");
const getBotToken = require("../../utils/getBotToken");
const statusUpdateModalView = require("../../views/slackBlotKit/statusUpdateModalView");

module.exports = async (req, res) => {
	try {
		res.sendStatus(200);
		const payload = JSON.parse(req.body.payload || "{}");
		const { trigger_id, team = {}, user, actions = [] } = payload;
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
		}
	} catch (err) {
		console.log(err);
	}
};

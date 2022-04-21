const { SERVER_ERROR } = require("../../constants");

const startSlackOAuth = async (req, res) => {
	const message = (status, message) => res.status(status).json({ message });
	const clientId = process.env.SLACK_CLIENT_ID;
	const stateSecret = process.env.SLACK_STATE_SECRET;

	if (!clientId || !stateSecret) return message(500, SERVER_ERROR);

	const installer = require("../../utils/slackInstallProvider");

	const callbackOptions = {
		success: (installation, installOptions, _, res) => {
			console.log(installOptions, installation);
			return res.sendStatus(200);
		},
		failure: (error, _, __, res) => {
			console.log("Slack App Installation Error: ", error);
			return res.redirect("/");
		},
	};

	return installer.handleCallback(req, res, callbackOptions);
};

module.exports = startSlackOAuth;

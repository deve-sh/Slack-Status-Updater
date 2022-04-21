const { InstallProvider } = require("@slack/oauth");
const { SERVER_ERROR } = require("../../constants");

const startSlackOAuth = async (req, res) => {
	const message = (status, message) => res.status(status).json({ message });
	const slackStartURL = process.env.SLACK_OAUTH_START_LINK;
	const clientId = process.env.SLACK_CLIENT_ID;
	const clientSecret = process.env.SLACK_CLIENT_SECRET;
	const stateSecret = process.env.SLACK_STATE_SECRET;

	if (!slackStartURL || !clientId || !stateSecret)
		return message(500, SERVER_ERROR);

	const installer = new InstallProvider({
		clientId,
		clientSecret,
		stateSecret,
	});

	return installer.handleCallback(req, res);
};

module.exports = startSlackOAuth;

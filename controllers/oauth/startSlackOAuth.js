const { InstallProvider } = require("@slack/oauth");
const { SERVER_ERROR } = require("../../constants");

const startSlackOAuth = async (_, res) => {
	const message = (status, message) => res.status(status).json({ message });
	const slackStartURL = process.env.SLACK_OAUTH_START_LINK;
	const clientId = process.env.SLACK_CLIENT_ID;
	const clientSecret = process.env.SLACK_CLIENT_SECRET;
	const stateSecret = process.env.SLACK_STATE_SECRET;
	const redirectUri = process.env.SLACK_REDIRECT_URL;

	if (!slackStartURL || !clientId || !stateSecret || !redirectUri)
		return message(500, SERVER_ERROR);

	const installer = new InstallProvider({
		clientId,
		clientSecret,
		stateSecret,
	});

	const installURL = await installer.generateInstallUrl({
		scopes: ["commands"],
		userScopes: ["users.profile:read", "users.profile:write", "identify"],
		redirectUri,
	});

	res.redirect(installURL);
};

module.exports = startSlackOAuth;

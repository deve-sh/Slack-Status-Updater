const { SERVER_ERROR } = require("../../constants");

const startSlackOAuth = async (_, res) => {
	const message = (status, message) => res.status(status).json({ message });
	const clientId = process.env.SLACK_CLIENT_ID;
	const redirectUri = process.env.SLACK_REDIRECT_URL;

	if (!clientId || !redirectUri) return message(500, SERVER_ERROR);

	const urlParams = new URLSearchParams();
	urlParams.append("client_id", clientId);
	urlParams.append("scope", "commands");
	urlParams.append(
		"user_scope",
		"users.profile:read,users.profile:write,identify"
	);
	urlParams.append("redirect_uri", redirectUri);

	const installURL =
		process.env.SLACK_OAUTH_START_LINK + "?" + urlParams.toString();

	console.log({ installURL });

	res.redirect(installURL);
};

module.exports = startSlackOAuth;

const { InstallProvider } = require("@slack/oauth");

const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;

const installer = new InstallProvider({
	clientId,
	clientSecret,
});

module.exports = installer;

const { Router } = require("express");

const startSlackOAuth = require("../controllers/oauth/startSlackOAuth");
const slackOAuthRedirect = require("../controllers/oauth/slackOAuthRedirect");

const OAuthRouter = Router();

OAuthRouter.get("/startslackauth", startSlackOAuth);
OAuthRouter.get("/slackoauthredirect", slackOAuthRedirect);

module.exports = OAuthRouter;

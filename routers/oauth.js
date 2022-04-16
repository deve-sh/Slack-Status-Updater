const { Router } = require("express");

const startSlackOAuth = require("../controllers/oauth/startSlackOAuth");

const OAuthRouter = Router();

OAuthRouter.get("/startslackauth", startSlackOAuth);
OAuthRouter.get("/slackoauthredirect", (_, res) => res.sendStatus(200));

module.exports = OAuthRouter;

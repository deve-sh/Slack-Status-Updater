import { Router } from "express";

import startSlackOAuth from "../controllers/oauth/startSlackOAuth.js";

const OAuthRouter = Router();

OAuthRouter.get("/startslackauth", startSlackOAuth);
OAuthRouter.get("/slackoauthredirect", (_, res) => res.sendStatus(200));

module.exports = OAuthRouter;

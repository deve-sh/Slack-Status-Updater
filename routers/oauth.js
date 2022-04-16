import { Router } from "express";

const OAuthRouter = Router();

OAuthRouter.get("/slackoauthredirect", (req, res) => res.sendStatus(200));

export default OAuthRouter;

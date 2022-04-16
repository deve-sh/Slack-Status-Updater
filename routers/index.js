const { Router } = require("express");

const OAuthRouter = require("./oauth");

const APIRouter = Router();

APIRouter.use("/oauth", OAuthRouter);

module.exports = APIRouter;

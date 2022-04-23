const { Router } = require("express");

const OAuthRouter = require("./oauth");
const HooksRouter = require("./hooks");

const APIRouter = Router();

APIRouter.use("/oauth", OAuthRouter);
APIRouter.use("/hooks", HooksRouter);

module.exports = APIRouter;

import { Router } from "express";

import OAuthRouter from "./oauth";

const APIRouter = Router();

APIRouter.use("/oauth", OAuthRouter);

export default APIRouter;

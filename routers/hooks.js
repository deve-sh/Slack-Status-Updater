const { Router } = require("express");

const updateStatus = require("../controllers/hooks/updateStatus");

const HooksRouter = Router();

HooksRouter.post("/updateStatus", updateStatus);

module.exports = HooksRouter;

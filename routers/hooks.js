const { Router } = require("express");

const updateStatus = require("../controllers/hooks/updateStatus");
const togglePresence = require("../controllers/hooks/togglePresence");
const appHomeOpened = require("../controllers/hooks/appHomeOpened");

const HooksRouter = Router();

HooksRouter.post("/updatestatus", updateStatus);
HooksRouter.post("/togglepresence", togglePresence);
HooksRouter.post("/apphomeopened", appHomeOpened);

module.exports = HooksRouter;

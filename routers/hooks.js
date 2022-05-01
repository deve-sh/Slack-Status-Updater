const { Router } = require("express");

const updateStatus = require("../controllers/hooks/updateStatus");
const togglePresence = require("../controllers/hooks/togglePresence");
const appHomeOpened = require("../controllers/hooks/appHomeOpened");
const interactivity = require("../controllers/hooks/interactivity");

const HooksRouter = Router();

HooksRouter.post("/updatestatus", updateStatus);
HooksRouter.post("/togglepresence", togglePresence);
HooksRouter.post("/apphomeopened", appHomeOpened);
HooksRouter.post("/interactivity", interactivity);

module.exports = HooksRouter;

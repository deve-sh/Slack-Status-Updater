const { Router } = require("express");

const updateStatus = require("../controllers/hooks/updateStatus");
const togglePresence = require("../controllers/hooks/togglePresence");

const HooksRouter = Router();

HooksRouter.post("/updatestatus", updateStatus);
HooksRouter.post("/togglepresence", togglePresence);

module.exports = HooksRouter;

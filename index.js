const express = require("express");
const { config } = require("dotenv");

const APIRouter = require("./routers/index");

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api", APIRouter);

app.listen(PORT, () => console.log("Listening at port: ", PORT));

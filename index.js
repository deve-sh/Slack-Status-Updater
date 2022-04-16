const express = require("express");
const { config } = require("dotenv");

const APIRouter = require("./routers/index");

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use((req, next) => {
	console.log("Request at: ", req.url);
	next();
});
app.use("/api", APIRouter);

app.listen(PORT, () => console.log("Listening at port: ", PORT));

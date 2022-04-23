const express = require("express");
const { config } = require("dotenv");
config();

const APIRouter = require("./routers/index");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, _, next) => {
	console.log("Request at: ", req.url);
	next();
});
app.use("/api", APIRouter);

app.listen(PORT, () => console.log("Listening at port: ", PORT));

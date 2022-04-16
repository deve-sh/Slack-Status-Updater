import express from "express";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api", APIRouter);

app.listen(PORT, () => console.log("Listening at port: ", PORT));

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import userRoute from "./controllers/userController";
import publicRoute from "./controllers/publicController";

const app = express();
const port = 3000;

app.use(bodyParser.json());

connect("mongodb://127.0.0.1:27017/demo").catch((err) => console.log(err));

app.use("/", publicRoute);
app.use("/user", userRoute);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

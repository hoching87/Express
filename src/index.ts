import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import userRoute from "./controllers/userController";
import publicRoute from "./controllers/publicController";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

connect("mongodb://127.0.0.1:27017/demo").catch((err) => console.log(err));

app.use("/", publicRoute);
app.use("/user", userRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(400).send({ error: err });
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

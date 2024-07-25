import { Request, Response, NextFunction, Router } from "express";
const router = Router();

// const timeLog = (req, res, next: NextFunction) => {
// 	console.log("Time: ", Date.now());
// 	next();
// };
// router.use(timeLog);

router.get("/events", (req: Request, res: Response) => {
	res.json({ hello: "world" });
});

export default router;

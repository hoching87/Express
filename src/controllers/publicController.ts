import { Request, Response, Router } from "express";
import { createUser, login } from "../services/userService";
import { listEvent, getEvent } from "../services/eventService";
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
	const user = await createUser(req.body);

	if (!user.errors) {
		res.json({ msg: "User Created!" });
	} else {
		res.status(400).json({ errors: user.errors });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const JWTtoken = await login(req.body);

	if (!JWTtoken.errors) {
		res.json(JWTtoken);
	} else {
		res.status(400).json({
			errors: JWTtoken.errors,
		});
	}
});

router.get("/events", async (req: Request, res: Response) => {
	const events = await listEvent(req.body.status);
	res.json({ res: events });
});

router.get("/event/:id", async (req: Request, res: Response) => {
	const eventID = req.params.id;

	const events = await getEvent(eventID);
	res.json({ res: events });
});

export default router;

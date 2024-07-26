import { Request, Response, NextFunction, Router } from "express";
import { jwtVerify } from "../services/userService";
import {
	createEvent,
	updateEvent,
	listEvent,
	deleteEvent,
} from "../services/EventService";

const router = Router();

export interface UserRequest extends Request {
	user?: {
		id: string;
		name: string;
	};
}

// Authentication
router.use(async (req: UserRequest, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization) {
			throw new Error("unauthorized");
		}
		const decoded = await jwtVerify(
			req.headers.authorization.split(" ")[1]
		);

		req.user = {
			id: decoded.id,
			name: decoded.name,
		};

		next();
	} catch (err) {
		res.status(403).json({ status_code: 403, msg: "unauthorized" });
	}
});

router.get("/events", async (req: UserRequest, res: Response) => {
	const events = await listEvent(req.body.status, req.user?.id || "");
	res.json({ res: events });
});

router.post("/event/create", async (req: UserRequest, res: Response) => {
	const event = await createEvent({
		...req.body,
		uid: req.user?.id,
	});

	res.json({ res: event });
});

router.post("/event/update/:id", async (req: UserRequest, res: Response) => {
	const eventID = req.params.id;

	const event = await updateEvent(req.user?.id || "", eventID, req.body);

	res.json({ res: event });
});

router.post("/event/delete/:id", async (req: UserRequest, res: Response) => {
	const eventID = req.params.id;

	const event = await deleteEvent(req.user?.id || "", eventID);

	res.json({ res: event });
});

export default router;

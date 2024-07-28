import { Request, Response, NextFunction, Router } from "express";
import { jwtVerify } from "../services/userService";
import {
	createEvent,
	updateEvent,
	listEvent,
	deleteEvent,
} from "../services/eventService";
import { IEvent } from "../models/eventModel";

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
	const events = await listEvent(
		req.query.status as IEvent["status"],
		req.user?.id || ""
	);
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

	const event = await deleteEvent(
		req.user?.id || "",
		req.body.password,
		eventID
	);

	if (event.errros?.msg) {
		res.status(400).json(event.errros);
	} else {
		res.json({ res: event });
	}
});

export default router;

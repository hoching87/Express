import { Request, Response, Router } from "express";
import { createUser } from "../services/userService";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
	const user = await createUser(req.body);

	if (user.errors) {
		return res.status(400).json({
			errors: user.errors,
		});
	}

	res.json({ res: user });
});

router.get("/login", async (req: Request, res: Response) => {
	res.send("About birds");
});

export default router;

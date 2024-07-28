import Event, { IEvent } from "../models/eventModel";
import User from "../models/userModel";
import { hashPassword } from "./userService";

type TfieldErrors<T> = {
	[P in keyof T]?: string;
};

type Tupdate<T> = {
	[P in keyof T]?: T[P];
};

export const getEvent = async (eventID: string) => {
	const event = Event.findById(eventID).lean();

	return event;
};

export const createEvent = async (details: IEvent) => {
	const event = new Event(details);
	await event.save();

	return event;
};

export const updateEvent = async (
	userID: string,
	eventID: string,
	update: Tupdate<IEvent>
) => {
	const event = await Event.findById(eventID);

	if (!event) {
		return {
			errros: {
				status: 404,
				msg: "Event Not Found!",
			},
		};
	}
	if (event.uid.toString() !== userID) {
		return {
			errros: {
				status: 401,
				msg: "Unauthorized!",
			},
		};
	}

	await event.updateOne(update);

	// const event = await Event.findByIdAndUpdate(eventID, { $set: update });

	return event;
};

export const deleteEvent = async (
	userID: string,
	password: string,
	eventID: string
) => {
	const event = await Event.findById(eventID);

	if (!event) {
		return {
			errros: {
				status: 404,
				msg: "Event Not Found!",
			},
		};
	}
	if (event.uid.toString() !== userID) {
		return {
			errros: {
				status: 401,
				msg: "Unauthorized!",
			},
		};
	}

	const user = await User.findById(userID);
	const hash = await hashPassword(password);

	if (user?.password !== hash) {
		return {
			errros: {
				status: 400,
				msg: "Wrong Password!",
			},
		};
	}

	await event.deleteOne();

	return {};
};

export const listEvent = async (status?: IEvent["status"], userID?: string) => {
	const query: {
		uid?: string;
		status?: IEvent["status"];
	} = {};

	if (status) {
		query["status"] = status;
	}
	if (userID) {
		query["uid"] = userID;
	}

	const events = await Event.find(query).limit(10);

	return events;
};

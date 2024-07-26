import Event, { IEvent } from "../models/eventModel";

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
		console.log(userID, event.id);
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

export const deleteEvent = async (userID: string, eventID: string) => {
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

	await event.deleteOne();

	return event;
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

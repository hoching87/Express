import { Schema, model } from "mongoose";

export interface IEvent {
	uid: Schema.Types.ObjectId;
	name: string;
	startDate: Date;
	endDate: Date;
	location: string;
	status: "Ongoing" | "Completed";
	poster?: string;
}

const EventSchema = new Schema<IEvent>({
	uid: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	location: { type: String, required: true },
	status: {
		type: String,
		enum: ["Ongoing", "Completed"],
		required: true,
		default: "Ongoing",
	},
	poster: { type: String },
});

export default model<IEvent>("Event", EventSchema);

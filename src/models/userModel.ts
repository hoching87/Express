import { Schema, model } from "mongoose";

export interface IUser {
	name: string;
	password: string;
}

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
});

export default model<IUser>("User", userSchema);

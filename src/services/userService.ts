import User, { IUser } from "../models/userModels";

type TfieldErrors<T> = {
	[P in keyof T]?: string;
};

interface IUserParam extends IUser {
	passwordConfirm: string;
}

export const createUser = async (details: IUserParam) => {
	let crypto;
	try {
		crypto = await import("node:crypto");
	} catch (err) {
		throw new Error("Crypto is not supported");
	}

	const fieldErrors: TfieldErrors<IUserParam> = {};

	if (details.password !== details.passwordConfirm) {
		fieldErrors["password"] = "Password does not match!";
	}

	const userExist = await User.findOne({ name: details.name }).lean();

	if (userExist) {
		fieldErrors["name"] = "Name already taken!";
	}

	if (Object.keys(fieldErrors).length) {
		return {
			errors: fieldErrors,
		};
	}

	const secret = "abcdefg";
	const PasswordHash = crypto
		.createHmac("sha256", secret)
		.update(details.password)
		.digest("hex");

	const user = new User({
		name: details.name,
		password: PasswordHash,
	});

	await user.save();

	return user;
};

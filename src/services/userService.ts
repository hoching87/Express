import User, { IUser } from "../models/userModel";
import { sign, verify, JwtPayload } from "jsonwebtoken";

type TfieldErrors<T> = {
	[P in keyof T]?: string;
};

interface IUserParam extends IUser {
	passwordConfirm: string;
}

interface myJWT extends JwtPayload {
	id: string;
	name: string;
	iat: number;
}

export const hashPassword = async (password: string) => {
	let crypto;
	try {
		crypto = await import("node:crypto");
	} catch (err) {
		throw new Error("Crypto is not supported");
	}

	const secret = process.env.SECRET_KEY || "";
	return crypto.createHmac("sha256", secret).update(password).digest("hex");
};

const checkPassword = async (details: IUser) => {
	const user = await User.findOne({ name: details.name }).lean();
	if (!user) {
		return;
	}

	const PasswordHash = await hashPassword(details.password);
	if (PasswordHash !== user.password) {
		return;
	}

	return user;
};

export const createUser = async (details: IUserParam) => {
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
			errors: {
				fields: fieldErrors,
			},
		};
	}

	const PasswordHash = await hashPassword(details.password);

	const user = new User({
		name: details.name,
		password: PasswordHash,
	});

	await user.save();

	return user;
};

export const login = async (details: IUser) => {
	// Login
	const user = await checkPassword(details);

	if (!user) {
		return {
			errors: {
				msg: "Invalid name or password",
			},
		};
	}

	// JWT
	const secret = process.env.SECRET_KEY || "";
	const userInfo = {
		id: user._id,
		name: user.name,
	};
	var token = sign(userInfo, secret);

	return {
		userDetails: userInfo,
		token,
	};
};

export const jwtVerify = async (token: string) => {
	const secret = process.env.SECRET_KEY || "";
	return verify(token, secret) as myJWT;
};

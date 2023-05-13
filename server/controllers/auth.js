import {db} from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {toISOStringWithOffset} from "../helpers.js";

export const signup = (req, res) => {
	const query = "SELECT * FROM sn_users WHERE email = ? OR username = ?";
	db.query(query, [req.body.email, req.body.username], (err, data) => {
		if (err) return res.json(err);
		if (data.length) return res.status(409).json("User already exists.");

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.inputs.password, salt, (err, hash) => {
				const insertQuery = "INSERT INTO sn_users(`first_name`, `last_name`, `username`, `email`, `password`, `image`, `registration_date`) VALUES (?)";
				const insertValues = [
					req.body.inputs.first_name,
					req.body.inputs.last_name,
					req.body.inputs.username,
					req.body.inputs.email,
					hash,
					req.body.imgUrl.filename,
					toISOStringWithOffset(new Date()),
				];
				db.query(insertQuery, [insertValues], (err) => {
					if (err) return res.json(err);
					return res.status(200).json("User has been created!");
				});
			});
		});
	});
};

export const login = (req, res) => {
	const query = "SELECT * FROM sn_users WHERE username = ?";
	db.query(query, [req.body.username], (err, data) => {
		if (err) return res.json(err);
		if (data.length === 0) return res.status(404).json("User not found.");

		bcrypt.compare(req.body.password, data[0].password, (err, result) => {
			if (err) return res.status(400).json(err);
			if (!result) return res.status(400).json("Wrong username or password.");
			const token = jwt.sign({id: data[0].id, username: data[0].username}, "jwtkey");
			const {password, ...other} = data[0];
			res.cookie("access_token", token, {
				httpOnly: true
			}).status(200).json(other);
		});
	});
};

export const logout = (req, res) => {
	res.clearCookie("access_token", {
		sameSite: "none",
		secure: true
	}).status(200).json("User has been logged out.");
};
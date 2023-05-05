import {db} from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
	const query = "SELECT * FROM sn_users WHERE email = ? OR username = ?";
	db.query(query, [req.body.email, req.body.username], (err, data) => {
		if (err) return res.json(err);
		if (data.length) return res.status(409).json("User already exists.");

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				const insertQuery = "INSERT INTO sn_users(`username`, `email`, `password`) VALUES (?)";
				const insertValues = [
					req.body.username,
					req.body.email,
					hash
				];
				db.query(insertQuery, [insertValues], (err, data) => {
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
			const token = jwt.sign({id: data[0].id}, "jwtkey");
			const {password, ...other} = data[0];
			res.cookie("access_token", token, {
				httpOnly: true
			}).status(200).json(other);
		});
	});
};

export const logout = (req, res) => {
};
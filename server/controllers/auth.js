import {db} from "../db.js";
import bcrypt from "bcrypt";

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
};

export const logout = (req, res) => {
};
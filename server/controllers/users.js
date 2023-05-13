import {db} from "../db.js";

export const getUser = (req, res) => {
	const username = req.params.username;
	const query = "SELECT * FROM sn_users WHERE username = ?";
	db.query(query, username, (err, data) => {
		if (err) return res.send(err);
		return res.status(200).json(data);
	});
}

export const getUserNotes = (req, res) => {
	const username = req.params.username;
	const currentUser = req.params.isCurrentUser;
	let query;
	if (currentUser === 'true') query = "SELECT * FROM notes n WHERE n.sn_user = ? ORDER BY id DESC";
	else query = "SELECT * FROM notes n WHERE n.sn_user = ? AND n.is_public = 1 ORDER BY id DESC";
	db.query(query, [username], (err, data) => {
		if (err) return res.send(err);
		return res.status(200).json(data);
	});
}

export const updateUserProfile = (req, res) => {
	const query = "UPDATE sn_users SET first_name=(?), last_name=(?), is_anonymous=(?), image=(?) WHERE sn_users.username=(?)";
	const values = [
		req.body.inputs.first_name === "" ? null : req.body.inputs.first_name,
		req.body.inputs.last_name === "" ? null : req.body.inputs.last_name,
		req.body.inputs.is_anonymous,
		req.body.image,
		req.body.username
	];
	db.query(query, values, (err) => {
		if (err) return res.json(err);
		return res.status(200).json("Updated!");
	});
}

export const updateIsAnonymous = (req, res) => {
	db.query(`UPDATE sn_users SET is_anonymous=${req.body.is_anonymous} WHERE sn_users.username="${req.body.username}"`, (err) => {
		if (err) return res.json(err);
		return res.status(200).json(`You are ${req.body.is_anonymous ? "anonymous" : "not anonymous"}!`);
	});
}

export const removeProfilePicture = (req, res) => {
	db.query(`UPDATE sn_users SET image=${null} WHERE sn_users.username="${req.params.username}"`, (err) => {
		if (err) return res.json(err);
		return res.status(200).json("Profile picture removed!");
	});
}

export const getAllUsernames = (req, res) => {
	const query = "SELECT username FROM sn_users;";
	db.query(query, (err, data) => {
		if (err) return res.send(err);
		return res.status(200).json(data);
	});
}
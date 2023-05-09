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
	if (currentUser === 'true') {
		db.query("SELECT * FROM notes n WHERE n.sn_user = ?", [username], (err, data) => {
			if (err) return res.send(err);
			return res.status(200).json(data);
		});
	} else {
		db.query("SELECT * FROM notes n WHERE n.sn_user = ? AND n.is_public = 1", [username], (err, data) => {
			if (err) return res.send(err);
			return res.status(200).json(data);
		});
	}
}
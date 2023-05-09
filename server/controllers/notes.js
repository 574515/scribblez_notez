import {db} from "../db.js";
import jwt from "jsonwebtoken";
import {toISOStringWithOffset} from "../helpers.js";

export const getNotes = (req, res) => {
	if (req.query.currentUserUsername) {
		const query = "SELECT * FROM notes WHERE sn_user = ? ORDER BY id DESC";
		db.query(query, [req.query.currentUserUsername], (err, data) => {
			if (err) return req.send(err);
			return res.status(200).json(data);
		});
	}
}

export const getNote = (req, res) => {
	res.json("From controller!");
}

export const addNote = (req, res) => {
	const insertQuery = "INSERT INTO notes(title, body, create_date, sn_user) VALUES (?)";
	const insertValues = [
		req.body.inputs.title,
		req.body.inputs.body,
		toISOStringWithOffset(new Date()),
		req.body.currentUserUsername
	];
	db.query(insertQuery, [insertValues], (err, data) => {
		if (err) return res.json(err);
		return res.status(200).json("Note has been created!");
	});
}

export const deleteNote = (req, res) => {
	const token = req.cookies["access_token"];
	if (!token) return res.status(401).json("Not authenticated!");
	jwt.verify(token, "jwtkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");
		const noteId = req.params.id;
		const query = "DELETE FROM notes WHERE id = ? AND sn_user = ?";
		db.query(query, [noteId, userInfo.username], (err, data) => {
			if (err) return res.status(403).json("You can delete only your notes!");
			return res.status(200).json("Note has been deleted.");
		});
	});
}

export const updateNote = (req, res) => {
	const query = "UPDATE notes SET title=(?), body=(?), update_date=(?) WHERE notes.id=(?)"
	const values = [
		req.body.inputs.title,
		req.body.inputs.body,
		toISOStringWithOffset(new Date()),
		req.body.id
	];
	db.query(query, values, (err, data) => {
		if (err) return res.json(err);
		return res.status(200).json("Updated!");
	});
}

export const updateVisibility = (req, res) => {
	db.query(`UPDATE notes SET is_public = ${req.body.is_public} WHERE id = ${req.body.id}`, (err, data) => {
		if (err) return res.json(err);
		return res.status(200).json(`Note has been made ${req.body.is_public ? "public" : "private"}!`);
	});
}

export const getPublicNotes = (req, res) => {
	const query = "SELECT * FROM notes WHERE is_public = 1 ORDER BY id DESC";
	db.query(query, (err, data) => {
		if (err) return req.send(err);
		return res.status(200).json(data);
	});
}
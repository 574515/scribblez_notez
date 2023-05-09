import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Note from "../components/Note";
import UserInfo from "../components/UserInfo";
import {AuthContext} from "../context/authContext";

const Profile = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [user, setUser] = useState([]);
	const [notes, setNotes] = useState([]);
	const {currentUser} = useContext(AuthContext);

	const fetchNotes = useCallback(async () => {
		try {
			const isCurrentUser = params.username === currentUser?.username;
			const notesRes = await axios.get(`/api/users/${params.username}/notes/${isCurrentUser}`, {params});
			setNotes(notesRes.data);
		} catch (err) {
			console.log(err);
		}
	}, [currentUser?.username, params]);

	const fetchData = useCallback(async () => {
		try {
			const userRes = await axios.get(`/api/users/${params.username}`);
			setUser(userRes.data[0]);
			fetchNotes().then();
		} catch (err) {
			console.log(err);
		}
	}, [fetchNotes, params.username]);

	useEffect(() => {
		fetchData().then();
	}, [currentUser, fetchData, fetchNotes, navigate, params]);

	return (
			<div className="notes row row-cols-4 mt-3 g-2">
				<div className="col-3">
					<UserInfo userData={user}/>
				</div>
				<div className="col-9 row g-2">
					{notes.map((note) => <div className="col-4 singleNote" key={note.id}>
						<Note key={note.id} noteData={note} fetchData={fetchData}/>
					</div>)}
				</div>
			</div>
	);

};

export default Profile;
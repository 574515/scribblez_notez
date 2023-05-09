import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Note from "../components/Note";
import {AuthContext} from "../context/authContext";
import AddNote from "../components/AddNote";

const Home = () => {
	const navigate = useNavigate();

	const [notes, setNotes] = useState([]);
	const {currentUser} = useContext(AuthContext);
	let params = useMemo(() => {
		return {currentUserUsername: null}
	}, []);

	const fetchData = useCallback(async () => {
		try {
			const res = await axios.get("/api/notes", {params});
			setNotes(res.data);
		} catch (err) {
			console.log(err);
		}
	}, [params]);

	useEffect(() => {
		if (currentUser === null) {
			navigate("/login");
		} else {
			params.currentUserUsername = currentUser.username;
		}
		fetchData().then();
	}, [fetchData, currentUser, navigate, params]);

	return (
			<div className="home">
				<AddNote fetchData={fetchData}/>
				<div className="notes row row-cols-4 g-2">
					{notes.map((note) => <div className="col singleNote" key={note.id}>
						<Note key={note.id} noteData={note} fetchData={fetchData}/>
					</div>)}
				</div>
			</div>
	);
};

export default Home;
import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import Note from "../components/Note";

const Explore = () => {
	const navigate = useNavigate();

	const [notes, setNotes] = useState([]);
	const {currentUser} = useContext(AuthContext);


	const fetchData = useCallback(async () => {
		try {
			const res = await axios.get("/api/notes/public");
			setNotes(res.data);
		} catch (err) {
			console.log(err);
		}
	}, [notes]);


	useEffect(() => {
		fetchData().then();
	}, [fetchData, currentUser, navigate]);

	return (
			<div className="home">
				<div className="notes row row-cols-4 g-2 mt-3">
					{notes.map((note) => <div className="col singleNote" key={note.id}><Note isPublic={true} key={note.id} noteData={note} fetchData={fetchData}/></div>)}
				</div>
			</div>
	);
};

export default Explore;
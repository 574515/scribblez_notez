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
		return {currentUserId: null}
	}, []);

	const fetchData = useCallback(async () => {
		try {
			const res = await axios.get("http://localhost:8800/api/notes", {params});
			setNotes(res.data);
		} catch (err) {
			console.log(err);
		}
	}, [params]);

	useEffect(() => {
		if (currentUser === null) {
			navigate("/login");
		} else {
			params.currentUserId = currentUser.id;
		}
		fetchData().then();
	}, [fetchData, currentUser, navigate, params]);

	return (
			<div className="home">
				<AddNote fetchData={fetchData}/>
				<div className="notes row g-5">
					{notes.map((note) => <Note noteData={note} fetchData={fetchData} key={note.id}/>)}
				</div>
			</div>
	);
};

export default Home;
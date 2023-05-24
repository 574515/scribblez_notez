import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Note from "../components/Note";
import {AuthContext} from "../context/authContext";
import AddNote from "../components/AddNote";
import UpIcon from '../assets/img/up.svg';
import {goToTop} from "../globals";

const Home = () => {

	const {currentUser} = useContext(AuthContext);
	const navigate = useNavigate();
	const endpoints = useMemo(() => {
		return "/api/notes";
	}, []);
	const [notes, setNotes] = useState([]);
	let params = useMemo(() => {
		return {currentUserUsername: null}
	}, []);
	const [showTopBtn, setShowTopBtn] = useState(false);

	const getData = useCallback(() => {
		axios.get(endpoints, {params}).then((notes) => setNotes(notes.data));
	}, [endpoints, params]);

	useEffect(() => {
		currentUser === null ? navigate("/login") : params.currentUserUsername = currentUser.username;
		getData();
		window.addEventListener('scroll', () => setShowTopBtn(window.scrollY > 150));
	}, [currentUser, getData, navigate, params]);

	return (
			<div className="home">
				<AddNote getData={getData}/>
				<div className="notes row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-2">
					{notes.map((note) => <div className="col singleNote" key={note.id}>
						<Note key={note.id} noteData={note} getData={getData}/>
					</div>)}
				</div>
				{showTopBtn && <div className="top-to-btm">
					<span className="icon-position" onClick={goToTop}>
						<div className="img-desc-go text-center">GO</div>
						<img src={UpIcon} alt=""/>
						<div className="img-desc text-center">UP</div>
					</span>
				</div>}
			</div>
	);
};

export default Home;
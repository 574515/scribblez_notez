import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import Note from "../components/Note";
import UpIcon from "../assets/img/up.svg";
import {goToTop} from "../globals";

const Explore = () => {

	const {currentUser} = useContext(AuthContext);
	const navigate = useNavigate();
	const [notes, setNotes] = useState([]);
	const [showTopBtn, setShowTopBtn] = useState(false);
	const endpoints = useMemo(() => {
		return "/api/notes/public";
	}, []);

	const getData = useCallback(() => {
		axios
				.get(endpoints)
				.then((notes) => setNotes(notes.data));
	}, [endpoints]);

	useEffect(() => {
		getData();
		window.addEventListener('scroll', () => setShowTopBtn(window.scrollY > 150));
	}, [currentUser, getData, navigate]);

	return (
			<div className="home">
				<div className="notes row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-2 mt-3">
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

export default Explore;
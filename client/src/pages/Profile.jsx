import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Note from "../components/Note";
import UserInfo from "../components/UserInfo";
import {AuthContext} from "../context/authContext";
import UpIcon from "../assets/img/up.svg";
import {goToTop} from "../globals";

const Profile = () => {

	const {currentUser} = useContext(AuthContext);
	const navigate = useNavigate();
	const params = useParams();
	const isCurrentUser = params.username === currentUser?.username;
	const endpoints = useMemo(() => {
		return [
			`/api/users/${params.username}`,
			`api/users/${params.username}/notes/${isCurrentUser}`,
			`api/notes/count/${params.username}/${isCurrentUser}`
		];
	}, [isCurrentUser, params.username]);
	const [notes, setNotes] = useState([]);
	const [notesCount, setNotesCount] = useState(0);
	const [showTopBtn, setShowTopBtn] = useState(false);
	const [user, setUser] = useState([]);

	const getData = useCallback(() => {
		Promise.all(
				endpoints.map((endpoint) =>
						axios
								.get(endpoint)))
				.then(([user, notes, count]) => {
					setUser(user.data[0]);
					setNotes(notes.data);
					setNotesCount(count.data);
				});
	}, [endpoints]);

	useEffect(() => {
		getData();
		window.addEventListener('scroll', () => setShowTopBtn(window.scrollY > 150));
	}, [currentUser, getData, navigate, params]);

	return (
			<div className="notes row row-cols-4 mt-3 g-2">
				<div className={(user.is_anonymous && user?.id !== currentUser?.id) ? "col-6 mx-auto" : "col-3"}>
					{user.length !== 0 && <UserInfo notesCount={notesCount} notes={notes} params={params} key={user.id} userData={user} getData={getData}/>}
				</div>
				<div className={(user.is_anonymous && user?.id !== currentUser?.id) ? "d-none" : "col-9 row g-2"}>
					{(user.is_anonymous && user?.id !== currentUser?.id) ? "" : notes.map((note) => <div className="col-4 singleNote" key={note.id}>
						<Note key={note.id} noteData={note} fetchData={getData}/>
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

export default Profile;
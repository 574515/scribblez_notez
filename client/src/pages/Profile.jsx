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
			`api/users/${params.username}`,
			`api/users/${params.username}/notes/${isCurrentUser}`,
			`api/notes/count/${params.username}/${isCurrentUser}`,
			`api/notes/count/public/${params.username}`
		];
	}, [isCurrentUser, params.username]);
	const [notes, setNotes] = useState([]);
	const [notesCount, setNotesCount] = useState(0);
	const [publicNotesCount, setPublicNotesCount] = useState(0);
	const [showTopBtn, setShowTopBtn] = useState(false);
	const [user, setUser] = useState([]);

	const getData = useCallback(() => {
		Promise.all(
				endpoints.map((endpoint) =>
						axios
								.get(endpoint)))
				.then(([user, notes, count, publicCount]) => {
					setUser(user.data[0]);
					setNotes(notes.data);
					setNotesCount(count.data);
					setPublicNotesCount(publicCount.data);
				});
	}, [endpoints]);

	useEffect(() => {
		getData();
		window.addEventListener('scroll', () => setShowTopBtn(window.scrollY > 150));
	}, [currentUser, getData, navigate, params, publicNotesCount]);

	return (
			<div className="notes row mt-3 g-2">
				<div className={(user.is_anonymous && user?.id !== currentUser?.id) ? "col-8 mx-auto" : publicNotesCount > 0 ? "d-none d-xl-block col-3" : "col-8 mx-auto"}>
					{user.length !== 0 && <UserInfo notesCount={notesCount} publicNotesCount={publicNotesCount} notes={notes} params={params} key={user.id} userData={user} getData={getData}/>}
				</div>
				<div className={(user.is_anonymous && user?.id !== currentUser?.id) ? "d-none" : "col-12 col-xl-9 row"}>
					{(user.is_anonymous && user?.id !== currentUser?.id) ? "" : notes.map((note) => <div className="col-12 col-md-6 col-lg-4 my-2 singleNote" key={note.id}>
						<Note key={note.id} noteData={note} getData={getData()}/>
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
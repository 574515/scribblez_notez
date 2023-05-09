import React, {useContext, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";

const AddNote = ({fetchData}) => {

	const [inputs, setInputs] = useState({title: "", body: ""});
	const {currentUser} = useContext(AuthContext);
	const currentUserUsername = currentUser?.username;
	const [msg, setMsg] = useState();
	const [showMsg, setShowMsg] = useState(false);
	const [isErr, setIsErr] = useState(false);

	const navigate = useNavigate();

	const handleChanges = e => {
		setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/notes/", {inputs, currentUserUsername});
			setMsg(res.data);
			setShowMsg(true);
			setIsErr(false);
			fetchData();
			setInputs({title: "", body: ""});
		} catch (err) {
			setMsg(err.response.data);
			setShowMsg(true);
			setIsErr(true);
		}
	};

	const handleKeySubmit = (e) => {
		if (e.ctrlKey && e.keyCode === 13)
			handleSubmit(e).then(() => {
				return null;
			});
	};

	return (
			<div className="addNoteWrapper row">
				<Card className="col-5 p-1 mx-auto">
					<Card.Body>
						<Form>
							<div className="row">
								<div className="col-9">
									<Form.Control as="textarea" name="title" placeholder="Title" id="title" value={inputs.title} onChange={handleChanges} onKeyDown={handleKeySubmit}/>
								</div>
								<div className="col text-end">
									<Button variant="outline-primary" onClick={handleSubmit}>Submit</Button>
								</div>
							</div>
							<hr/>
							<Form.Control as="textarea" name="body" placeholder="Note" value={inputs.body} onChange={handleChanges} onKeyDown={handleKeySubmit}/>
						</Form>
					</Card.Body>
				</Card>
			</div>
	);
};

export default AddNote;
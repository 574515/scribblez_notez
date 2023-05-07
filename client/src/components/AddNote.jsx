import React, {useContext, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import getInitialPopperStyles from "react-bootstrap/getInitialPopperStyles";

const AddNote = ({fetchData}) => {

	const [inputs, setInputs] = useState({title: "", body: ""});
	const {currentUser} = useContext(AuthContext);
	const [msg, setMsg] = useState();
	const [showMsg, setShowMsg] = useState(false);
	const [isErr, setIsErr] = useState(false);

	const navigate = useNavigate();

	const handleChanges = e => {
		setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		await axios.post("http://localhost:8800/api/notes/", {inputs, currentUser})
				.then((data) => {
					setMsg(data.data);
					setShowMsg(true);
					setIsErr(false);
					fetchData();
					setInputs({title: "", body: ""});
				})
				.catch((err) => {
					setMsg(err.response.data);
					setShowMsg(true);
					setIsErr(true);
				});
	};

	return (
			<div className="addNoteWrapper row">
				<div className="col-6 mx-auto">
					<Card>
						<Form>
							<Card.Body>
								<Card.Title><Form.Control className="w-100" name="title" placeholder="Note Title" value={inputs.title} onChange={handleChanges}/></Card.Title>
								<Card.Text>
									<Form.Control className="w-100 h-50" as="textarea" name="body" placeholder="Note" value={inputs.body} onChange={handleChanges}/>
								</Card.Text>
							</Card.Body>
							<Card.Footer className="text-muted text-end">
								<Button variant="outline-success" size="sm" onClick={handleSubmit}>SAVE</Button>
							</Card.Footer>
						</Form>
					</Card>
				</div>
			</div>
	);
};

export default AddNote;
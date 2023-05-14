import {Button, Modal} from "react-bootstrap";
import React from "react";
import axios from "axios";

const AnonymityModal = ({currentUser, getData, show, handleClose, userData, params}) => {
	const handleMakeUserAnonymous = async () => {
		if (params.username !== currentUser.username) return;
		try {
			await axios
					.patch(`/api/users/${userData.username}`, {username: userData.username, is_anonymous: !userData.is_anonymous});
			getData();
		} catch (err) {
			console.log(err);
		}
		handleClose();
	}

	return (
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
				<Modal.Header>
					<Modal.Title className="mx-auto">Make Yourself Anonymous [{userData.username}]</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center fs-5">
					{userData.is_anonymous ?
							<>
								<p>You are currently Anonymous.<br/>
									Other users <span className="text-danger fw-bolder">can not</span> see your details or notes.
								</p>
								<hr/>
								<p>
									By becoming public, You will change those details to <span className="text-danger fw-bolder">visible</span>.<br/>
									<span className="text-danger fw-bolder fst-italic">Are you sure?</span>
								</p>
							</>
							:
							<>
								<p>You are currently Public.<br/>
									Other users <span className="text-danger fw-bolder">can</span> see your details and notes.
								</p>
								<hr/>
								<p>
									By becoming anonymous, You will change those details to <span className="text-danger fw-bolder">hidden</span>.<br/>
									<span className="text-danger fw-bolder fst-italic">Are you sure?</span>
								</p>
							</>
					}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" onClick={handleClose}>Close</Button>
					<Button variant="outline-primary" onClick={handleMakeUserAnonymous}>
						Make Yourself {userData.is_anonymous ? "public" : "anonymous"}.
					</Button>
				</Modal.Footer>
			</Modal>
	);
}

export default AnonymityModal;
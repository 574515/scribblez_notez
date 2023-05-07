import React from 'react';
import {Button, Card} from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";

const Note = ({noteData, fetchData}) => {
	const parsedDateTime = Date.parse(noteData.create_date);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/notes/${noteData.id}`);
			fetchData();
		} catch (err) {
			console.log(err);
		}
	}

	return (
			<div className="col-4">
				<Card>
					<Card.Body>
						<Card.Title>{noteData.title}</Card.Title>
						<Card.Text>
							{noteData.body}
						</Card.Text>
					</Card.Body>
					<Card.Footer className="text-muted">
						<div className="row">
							<div className="col-6">
								<ReactTimeAgo date={parsedDateTime}/>
							</div>
							<div className="col-6">
								<Button variant="outline-danger" size="sm" onClick={handleDelete}>DEL</Button>
								<Button variant="outline-warning" size="sm">EDT</Button>
							</div>
						</div>
					</Card.Footer>
				</Card>
			</div>
	);
}

export default Note;
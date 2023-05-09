import React, {useContext, useState} from 'react';
import {Card} from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import DeleteIcon from '../assets/img/delete.svg';
import EditIcon from '../assets/img/edit.svg';
import PublicIcon from '../assets/img/public.svg';
import PrivateIcon from '../assets/img/private.svg';
import {AuthContext} from "../context/authContext";
import {Link} from "react-router-dom";
import VisibilityModal from "./VisibilityModal";
import EditModal from "./EditModal";

const Note = ({noteData, fetchData}) => {
	const parsedCreateDate = Date.parse(noteData.create_date);
	const noteIsUpdated = () => {
		return noteData.update_date;
	}
	const parsedUpdateDate = noteIsUpdated ? Date.parse(noteData.update_date) : null;
	const {currentUser} = useContext(AuthContext);
	const [showVisibilityModal, setShowVisibilityModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const handleCloseVisibilityModal = () => setShowVisibilityModal(false);
	const handleCloseEditModal = () => setShowEditModal(false);
	const handleShowVisibilityModal = () => setShowVisibilityModal(true);
	const handleShowEditModal = () => setShowEditModal(true);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/notes/${noteData.id}`);
			fetchData();
		} catch (err) {
			console.log(err);
		}
	}

	const handleVisibility = async () => {
		handleCloseVisibilityModal();
		try {
			await axios.patch(`/api/notes/${noteData.id}`, {id: noteData.id, is_public: !noteData.is_public});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	}

	return (
			<Card className="text-primary">
				<Card.Body>
					<div className="row">
						<Card.Title>{noteData.title}</Card.Title>
						<hr/>
						<Card.Text>
							{noteData.body}
						</Card.Text>
					</div>
				</Card.Body>
				<Card.Footer className="text-muted">
					<div className="row align-items-center">
						<div className={noteIsUpdated() ? "col-6 text-warning" : "col-6"}>
							{noteIsUpdated() ?
									<ReactTimeAgo date={parsedUpdateDate}/> :
									<ReactTimeAgo date={parsedCreateDate}/>
							}
						</div>
						<div className="col-6 text-end noteControls">
							{currentUser?.username === noteData.sn_user ?
									<>
										<img src={DeleteIcon} alt="" onClick={handleDelete}/>
										<img src={EditIcon} alt="" onClick={handleShowEditModal}/>
										<img src={noteData.is_public ? PublicIcon : PrivateIcon} alt="" onClick={handleShowVisibilityModal}/>
									</>
									:
									<div className="p-1">
										<figcaption>
											by <Link to={`/${noteData.sn_user}`}>{noteData.sn_user}</Link>
										</figcaption>
									</div>
							}
						</div>
					</div>
				</Card.Footer>
				<VisibilityModal show={showVisibilityModal} handleClose={handleCloseVisibilityModal} noteData={noteData} handleVisibility={handleVisibility}/>
				<EditModal fetchData={fetchData} show={showEditModal} handleClose={handleCloseEditModal} noteData={noteData}/>
			</Card>
	);
}

export default Note;
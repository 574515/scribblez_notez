import {Card} from "react-bootstrap";
import React, {useContext, useState} from "react";
import DefaultAvatar from "../assets/img/default.svg";
import AnonymousIcon from "../assets/img/anonymous.svg";
import ActiveAnonymousIcon from "../assets/img/activeAnonymous.svg";
import {AuthContext} from "../context/authContext";
import ReactTimeAgo from "react-time-ago";
import EditProfileModal from "./EditProfileModal";
import AnonymityModal from "./AnonymityModal";

const UserInfo = ({userData, getData, params, notesCount, notes}) => {

	const {currentUser} = useContext(AuthContext);
	const isCurrentUser = currentUser?.id === userData.id;
	const parsedJoinDate = Date.parse(userData.registration_date);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showAnonymityModal, setShowAnonymityModal] = useState(false);

	const handleCloseEditModal = () => setShowEditModal(false);
	const handleShowEditModal = () => setShowEditModal(true);
	const handleCloseAnonymityModal = () => setShowAnonymityModal(false);
	const handleIsAnonymous = () => {
		if (params.username !== currentUser?.username) return null;
		setShowAnonymityModal(true);
	}

	return (
			<>
				<Card className="text-primary">
					<Card.Body>
						<div className="row">
							<Card.Title>
								<div id="profileUsername" className="text-center">
									{isCurrentUser ? <span onClick={handleShowEditModal}>{userData.username}</span> : userData.username}
									&nbsp;
									<img onClick={handleIsAnonymous} className={(params.username === currentUser?.username) ? "anonMask active" : "anonMask"}
											 src={userData.is_anonymous ? ActiveAnonymousIcon : AnonymousIcon} alt=""/>
								</div>
							</Card.Title>
							<hr/>
							<Card.Text as="div">
								<div className="row text-center">
									<div className="col-12 my-2">
										<img className="profilePicture" src={userData.image ? `uploads/${userData.image}` : `${DefaultAvatar}`} alt=""/>
									</div>
									{userData.first_name &&
											<div className="col-6 my-2">
												<b>First name:</b><br/>{userData.is_anonymous && !isCurrentUser ? <span className='text-muted'><i>[hidden]</i></span> : userData.first_name}
											</div>}
									{userData.last_name &&
											<div className="col-6 my-2">
												<b>Last name:</b><br/>{userData.is_anonymous && !isCurrentUser ? <span className='text-muted'><i>[hidden]</i></span> : userData.last_name ? userData.last_name : "-"}
											</div>}
									{userData.email &&
											<div className="col-12 my-2">
												<b>E-mail:</b><br/>{userData.is_anonymous && !isCurrentUser ? <span className="text-muted"><i>[hidden]</i></span> : userData.email ? userData.email : "-"}
											</div>}
								</div>
							</Card.Text>
						</div>
					</Card.Body>
					<Card.Footer className="text-muted text-center">
						<div className="row">
							<div className="col-12">
								<b>Joined:</b> <ReactTimeAgo date={parsedJoinDate}/>
							</div>
							<div className="col-12">
								<b>Number of Notes:</b> {notesCount}
							</div>
						</div>
					</Card.Footer>
				</Card>
				<EditProfileModal key={userData.id} getData={getData} show={showEditModal} handleClose={handleCloseEditModal} userData={userData} params={params}/>
				<AnonymityModal notes={notes} currentUser={currentUser} getData={getData} show={showAnonymityModal} handleClose={handleCloseAnonymityModal} userData={userData} params={params}/>
			</>
	)
}

export default UserInfo;
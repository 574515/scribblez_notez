import {Button, Card} from "react-bootstrap";
import React, {useContext} from "react";
import DefaultAvatar from "../assets/img/default.svg";
import {AuthContext} from "../context/authContext";

const UserInfo = ({userData}) => {

	const {currentUser} = useContext(AuthContext);
	const isCurrentUser = currentUser?.id === userData.id;

	return (
			<Card className="text-primary">
				<Card.Body>
					<div className="row">
						<Card.Title className="text-center">
							{(userData?.first_name && userData?.last_name && !userData.middle_name) &&
									userData.first_name + " " + userData.last_name}
						</Card.Title>
						<hr/>
						<Card.Text>
							<img className="profilePicture" src={userData.image ? `uploads/${userData.image}` : `${DefaultAvatar}`} alt=""/>
						</Card.Text>
					</div>
				</Card.Body>
				<Card.Footer className="text-muted">
					{isCurrentUser && <Button variant="outline-warning">Edit</Button>}
				</Card.Footer>
			</Card>
	)
}

export default UserInfo;
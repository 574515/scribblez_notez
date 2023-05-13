import React, {useContext} from 'react';
import Logo from '../assets/img/logo.svg';
import ActiveLogo from '../assets/img/activeLogo.svg';
import User from '../assets/img/user.svg';
import ActiveUser from '../assets/img/activeUser.svg';
import Explore from '../assets/img/explore.svg';
import ActiveExplore from '../assets/img/activeExplore.svg';
import LogoutIcon from '../assets/img/logout.svg';
import DebugTools from '../assets/img/debugTools.svg';
import ActiveDebugTools from '../assets/img/activeDebugTools.svg';
import {AuthContext} from "../context/authContext";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const Navigation = () => {

	const {currentUser, logout} = useContext(AuthContext);
	const navigation = useNavigate();
	const location = useLocation();
	const params = useParams();

	const goHome = () => navigation("/");
	const goExplore = () => navigation("/explore");
	const goToProfile = () => navigation(`/${currentUser.username}`);
	const goToDebug = () => navigation("/debug_tools");

	const isHomeActive = () => {
		return location.pathname === "/";
	}

	const isExploreActive = () => {
		return location.pathname === "/explore";
	}

	const isOnProfile = () => {
		return location.pathname === `/${params.username}`;
	}

	const isOnDebug = () => {
		return location.pathname === "/debug_tools";
	}

	return (
			<Navbar collapseOnSelect expand="lg">
				<Container>
					<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mx-auto text-center">
							<Nav.Link onClick={goHome}>
								<img src={isHomeActive() ? ActiveLogo : Logo} alt=""/>&nbsp;
								<span className={isHomeActive() ? "text-white" : ""}>ScribbleZNoteZ</span>
							</Nav.Link>
							<Nav.Link onClick={goExplore}>
								<img src={isExploreActive() ? ActiveExplore : Explore} alt=""/>&nbsp;
								<span className={isExploreActive() ? "text-white" : ""}>Explore</span>
							</Nav.Link>
							<Nav.Link onClick={goToProfile}>
								<img src={isOnProfile() ? ActiveUser : User} alt=""/>&nbsp;
								<span className={isOnProfile() ? "text-white" : ""}>{currentUser?.username}</span>
							</Nav.Link>
							{currentUser?.is_admin ?
									<Nav.Link onClick={goToDebug}>
										<img src={isOnDebug() ? ActiveDebugTools : DebugTools} alt=""/>&nbsp;
										<span className={isOnDebug() ? "text-white" : ""}>Tools</span>
									</Nav.Link> : ""}
							<Nav.Link onClick={logout}>
								<img src={LogoutIcon} alt=""/>&nbsp;<span>Logout</span>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	);
};

export default Navigation;
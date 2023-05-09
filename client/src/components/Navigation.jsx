import React, {useContext} from 'react';
import Logo from '../assets/img/logo.svg';
import ActiveLogo from '../assets/img/activeLogo.svg';
import User from '../assets/img/user.svg';
import ActiveUser from '../assets/img/activeUser.svg';
import Explore from '../assets/img/explore.svg';
import ActiveExplore from '../assets/img/activeExplore.svg';
import LogoutIcon from '../assets/img/logout.svg';
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

	const isHomeActive = () => {
		return location.pathname === "/";
	}
	const isExploreActive = () => {
		return location.pathname === "/explore";
	}

	const isOnProfile = () => {
		return location.pathname === `/${params.username}`;
	}

	return (
			<Navbar collapseOnSelect expand="lg">
				<Container>
					<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mx-auto text-center">
							<Nav.Link className="mx-4" active={isHomeActive()} onClick={goHome}>
								<img src={isHomeActive() ? ActiveLogo : Logo} alt=""/>&nbsp;
								<span className={isHomeActive() ? "linkActive text-white" : "text-dark"}>ScribbleZNoteZ</span>
							</Nav.Link>
							<Nav.Link active={isExploreActive()} className={isExploreActive() ? "mx-4 text-white" : "mx-4 text-dark"} onClick={goExplore}>
								<img src={isExploreActive() ? ActiveExplore : Explore} alt=""/>&nbsp;
								<span className={isExploreActive() ? "linkActive text-white" : "text-dark"}>Explore</span>
							</Nav.Link>
							<Nav.Link active={isOnProfile()} className={isOnProfile() ? "mx-4 text-white" : "mx-4 text-dark"} onClick={goToProfile}>
								<img src={isOnProfile() ? ActiveUser : User} alt=""/>&nbsp;
								<span className={isExploreActive() ? "linkActive text-white" : "text-dark"}>{currentUser?.username}</span>
							</Nav.Link>
							<Nav.Link className="mx-4" onClick={logout}>
								<img src={LogoutIcon} alt=""/>&nbsp;<span>Logout</span>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	);
};

export default Navigation;
import React, {useContext} from 'react';
import Logo from '../assets/img/logo.svg';
import ActiveLogo from '../assets/img/activeLogo.svg';
import User from '../assets/img/user.svg';
import ActiveUser from '../assets/img/user.svg';
import Explore from '../assets/img/explore.svg';
import ActiveExplore from '../assets/img/activeExplore.svg';
import {AuthContext} from "../context/authContext";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

const Navigation = () => {

	const {currentUser, logout} = useContext(AuthContext);
	const navigation = useNavigate();
	const location = useLocation();

	const goHome = () => navigation("/");
	const goExplore = () => navigation("/explore");

	const isHomeActive = () => {
		return location.pathname === "/";
	}
	const isExploreActive = () => {
		return location.pathname === "/explore";
	}

	return (
			<Navbar collapseOnSelect expand="lg">
				<Container>
					<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link active={isHomeActive()} onClick={goHome}>
								<img src={isHomeActive() ? ActiveLogo : Logo} alt=""/>&nbsp;
								<span className={isHomeActive() ? "linkActive text-white" : "text-dark"}>ScribbleZNoteZ</span>
							</Nav.Link>
						</Nav>
						<Nav className="mx-auto">
							<Nav.Link active={isExploreActive()} className={isExploreActive() ? "text-white" : "text-dark"} onClick={goExplore}>
								<img src={isExploreActive() ? ActiveExplore : Explore} alt=""/>&nbsp;
								<span className={isExploreActive() ? "linkActive text-white" : "text-dark"}>Explore</span>
							</Nav.Link>
						</Nav>
						<Nav className="ms-auto">
							{currentUser && <Nav.Link onClick={logout}><img src={User} alt=""/>&nbsp;<span>Logout [{currentUser.username}]</span></Nav.Link>}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	);
};

export default Navigation;
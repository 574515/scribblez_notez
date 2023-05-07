import React, {useContext} from 'react';
import Logo from '../assets/img/logo.png'
import {Link} from "react-router-dom";
import {AuthContext} from "../context/authContext";

const Navbar = () => {

	const {currentUser, logout} = useContext(AuthContext);

	return (
			<div className='navbar'>
				<div className="container">
					<div className="logo">
						<img src={Logo} alt=""/>
					</div>
					<div className="links">
						<span>{currentUser?.username}</span>
						{currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link>}
					</div>
				</div>
			</div>
	);
};

export default Navbar;
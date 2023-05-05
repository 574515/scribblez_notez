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
						<Link className="link" to="/login">
							<h6>LOGIN</h6>
						</Link>
						<Link className="link" to="/register">
							<h6>REGISTER</h6>
						</Link>
						<span>{currentUser?.username}</span>
						{currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link>}
						<span className="write">Write</span>
					</div>
				</div>
			</div>
	);
};

export default Navbar;
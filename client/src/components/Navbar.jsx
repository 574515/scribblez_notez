import React from 'react';
import Logo from '../assets/img/logo.png'
import {Link} from "react-router-dom";

const Navbar = () => {
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
						<span>Ime</span>
						<span>Logout</span>
						<span className="write">Write</span>
					</div>
				</div>
			</div>
	);
};

export default Navbar;
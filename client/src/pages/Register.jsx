import React from 'react';
import {Link} from "react-router-dom";

const Register = () => {
	return (
			<div className="auth">
				<div className="wrapper">
					<h1>REGISTER</h1>
					<form>
						<input type="text" placeholder="Username" required/>
						<input type="email" placeholder="E-mail" required/>
						<input type="password" placeholder="Password" required/>
						<button>REGISTER</button>
						<p>This is an error!</p>
						<span>Already have an account? <Link to="/login">Login</Link></span>
					</form>
				</div>
			</div>
	);
};

export default Register;
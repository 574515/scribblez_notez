import React from 'react';
import {Link} from "react-router-dom";

const Login = () => {
	return (
			<div className="auth">
				<div className="wrapper">
					<h1>LOGIN</h1>
					<form>
						<input type="text" placeholder="Username" required/>
						<input type="password" placeholder="Password" required/>
						<button>LOGIN</button>
						<p>This is an error!</p>
						<span>Don't have an account? <Link to="/register">Register</Link></span>
					</form>
				</div>
			</div>
	);
};

export default Login;
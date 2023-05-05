import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {AuthContext} from "../context/authContext";

const Login = () => {

	const timeoutInMillis = 3000;

	const [inputs, setInputs] = useState({
		username: "",
		password: ""
	});

	const [msg, setMsg] = useState("");
	const [showMsg, setShowMsg] = useState(false);
	const [isErr, setIsErr] = useState(false);

	const navigate = useNavigate();

	const {login} = useContext(AuthContext);

	const handleChanges = e => {
		setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
	};
	let x;

	const handleSubmit = async e => {
		e.preventDefault();
		const username = e.target.form.username;
		const password = e.target.form.password;
		if (!_checkForm(username, password)) return null;
		try {
			await login(inputs);
			navigate("/");
		} catch (err) {
			_setErrorStyle(username);
			_setErrorStyle(password);
			setMsg(err.response.data);
			setShowMsg(true);
			setIsErr(true);
		}
	};

	function _checkForm(username, password) {
		if (username.value === "" || password.value === "") {
			_setErrorStyle(username);
			_setErrorStyle(password);
			setMsg("Both fields must have value.");
			setShowMsg(true);
			setIsErr(true);
			return false;
		}
		return true;
	}

	function _setErrorStyle(elem) {
		console.log(elem.name + "\t" + elem.value)
		if (elem.value === "") {
			elem.className = "errorInput";
		} else {
			elem.className = "validInput";
		}
	}

	return (
			<div className="auth">
				<div className="wrapper">
					<h1>LOGIN</h1>
					<form>
						<input className="" type="text" name="username" placeholder="Username" required onChange={handleChanges}/>
						<input type="password" name="password" placeholder="Password" required onChange={handleChanges}/>
						<button type="submit" onClick={handleSubmit}>LOGIN</button>
						<span>Don't have an account? <Link to="/register">Register</Link></span>
					</form>
				</div>
				<Alert className="loginAlert" key={isErr ? "danger" : "warning"} variant={isErr ? "danger" : "warning"} onClose={() => setShowMsg(false)} show={showMsg} dismissible={isErr}>
					<span><b>{msg}</b></span>
				</Alert>
			</div>
	);
};

export default Login;
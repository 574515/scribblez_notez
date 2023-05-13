import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Form} from "react-bootstrap";
import {AuthContext} from "../context/authContext";
import {inputClassStyles} from "../globals";

const Login = () => {

	const {currentUser, login} = useContext(AuthContext);
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({username: "", password: ""});
	const [isErr, setIsErr] = useState(false);
	const [msg, setMsg] = useState("");
	const [showMsg, setShowMsg] = useState(false);

	const handleChanges = e => setInputs(prev => ({...prev, [e.target.name]: e.target.value}));

	const handleShowPassword = e => e.target.form.password.type = e.target.checked ? "text" : "password";

	useEffect(() => {
		if (currentUser !== null) navigate("/");
	}, [currentUser, navigate]);

	const handleSubmit = async e => {
		e.preventDefault();
		const username = e.target.form.username;
		const password = e.target.form.password;
		if (!checkForm(username, password)) return null;
		try {
			setErrorStyles(username, password);
			await login(inputs);
			navigate("/");
		} catch (err) {
			setErrorStyles(username, password);
			setMsg(err.response.data);
			setShowMsg(true);
			setIsErr(true);
		}
	};

	function checkForm(username, password) {
		if (username.value === "" || password.value === "") {
			setErrorStyles(username, password);
			setMsg("Both fields must have value.");
			setShowMsg(true);
			setIsErr(true);
			return false;
		}
		return true;
	}

	function setErrorStyle(elem) {
		if (elem.name === "password") {
			if (elem.value === "") elem.className = inputClassStyles.errorPasswordInput;
			else elem.className = inputClassStyles.validPasswordInput;
		} else {
			if (elem.value === "") elem.className = inputClassStyles.errorInput;
			else elem.className = inputClassStyles.validInput;
		}
	}

	function setErrorStyles(username, password) {
		setErrorStyle(username);
		setErrorStyle(password);
	}

	return (
			<div className="auth col-6 mx-auto">
				<Form className="px-5 py-3 text-center row">
					<h1 className="display-6 mb-4">Login</h1>
					<Form.Control className="my-2" size="sm" type="text" name="username" placeholder="Username" onChange={handleChanges}/>
					<Form.Control className="my-2 w-75" size="sm" type="password" name="password" placeholder="Password" onChange={handleChanges}/>
					<Form.Check type="checkbox" className="w-25 my-auto" label="" onClick={handleShowPassword}/>
					<Button className="w-75 mx-auto my-2" variant="outline-primary" type="submit" size="sm" onClick={handleSubmit}>Log In</Button>
					<div className="text-white-50 my-2">
						Don't have an account?
						<br/>
						<Link className="link" to="/signup">Sign up</Link> and get started!
					</div>
				</Form>
				<Alert className="loginAlert" key="primary" variant="primary" onClose={() => setShowMsg(false)} show={showMsg} dismissible={isErr}>
					<span>{msg}</span>
				</Alert>
			</div>
	);
};

export default Login;
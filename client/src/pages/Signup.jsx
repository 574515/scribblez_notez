import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Alert, Button, Form} from "react-bootstrap";
import {errorInput, validInput, errorPasswordInput, validPasswordInput} from "../globals";

const Signup = () => {
	const [inputs, setInputs] = useState({username: "", email: "", password: "", password2: ""});
	const [msg, setMsg] = useState("");
	const [showMsg, setShowMsg] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
	const handleChanges = e => {
		setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	const handleSubmit = async e => {
		e.preventDefault();
		const username = e.target.form.username;
		const email = e.target.form.email;
		const password = e.target.form.password;
		const repeatPassword = e.target.form.password2;
		if (!_checkForm(username, email, password, repeatPassword)) return null;
		await axios.post("http://localhost:8800/api/auth/register", inputs)
				.then((data) => {
					setMsg(data.data);
					setShowMsg(true);
					setIsErr(false);
					setTimeout(() => {
						navigate("/login");
					}, 5000);
				})
				.catch((err) => {
					setMsg(err.response.data);
					setShowMsg(true);
					setIsErr(true);
				});
	};

	const handleShowPassword = e => e.target.form.password.type = e.target.checked ? "text" : "password";

	const handleShowRepeatPassword = e => e.target.form.password2.type = e.target.checked ? "text" : "password";

	function _checkForm(username, email, password, repeatPassword) {
		if (username.value === "" || email.value === "" || password.value === "" || repeatPassword.value === "")
			return _setErrorMessage("All fields must have value.", username, email, password, repeatPassword);
		else if (password.value !== repeatPassword.value) return _setErrorMessage("Passwords do not match!", username, email, password, repeatPassword, true);
		else {
			_setErrorStyles(username, email, password, repeatPassword);
			return true;
		}
	}

	function _setErrorStyle(elem) {
		if (elem.name === "password" || elem.name === "password2") {
			if (elem.value === "") elem.className = errorPasswordInput;
			else elem.className = validPasswordInput;
		} else {
			if (elem.value === "") elem.className = errorInput;
			else elem.className = validInput;
		}
	}

	function _setErrorStyles(username, email, password, repeatPassword) {
		_setErrorStyle(username);
		_setErrorStyle(email);
		_setErrorStyle(password);
		_setErrorStyle(repeatPassword);
	}

	function _setPasswordErrorStyle(password, repeatPassword, areMatching) {
		if (!areMatching) {
			password.className = errorPasswordInput;
			repeatPassword.className = errorPasswordInput;
		} else {
			password.className = validPasswordInput;
			repeatPassword.className = validPasswordInput;
		}
	}

	function _setErrorMessage(message, username, email, password, repeatPassword, isPassword) {
		isPassword = isPassword || false;
		if (isPassword) {
			_setErrorStyle(username);
			_setErrorStyle(email);
			_setPasswordErrorStyle(password, repeatPassword);
		} else _setErrorStyles(username, email, password, repeatPassword);
		setMsg(message);
		setShowMsg(true);
		setIsErr(true);
		return false;
	}

	return (
			<div className="auth">
				<div className="wrapper">
					<Form className="px-5 py-3 text-center row">
						<h1 className="display-6 mb-4">Sign-up</h1>
						<Form.Control className="my-2" size="sm" type="text" name="username" placeholder="Username" onChange={handleChanges}/>
						<Form.Control className="my-2" size="sm" type="text" name="email" placeholder="E-mail" onChange={handleChanges}/>
						<Form.Control className="my-2 w-75" size="sm" type="password" name="password" placeholder="Password" onChange={handleChanges}/>
						<Form.Check type="checkbox" className="w-25 m-auto" label="" onClick={handleShowPassword}/>
						<Form.Control className="my-2 w-75" size="sm" type="password" name="password2" id="password2" placeholder="Repeat Password" onChange={handleChanges}/>
						<Form.Check type="checkbox" className="w-25 my-auto" label="" onClick={handleShowRepeatPassword}/>
						<Form.Control className="my-2" size="sm" type="file" name="profilePhoto" accept="image/png"/>
						<Button className="w-75 mx-auto my-2" variant="outline-primary" type="submit" size="sm" onClick={handleSubmit}>Sign Up</Button>

						<div className="text-white-50 my-2">
							Already have an account?
							<br/>
							<Link className="link" to="/login">Log In</Link> to post notes!
						</div>
					</Form>
				</div>
				<Alert className="signUpAlert" key="primary" variant="primary" onClose={() => setShowMsg(false)} show={showMsg} dismissible={isErr}>
					<span>{msg}</span>
				</Alert>
			</div>
	);
};

export default Signup;
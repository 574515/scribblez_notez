import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Alert, Button, Form} from "react-bootstrap";
import {inputClassStyles} from "../globals";
import {AuthContext} from "../context/authContext";

const Signup = () => {

	const {currentUser} = useContext(AuthContext);
	const navigate = useNavigate();

	const [file, setFile] = useState(null);
	const [inputs, setInputs] = useState({first_name: "", last_name: "", username: "", email: "", password: "", password2: ""});
	const [isErr, setIsErr] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [msg, setMsg] = useState("");
	const [showMsg, setShowMsg] = useState(false);

	useEffect(() => {
		if (currentUser !== null) navigate("/");
	}, [currentUser, navigate]);

	const handleChanges = e => setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
	const handleShowPassword = e => e.target.form.password.type = e.target.checked ? "text" : "password";
	const handleShowRepeatPassword = e => e.target.form.password2.type = e.target.checked ? "text" : "password";

	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await axios.post("/api/uploads", formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	}

	const handleSubmit = async e => {
		e.preventDefault();
		const imgUrl = await upload();
		const username = e.target.form.username;
		const email = e.target.form.email;
		const password = e.target.form.password;
		const repeatPassword = e.target.form.password2;
		if (!checkForm(username, email, password, repeatPassword)) return null;
		await axios.post("http://localhost:8800/api/auth/signup", {inputs, imgUrl})
				.then((data) => {
					setMsg(data.data);
					setShowMsg(true);
					setIsSuccess(true);
					setIsErr(false);
				})
				.catch((err) => {
					setMsg(err.response.data);
					setShowMsg(true);
					setIsErr(true);
					setIsSuccess(false);
				});
	};

	function checkForm(username, email, password, repeatPassword) {
		if (username.value === "" || email.value === "" || password.value === "" || repeatPassword.value === "")
			return setErrorMessage("All fields must have value.", username, email, password, repeatPassword);
		else if (password.value !== repeatPassword.value) return setErrorMessage("Passwords do not match!", username, email, password, repeatPassword, true);
		else {
			setErrorStyles(username, email, password, repeatPassword);
			return true;
		}
	}

	function setErrorStyle(elem) {
		if (elem.name === "password" || elem.name === "password2") {
			if (elem.value === "") elem.className = inputClassStyles.errorPasswordInput;
			else elem.className = inputClassStyles.validPasswordInput;
		} else {
			if (elem.value === "") elem.className = inputClassStyles.errorInput;
			else elem.className = inputClassStyles.validInput;
		}
	}

	function setErrorStyles(username, email, password, repeatPassword) {
		setErrorStyle(username);
		setErrorStyle(email);
		setErrorStyle(password);
		setErrorStyle(repeatPassword);
	}

	function setPasswordErrorStyle(password, repeatPassword, areMatching) {
		if (!areMatching) {
			password.className = inputClassStyles.errorPasswordInput;
			repeatPassword.className = inputClassStyles.errorPasswordInput;
		} else {
			password.className = inputClassStyles.validPasswordInput;
			repeatPassword.className = inputClassStyles.validPasswordInput;
		}
	}

	function setErrorMessage(message, username, email, password, repeatPassword, isPassword) {
		isPassword = isPassword || false;
		if (isPassword) {
			setErrorStyle(username);
			setErrorStyle(email);
			setPasswordErrorStyle(password, repeatPassword);
		} else setErrorStyles(username, email, password, repeatPassword);
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
						<Form.Control className="my-2" size="sm" type="text" name="first_name" placeholder="First Name" onChange={handleChanges}/>
						<Form.Control className="my-2" size="sm" type="text" name="last_name" placeholder="Last Name" onChange={handleChanges}/>
						<Form.Control className="my-2" size="sm" type="text" name="username" placeholder="Username" onChange={handleChanges}/>
						<Form.Control className="my-2" size="sm" type="text" name="email" placeholder="E-mail" onChange={handleChanges}/>
						<Form.Control className="my-2 w-75" size="sm" type="password" name="password" placeholder="Password" onChange={handleChanges}/>
						<Form.Check type="checkbox" className="w-25 m-auto" label="" onClick={handleShowPassword}/>
						<Form.Control className="my-2 w-75" size="sm" type="password" name="password2" id="password2" placeholder="Repeat Password" onChange={handleChanges}/>
						<Form.Check type="checkbox" className="w-25 my-auto" label="" onClick={handleShowRepeatPassword}/>
						<Form.Control className="my-2" size="sm" type="file" name="profilePhoto" accept="image/png" onChange={e => setFile(e.target.files[0])}/>
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
					{isSuccess ? <span>&nbsp;You may click <Link to="/login">here</Link> to log in.</span> : ""}
				</Alert>
			</div>
	);
};

export default Signup;
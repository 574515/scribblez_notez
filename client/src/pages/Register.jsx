import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Alert} from "react-bootstrap";

const Register = () => {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: ""
	});
	const [msg, setMsg] = useState();
	const [showMsg, setShowMsg] = useState(false);
	const [isErr, setIsErr] = useState(false);

	const navigate = useNavigate();

	const handleChanges = e => {
		setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
	};

	const handleSubmit = async e => {
		e.preventDefault();
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

	return (
			<div className="auth">
				<div className="wrapper">
					<h1>REGISTER</h1>
					<form>
						<input type="text" placeholder="Username" name="username" required onChange={handleChanges}/>
						<input type="email" placeholder="E-mail" name="email" required onChange={handleChanges}/>
						<input type="password" placeholder="Password" name="password" required onChange={handleChanges}/>
						<button onClick={handleSubmit}>REGISTER</button>
						<span>Already have an account? <Link to="/login">Login</Link></span>
					</form>
				</div>
				<Alert className="registerAlert" key={isErr ? "danger" : "success"} variant={isErr ? "danger" : "success"} onClose={() => setShowMsg(false)} show={showMsg} dismissible={isErr}>
					<span><b>{msg}</b></span> {!isErr && <span><br/>Click <Link to="/login">here</Link> if you're not automatically redirected.</span>}
				</Alert>
			</div>
	);
};

export default Register;
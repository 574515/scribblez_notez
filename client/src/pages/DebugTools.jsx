import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form, Tab, Table, Tabs} from "react-bootstrap";
import {faker} from '@faker-js/faker';
import {Link} from "react-router-dom";
import {goToTop} from "../globals";
import UpIcon from "../assets/img/up.svg";

const DebugTools = () => {

	const baconTypes = ["all-meat", "meat-and-filler"];
	const [currentUserUsername, setCurrentUserUsername] = useState("");
	const [fakeUsers, setFakeUsers] = useState([]);
	const [generateInputs, setGenerateInputs] = useState({
		type: "all-meat", paras: 1, start_with_lorem: 0, format: "json"
	});
	const imgUrl = "";
	const [key, setKey] = useState('generateNotes');
	const [numOfFakeUsers, setNumOfFakeUsers] = useState(0);
	const [showTopBtn, setShowTopBtn] = useState(false);
	const [usernames, setUsernames] = useState([]);
	const [wordsInBody, setWordsInBody] = useState(parseInt("6"));
	const [wordsInTitle, setWordsInTitle] = useState(parseInt("3"));

	const handleNoteTitle = e => setWordsInTitle(parseInt(e.target.value));
	const handleNoteBody = e => setWordsInBody(parseInt(e.target.value));

	const generateFakeUser = () => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const username = `${firstName.charAt(0)}_${lastName}`.toLowerCase();
		const email = faker.internet.email(firstName.toLowerCase(), lastName.toLowerCase());
		const password = faker.internet.password();
		const inputs = {
			first_name: firstName,
			last_name: lastName,
			username: username,
			email: email,
			password: password
		};
		registerFakeUser(inputs).then(() => getUsernames().then());
		return [username, password];
	}

	const registerFakeUser = async (inputs) =>
			await axios
					.post("http://localhost:8800/api/auth/signup", {inputs, imgUrl})
					.then()
					.catch((err) => console.log(err));

	const handleParagraphChanges = e => {
		const targetName = e.target.name;
		if (targetName === "start_with_lorem") setGenerateInputs(prev => ({...prev, [targetName]: +e.target.checked}));
		else setGenerateInputs(prev => ({...prev, [targetName]: e.target.value}));
		if (targetName === "current_user") setCurrentUserUsername(e.target.value);
	}

	const getNumberOfWOrdsFromString = (str, start, end) => {
		return (str.split(/\s+/).slice(start, end).join(" "));
	}

	const getUsernames = async () => {
		await axios
				.get("http://localhost:8800/api/users/usernames")
				.then((result) => setUsernames(result.data))
				.catch((err) => console.log(err));
	}

	const getUsers = () => {
		let usersUsernames = [];
		usernames.map((userName) => (
				usersUsernames.push(
						<option key={userName.username} value={userName.username}>
							{userName.username}
						</option>
				)));
		return usersUsernames;
	}

	const firstLetterToUpper = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	const generateNotesForOneUser = async (multiUsername, isMulti) => {
		const inputs = {title: "", body: ""};
		let otherUser;
		for (let iter in usernames)
			if (multiUsername === usernames[iter].username) {
				otherUser = multiUsername;
				break;
			}
		await axios
				.get(`https://baconipsum.com/api/?type=${generateInputs.type}&paras=${generateInputs.paras}&start_with_lorem=${generateInputs.start_with_lorem}&format=json`)
				.then((result) => {
					result.data.map(async (text) => {
						inputs.title = getNumberOfWOrdsFromString(text, 0, wordsInTitle);
						const offset = wordsInBody + wordsInTitle;
						const bodyText = getNumberOfWOrdsFromString(text, wordsInTitle, offset);
						inputs.body = firstLetterToUpper(bodyText);
						let dataToSend;
						dataToSend = !isMulti ? {inputs, currentUserUsername} : {inputs, otherUser};
						await axios
								.post("/api/notes/", dataToSend)
								.then()
								.catch((err) => console.log(err));
					})
				})
				.catch((err) => console.log(err));
	}

	const getBeautifiedType = (baconType) => {
		let words = baconType.split('-');
		for (let word in words) words[word] = words[word].charAt(0).toUpperCase() + words[word].slice(1);
		return words.join(' ');
	}

	baconTypes.forEach(baconType => getBeautifiedType(baconType));

	const getTypes = () => {
		let typesOfBacon = [];
		baconTypes.map((baconType) => (
				typesOfBacon.push(
						<option key={baconType} value={baconType}>
							{getBeautifiedType(baconType)}
						</option>
				)
		));
		return typesOfBacon;
	}

	const generateNotesForAllUsers = async () => {
		for (let user of usernames) await generateNotesForOneUser(user.username, true);
	}

	const generateFakeUsers = (e) => {
		e.preventDefault();
		let users = [];
		for (let i = 0; i < numOfFakeUsers; i++) users.push(generateFakeUser());
		setFakeUsers(users);
		getUsernames().then();
	}

	const handleNumberOfUsersChange = (e) => {
		let val = parseInt(e.target.value), max = parseInt(e.target.max), min = parseInt(e.target.min);
		if (!isNaN(val)) {
			if (val > max) setNumOfFakeUsers(max);
			else setNumOfFakeUsers(val);
		} else setNumOfFakeUsers(min);
	}

	useEffect(() => {
		getUsernames().then();
		window.addEventListener('scroll', () => setShowTopBtn(window.scrollY > 150));
	}, []);

	return (
			<div className="row align-items-center justify-content-evenly">
				<div className="mt-3 mx-auto col-12 col-md-10 col-xxl-9">
					<Tabs id="baconTabs" activeKey={key} onSelect={(k) => setKey(k)} justify transition={false}>
						<Tab eventKey="generateNotes" title="Generate Notes" className="row text-white">
							<div className="notesAndUsers">
								<Form className="row p-3 align-items-center">
									<div className="col-6 col-lg-3 mt-4 mb-2 text-center">
										<Form.Label htmlFor="paras">Type</Form.Label>
										<Form.Select name="type" className="text-center" onChange={handleParagraphChanges} defaultValue={generateInputs.type}>
											<option disabled>Select type</option>
											{getTypes()}
										</Form.Select>
									</div>
									<div className="col-6 col-lg-3 mt-4 mb-2 text-center">
										<Form.Label htmlFor="paras">Number of Notes</Form.Label>
										<Form.Control type="number" className="text-center" name="paras" min="1" value={generateInputs.paras} onChange={handleParagraphChanges}/>
									</div>
									<div className="col-6 col-lg-3 mt-4 mb-2 text-center">
										<Form.Check type="switch" name="start_with_lorem" label='Start with "Lorem"' onChange={handleParagraphChanges} checked={generateInputs.start_with_lorem !== 0}/>
									</div>
									<div className="col-6 col-lg-3 mt-4 mb-2 text-center">
										<Form.Label htmlFor="paras">User</Form.Label>
										<Form.Select name="current_user" className="text-center" onChange={handleParagraphChanges} defaultValue="initDefaultUser">
											<option value="initDefaultUser" disabled>Select User</option>
											{getUsers()}
										</Form.Select>
									</div>
								</Form>
								<hr/>
								<div className="row px-3 pt-2 pb-3 align-items-center">
									<div className="col-6 col-lg-3 mt-4 mb-2 text-center">
										<Form.Label htmlFor="paras">Number of Words In Title</Form.Label>
										<Form.Control type="number" className="text-center" value={wordsInTitle} name="singleUserTitle" min="1" onChange={handleNoteTitle}/>
									</div>
									<div className="col-6 col-lg-3 mt-4 mb-2 text-center">
										<Form.Label htmlFor="paras">Number of Words In Body</Form.Label>
										<Form.Control type="number" className="text-center" value={wordsInBody} name="singleUserBody" min="1" onChange={handleNoteBody}/>
									</div>
									<div className="col-6 col-lg-3 mt-4 mb-2">
										<Button onClick={generateNotesForOneUser} className="w-100" variant="primary">
											Generate For One
										</Button>
									</div>
									<div className="col-6 col-lg-3 mt-4 mb-2">
										<Button onClick={generateNotesForAllUsers} className="w-100" variant="primary">
											Generate For All
										</Button>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-6 mx-auto my-3 tableWrapper">
								<Table bordered variant="primary" className="text-center">
									<thead>
									<tr>
										<th>PROPERTY</th>
										<th>OPTIONS</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>Type</td>
										<td><b>all-meat</b><br/><b>meat-and-filler</b></td>
									</tr>
									<tr>
										<td>Number of Notes</td>
										<td><b>positive integer</b></td>
									</tr>
									<tr>
										<td>Start with "Lorem"</td>
										<td><b>0</b> or <b>1</b></td>
									</tr>
									<tr>
										<td>User</td>
										<td><b>registered user</b></td>
									</tr>
									<tr>
										<td>Number of Words In Title</td>
										<td><b>positive integer</b></td>
									</tr>
									<tr>
										<td>Number of Words In Body</td>
										<td><b>positive integer</b></td>
									</tr>
									<tr>
										<td colSpan={2}>API info can be found on <Link to="https://baconipsum.com/json-api/">link</Link>.</td>
									</tr>
									</tbody>
								</Table>
							</div>
						</Tab>
						<Tab eventKey="generateUsers" title="Generate Users" className="row text-white">
							<div className="notesAndUsers">
								<Form className="row p-3 align-items-center">
									<div className="col-12 col-md-6 mt-4 mb-2 text-center">
										<Form.Label htmlFor="paras">Number of Users</Form.Label>
										<Form.Control type="number" className="text-center" name="numOfFakeUsers" min="1" max="500" value={numOfFakeUsers}
																	onChange={handleNumberOfUsersChange}/>
									</div>
									<div className="col-12 col-md-6 mt-4 mb-2 text-center">
										<Button onClick={generateFakeUsers} className="w-100">Generate</Button>
									</div>
									<div className="col-12 col-md-8 col-xl-6 mx-auto userResults">
										{fakeUsers.length > 0 &&
												<div>
													<h3 className="text-center">Results</h3>
													<Table striped bordered variant="primary" className="text-center" hover>
														<thead>
														<tr className="text-center">
															<th>Username</th>
															<th>Password</th>
														</tr>
														</thead>
														<tbody>
														{fakeUsers.sort() &&
																fakeUsers.map((fakeUser) => (
																		<tr key={`${fakeUser[0]}_${fakeUser[1]}`}>
																			<td>{fakeUser[0]}</td>
																			<td>{fakeUser[1]}</td>
																		</tr>
																))}
														</tbody>
														<tfoot>
														<tr className="text-center">
															<th>Username</th>
															<th>Password</th>
														</tr>
														</tfoot>
													</Table>
												</div>
										}
									</div>
								</Form>
							</div>
						</Tab>
					</Tabs>
				</div>
				{showTopBtn && <div className="top-to-btm">
					<span className="icon-position" onClick={goToTop}>
						<div className="img-desc-go text-center">GO</div>
						<img src={UpIcon} alt=""/>
						<div className="img-desc text-center">UP</div>
					</span>
				</div>}
			</div>
	)
}

export default DebugTools;
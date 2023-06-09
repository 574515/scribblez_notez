import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

	const login = async (inputs) => {
		const res = await axios.post("/api/auth/login", inputs, {withCredentials: true});
		setCurrentUser(res.data);
	};

	const logout = async () => {
		await axios.post("/api/auth/logout");
		setCurrentUser(null);
		window.location = "/login";
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser))
	}, [currentUser]);

	return <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
}
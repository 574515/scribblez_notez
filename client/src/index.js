import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthContextProvider} from "./context/authContext";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en.json'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<React.StrictMode>
			<AuthContextProvider>
				<App/>
			</AuthContextProvider>
		</React.StrictMode>
);

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectProvider } from "./context/Project";
import { SiteProvider } from "./context/site";
import { ChatProvider } from "./context/Chat";
import { BrowserRouter } from 'react-router-dom'

import Loader from './components/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<AuthProvider>
			<SiteProvider>
			<ProjectProvider>
			<ChatProvider>
				<Loader />

				<div id="main-wrapper">
					<App />
				</div>
			</ChatProvider>
			</ProjectProvider>
			</SiteProvider>
		</AuthProvider>
	</React.StrictMode>
);


reportWebVitals();

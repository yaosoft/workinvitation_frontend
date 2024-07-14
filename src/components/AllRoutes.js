import React, { useState, useEffect } from "react";

import Index from './pages/Index';
import ReceivedProjects from './pages/ReceivedProjects';
import SentProjects from './pages/SentProjects';
import SavedProjects from './pages/SavedProjects';
import EditProject from './pages/EditProject';
import Project from './pages/Project';
import Login from './pages/Login';
import Registration from './pages/Registration';

import NotFoundPage from './pages/NotFoundPage';



const AllRoutes = {

	routes: [
		{	// Projects | Received projects
			element:  <ReceivedProjects />,
			path: 'project/received',
		},
		{	// Projects | Sent projects
			element:  <SentProjects />,
			path: 'project/sent',
		},
		{	// Projects | Saved projects
			element:  <SavedProjects />,
			path: 'project/saved',
		},
		{	// Projects | Create
			element:  <EditProject />,
			path: 'project/edit/:id',
		},
		{	// Project
			element:  <Project />,
			path: 'project/:id',
		},
		{	// Accueil
			element:  <Index />,
			path: 'accueil',
		},
		{	// Login
			element:  <Login />,
			path: 'login',
		},
		{	// Registration
			element:  <Registration />,
			path: 'registration',
		},
		{	// Not found page
			element: <NotFoundPage />,
			path: '/*',
		},
	],
}

export default AllRoutes;

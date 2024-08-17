import React, { useState, useEffect } from "react";

import Index from './pages/Index';
import ReceivedProjects from './pages/ReceivedProjects';
import SentProjects from './pages/SentProjects';
import SentProjectsEdit from './pages/SentProjectsEdit';
import ListProjects from './pages/ListProjects.js';
import EditProject from './pages/EditProject';
import Project from './pages/Project';
import ProjectInvitations from './pages/ProjectInvitations';
import Login from './pages/Login';
import Registration from './pages/Registration';

import NotFoundPage from './pages/NotFoundPage';



const AllRoutes = {

	routes: [
		{	// Projects | Received projects
			element:  <ListProjects 
				params={{
					pageName: 	'ReceivedProject',
					pageTitle: 	'Received Projects',
				}} 
			/>,
			path: 'project/received',
		},
		{	// Projects | Sent projects
			element:  <ListProjects 
				params={{
					pageName: 	'SentProject',
					pageTitle: 	'Sent Projects',
				}} 
			/>,
			path: 'project/sent',
		},
		{	// Projects | Sent projects | Edit
			element:  <Project />,
			path: 'project/view',
		},
		{	// Projects | Sent projects | Edit
			element:  <ProjectInvitations />,
			path: 'project/invitation/:projectId',
		},
		{	// Projects | Saved projects
			element:  <ListProjects 
				params={{
					pageName: 	'SavedProject',
					pageTitle: 	'Saved Projects',
				}} 
			/>,
			path: 'project/saved',
		},
		{	// Projects | Create
			element:  <EditProject />,
			path: 'project/edit/*',
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

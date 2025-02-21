import React, { useState, useEffect } from "react";

import Index from './pages/Index';
import ListProjects from './pages/ListProjects.js';
import ProjectEdit from './pages/ProjectEdit';
import Project from './pages/Project';
import ProjectInvitations from './pages/ProjectInvitations';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFoundPage from './pages/NotFoundPage';
import ContactsLists from './pages/ContactsLists';
import ContactsListsEdit from './pages/ContactsListsEdit';
import Profile from './pages/Profile';
import ProfilePasswordEdit from './pages/ProfilePasswordEdit';
import PasswordForgot from './pages/PasswordForgot';
import PasswordForgotUpdate from './pages/PasswordForgotUpdate';

const AllRoutes = {

	routes: [
		{	// Contact lists | list
			element:  <ContactsLists 
				params={{
					pageName: 	'ContactsLists',
					pageTitle: 	'Contacts Lists',
				}}
			/>,
			path: 'contacts-list/list',
		},
		{	// Contact lists | create
			element:  <ContactsListsEdit
				params={{
					pageName: 	'ContactsListsCreate',
					pageTitle: 	'Create a Contacts Lists ',
					type: 'create'
				}}
			/>,
			path: 'contacts-list/create',
		},
		{	// Contact lists | edit
			element:  <ContactsListsEdit
				params={{
					pageName: 	'ContactsListsEdit',
					pageTitle: 	'Edit a Contacts Lists ',
					type: 		'edit'
				}}
			/>,
			path: 'contacts-list/edit/*',
		},
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
			element:  <ProjectEdit />,
			path: 'project/edit/*',
		},
		{	// Accueil
			element:  <Index />,
			path: 'accueil',
		},
		{	// Accueil
			element:  <Index />,
			path: '',
		},
		{	// Login
			element:  <Login />,
			path: 'login',
		},
		{	// Registration
			element:  <Registration />,
			path: 'registration',
		},
		{	// Profile | Edit
			element:  <Profile />,
			path: 'profile/edit',
		},
		{	// Profile | Password
			element:  <ProfilePasswordEdit />,
			path: 'profile/password/change',
		},
		{	// Password | Forgot
			element:  <PasswordForgot />,
			path: 'password/forgot',
		},
		{	// Password | Forgot | update
			element:  <PasswordForgotUpdate />,
			path: 	'password/forgot/update',
		},
		{	// Not found page
			element: <NotFoundPage />,
			path: '/*',
		},
	],
}

export default AllRoutes;

import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import { Space, Spin } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';
export const ProjectContext = createContext();


export const ProjectProvider = ({ children }) => {

	// spiner
	const [ spiner, setSpiner ] = useState( 'none' );

	// helper: Fetch data definition
	async function fetchData( url, data, method ) {
		setSpiner( 'block' )
		const response = await fetch( url, {
			method: method, // *GET, POST, PUT, DELETE, etc.
			// mode: "no-cors", // no-cors, *cors, same-origin
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			...( method == 'POST' && { body: JSON.stringify( data ), } )
		});
		setTimeout( setSpiner, 2000, 'none' );
		if( response.status != 200 )
			return false;
		
		if( response.status == 200 ){

			if( method == 'GET' )
				return response.json(); // parses JSON response into native JavaScript objects
			
			if( method == 'POST' )
				return true;

		}
	}

	// Backend url 
	// const base_api_url	= 'http://localhost/diamta/projects/public/index.php/api/'; 	// dev
	const base_api_url		= 'https://diamta.com/projects/public/index.php/api/'	// prod
	
	// get project categories
	const getCategory = async () => {
		const url		= base_api_url +  'category/list';
		const data 		= {};
		const method	= 'GET';
		
		const categories = await fetchData( url, data, method );

		return categories;
		
	}

	// get sent projects
	const getSentProjects = async ( userId ) => {
		const url		= base_api_url +  'project/sent/?userId=' + userId;
		const data 		= {};
		const method	= 'GET';
		
		const projects = await fetchData( url, data, method );

		return projects;

	}

	// get saved project
	const getSavedProjects =  async ( userId ) => {
		const url		= base_api_url +  'project/saved/?userId=' + userId;
		const data 		= {};
		const method	= 'GET';

		const projects = await fetchData( url, data, method );
		
		return projects;

	}

	// get received project
	const getReceivedProjects =  async ( userId ) => {
		const url		= base_api_url +  'project/received/?userId=' + userId;
		const data 		= {};
		const method	= 'GET';

		const projects = await fetchData( url, data, method );
		
		return projects;

	}

	// get project's data
	const getProject = async ( projectId, projectStatus, userId ) => {

		const url		= base_api_url +  'project/getProject/?projectId=' + projectId + '&projectStatus=' + projectStatus + '&userId=' + userId;
		const data 		= {};
		const method	= 'GET';
		
		const projects = await fetchData( url, data, method );

		return projects;

	}

	// check is the user id the project owner
	const isOwner = async ( userId, projectId ) => {
		const url		= base_api_url +  'project/isOwner/?projectId=' + projectId + '&userId=' + userId;
		const data 		= {};
		const method	= 'GET';
		
		const resp = await fetchData( url, data, method );

		return resp;
	}

	// check is the user id the project owner
	const getProjectStatus = async ( projectId ) => {
		const url		= base_api_url +  'project/getStatus/?projectId=' + projectId;
		const data 		= {};
		const method	= 'GET';
		
		const resp = await fetchData( url, data, method );

		return resp;
	}


	// get sent invitation
	const getSentInvitations = async ( userId ) => {

		const url		= base_api_url +  'all/invitations/?userId=' + userId;
		const data 		= {};
		const method	= 'GET';
		
		const invitations = await fetchData( url, data, method );

		return invitations;

	}

	// get a project invitation
	const getProjectInvitations = async ( userId, projectId ) => {

		const url		= base_api_url +  'project/invitations/?userId=' + userId + '&projectId=' + projectId;
		const data 		= {};
		const method	= 'GET';
		
		const invitations = await fetchData( url, data, method );

		return invitations;

	}

	// get project types
	const getType = async () => {
		const url		= base_api_url +  'type/list';
		const data 		= {};
		const method	= 'GET';
		
		const types = await fetchData( url, data, method );

		return types;
		
	}

	// get project duration
	const getDuration = async () => {
		const url		= base_api_url +  'duration/list';
		const data 		= {};
		const method	= 'GET';
		
		const durations = await fetchData( url, data, method );

		return durations;
		
	}

	// update User Project Status
	const updateUserProjectStatus = async ( userId, userEmail ) => {
		const url		= base_api_url +  'project/update/userProjectStatus/?userId=' + userId + '&userEmail=' + userEmail;
		const data 		= {};
		const method	= 'GET';

		const resp = await fetchData( url, data, method );

		return resp;
	}

	// post a project with files
	const postProject = async ( dataObj, fileList ) => {
		const formData = new FormData();
		// Append files
		fileList.forEach( ( file ) => {
			formData.append('files[]', file.originFileObj)
		});

		// Append data
		for ( var key in dataObj ) 
			formData.append(key, dataObj[key]);

// for (var key of formData.entries()) {
	// console.log( 'key0 --> ' + key[0] + ', key1 --> ' + key[1]);
// }
		// You can use any AJAX library you like
		const resp = await fetch( base_api_url +  'project/save', {
			method: 'POST',
			body: formData,
		})
		
		
		return resp.json();
	};

	const backendServer = 'http://localhost/diamta/projects/public';
	
	// send an invitation
	const invitationResend = async ( projectId, email ) => {
		const url		= base_api_url +  'invitation/resend/?projectId=' + projectId + '&email=' + email;
		const data 		= {};
		const method	= 'GET';
		
		const projects = await fetchData( url, data, method );

		return projects;
	}

	return (	
	
		<ProjectContext.Provider 
			value={{ 
				getCategory,
				getType,
				getDuration,
				postProject,
				getProject,
				getSentProjects,
				getSavedProjects,
				getReceivedProjects,
				getSentInvitations,
				getProjectInvitations,
				isOwner,
				getProjectStatus,
				backendServer,
				updateUserProjectStatus,
				invitationResend
			}}
		>
		
			<Space
				style={{ display: spiner }}
			>
				<Spin
					indicator={
						<LoadingOutlined
							style={{
									display:		spiner,
									fontSize: 		100,
									color: 			'#fcb800'
								}}
							spin
						/>
					}
					fullscreen
					tip		= "chargement" 
					size	= "large"
			/>
			
		</Space>

		{children}

		</ProjectContext.Provider>

	);
	
	
	
};

ProjectProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
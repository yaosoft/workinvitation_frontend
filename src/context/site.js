import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import { Space, Spin, Button, notification, message, Popconfirm, Radio, Flex, DatePicker, Image, Upload } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined,
	InboxOutlined, 
	QuestionCircleOutlined
} from '@ant-design/icons';
export const SiteContext = createContext();


export const SiteProvider = ({ children }) => {

	// const base_api_url	= 'http://localhost/diamta/projects/public/index.php/api/'; 
	// const base_api_url	= 'https://diamta.com/projects/public/index.php/api/'
	const base_api_url	= 'https://backend.workinvitation.com/index.php/api/'

	// spiner
	const [ spiner, setSpiner ] = useState( 'none' );

	// helper: Fetch data definition
	async function fetchData( url, data, method, spiner ) {
		if( !isOnline ){
			message.error( 'No network!' );
			return false;
		}
		
		if( spiner )
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
			return response.json(); // parses JSON response into native JavaScript objects
			// if( method == 'GET' )
				// return response.json(); // parses JSON response into native JavaScript objects
			
			// if( method == 'POST' )
				// return true;

		}
	}
	
	// site
	const [ site, setSite ] = useState( {} );

	// set user referrer before redirection to login page
	const setReferrer = ( url ) => {
		site[ 'referrer' ] = url;
	}
	
	// get user referrer
	const getReferrer = () => {

		return site.referrer;
	}
	
	// Backend url
	const siteURL = 'http://localhost/diamta/projects/public/'; // dev
	// const siteURL = 'https://diamta.com/projects/public/';	// prod
	
	
	// contact to invite
	const [ contact, setContact ] = useState( {} );

	// contact for contact list
	const [ contactsListContacts, setContactsListContacts ] = useState( [] );
	const [ contactsListContact, setContactsListContact ] = useState( {} );
	
	// contacts
	const [ contacts, setContacts ] = useState( [] );

	// get existing contact to invite
	const getContacts = async () => {

		const url		= base_api_url + 'contacts/existing';
		const data 		= {};
		const method	= 'GET';

		const contacts = await fetchData( url, data, method );

		return contacts;

	}

	// create contact list
	const contactsListSave = async ( data ) => {
		const url 		= base_api_url +  'contactsList/edit';
		const method 	= 'POST';
		const resp 		= await fetchData( url, data, method );

		return resp.id;
	}

	// save contact list contacts
	const contactsListContactsSave = async ( data ) => {
		const url 		= base_api_url +  'contactsList/contacts/save';
		const method 	= 'POST';
		const resp 		= await fetchData( url, data, method );

		return resp;
	}

	// get all user contacts lists
	const getContactsLists = async ( userId ) => {
		const url 		= base_api_url +  'contactsLists/get/?userId=' + userId;
		const method 	= 'GET';
		const data		= {};
		
		const resp 		= await fetchData( url, data, method );
		return resp;
	}

	// get a contacts list data
	const getContactsList = async ( contactsListId ) => {
		const url 		= base_api_url + 'contactsList/get/?contactsListId=' + contactsListId;
		const method 	= 'GET';
		const data 		= {};
		const resp 		= await fetchData( url, data, method );

		return resp;
	}

	// get contacts list's contacts
	const getContactsListContacts = async ( contactsListId ) => {
		const url 		= base_api_url + 'contacts/get/?contactsListId=' + contactsListId;
		const method 	= 'GET';
		const data 		= {};
		const resp 		= await fetchData( url, data, method );
		return resp;
	}

	// Get user profile
	const userProfileGet = async ( userId ) => {
		const url 		= base_api_url + 'profile/get/?userId=' + userId;
		const method 	= 'GET';
		const data 		= {};
		const resp 		= await fetchData( url, data, method );
		return resp;
	}

	// save user profile
	const userProfileSave = async ( dataObj, picture ) => {
		const url 		= base_api_url +  'profile/save';
		const method 	= 'POST';
		// const resp 		= await fetchData( url, data, method );

		const formData = new FormData();
		
		// Append file
		formData.append('files[]', picture.originFileObj)

		// Append data
		for ( var key in dataObj ) 
			formData.append( key, dataObj[key] );

		// You can use any AJAX library you like
		const resp = await fetch( url, {
			method: 'POST',
			body: formData,
		})

		return resp;
	}

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

	// save user password
	const passwordSave = async ( data ) => {
		const url 		= base_api_url +  'password/save';
		const method 	= 'POST';
		const resp 		= await fetchData( url, data, method );

		return resp;
	}

	// save user profile
	const getCurrentPassword = async ( userId ) => {
		const url 		= base_api_url + 'password/get/?userId=' + userId;
		const method 	= 'GET';
		const data 		= {};
		const resp 		= await fetchData( url, data, method );
		return resp;
	}

	// password forgot
	const passwordForgot = async ( data ) => {
		const url 		= base_api_url + 'password/forgot/?email=' + data.email + '&code= ' + data.code;
		const method 	= 'GET';
		const resp 		= await fetchData( url, data, method );

		return resp;
	}

	// password update
	const passwordUpdate =  async ( userId, password ) => {

		const url 		= base_api_url + 'password/update/?userId=' + userId + '&password=' + password;
		const method 	= 'GET';
		const data 		= {};
		const resp 		= await fetchData( url, data, method );
		return resp;
	}
	// password update
	const passwordCheck =  async ( userId, password ) => {

		const url 		= base_api_url + 'password/check/?userId=' + userId + '&password=' + password;
		const method 	= 'GET';
		const data 		= {};
		const spiner	= false;
		const resp 		= await fetchData( url, data, method, spiner );
		return resp;
	}	

	// websocket
// if (navigator.onLine) {
  // alert('online');
// } else {
  // alert('offline');
// }
	var mySocket  = new WebSocket('wss://www.workinvitation.com/websocket');  
	window.addEventListener( 'online', (e) => {
		mySocket  = new WebSocket('wss://www.workinvitation.com/websocket'); 
		message.info( "You are online" );
		setIsOnline( true );
		console.log( "You are online" );
	});

	window.addEventListener( 'offline', (e) => {
		message.error( "You are not online" );
		setIsOnline( false );
		console.log( "You are offline" );
			
	})

	document.addEventListener( 'visibilitychange', function() {
		if( document.hidden ){
// alert( 'hidden' );			
			setIsTabReactivated( false );
			setIsTabActive( false )
		}
		else {
			setIsTabReactivated( true );
			setIsTabActive( true );
			setTimeout( updateFavicon, 1000, favicon )
			// updateFavicon( favicon );
		}
	});

	// Network state
	const [ isOnline, setIsOnline ] = useState( navigator.onLine );

	// Tab state
	const [ isTabReactivated, setIsTabReactivated ] = useState( false ); 

	// Is tab active
	const [ isTabActive, setIsTabActive ] = useState( true ); 

	// Update favicon
	const updateFavicon = ( iconLink ) => {
		const linkElement = document.querySelector('link[rel=icon]');
		linkElement.href = iconLink;
	};
	const faviconAlert = 'img/faviconAlert.png';
	const favicon = 'img/favicon.png';
	
	//
	const getOccupations = async () => {
		const url 		= base_api_url + 'profile/occupations/get';
		const method 	= 'GET';
		const data 		= {};
		const resp 		= await fetchData( url, data, method );

		return resp;
	}
	
	
	// Socket message
	const socketMessageInfo = {
		receiverId: '',
		senderId: '',
		message: '',
	}
	const [ socketMessage, setSocketMessage ] = useState( socketMessageInfo ); 
	
	return (

		<SiteContext.Provider 
			value={{ 
				setReferrer,
				getReferrer,
				contact,
				contactsListContacts,  
				contactsListContact,
				setContactsListContacts,
				getContactsListContacts,
				setContactsListContact,
				setContact,
				contacts,
				setContacts,
				siteURL,
				getContacts,
				contactsListSave,
				getContactsLists,
				getContactsList,
				contactsListContactsSave,
				userProfileGet,
				userProfileSave,
				passwordSave,
				getCurrentPassword,
				passwordForgot,
				passwordUpdate,
				mySocket,
				isOnline,
				isTabReactivated,
				isTabActive,
				updateFavicon,
				faviconAlert,
				socketMessage, 
				setSocketMessage,
				getOccupations,
				passwordCheck
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
					tip		= "loading" 
					size	= "large"
			/>
			
		</Space>

		{children}

		</SiteContext.Provider>

	);

};

SiteProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
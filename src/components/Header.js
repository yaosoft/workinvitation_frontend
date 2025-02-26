import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import SecuredPagesAuth from "./SecuredPagesAuth";
import { AuthContext } from "../context/AuthProvider";
import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

import { ChatContext } from '../context/Chat';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import '../sidebarOverrides.css';
import '../chatStyles.css';

import ModalChatBox from './ModalChatBox';

import '../modalOverrides.css';
import '../chatStylesOverrides.css';
import '../headerOverrides.css';
import { SiteContext } from '../context/site';

const Header = ( params ) => {

	const { isAuthenticated, logOut, getUser, setUser } = useContext( AuthContext );
	const navigate = useNavigate();
	
	const userId = getUser().userId;
	
	const { 
		siteURL, 
		mySocket,
		faviconAlert,
		isTabActive,
		updateFavicon
	} = useContext( SiteContext );
	
	const { 
		userUnreadMessages,
		getUserUnreadMessages,
		setUserUnreadMessages,
		getMessages, // get project messages
		projectMessages, 
		setProjectMessages,
		currentIntervalId,
	} = useContext( ChatContext );

	// Message alert
	const [ messageAlertExpanded, setMessageAlertExpanded ] = useState( false );
	const handleClickMessageAlertExpanded = ( event ) => {
		resetAllSelects();
		setMessageAlertExpanded( !messageAlertExpanded );
	}

	// Alert
	const [ alertExpanded, setAlertExpanded ] = useState( false );
	const handleClickAlertExpanded = ( event ) => {
		resetAllSelects(); 
		setAlertExpanded( !alertExpanded ); 
	}

	// language
	const [ languageExpanded, setLanguageExpanded ] = useState( false );
	const handleClickLanguageExpanded = ( event ) => {
		resetAllSelects(); 
		setLanguageExpanded( !languageExpanded ); 
	}

	// user
	const [ userExpanded, setUserExpanded ] = useState( false );
	const handleClickUserExpanded = ( event ) => {
		resetAllSelects(); 
		setUserExpanded( !userExpanded ); 
	}

	// Reset all selects
	const resetAllSelects = () => {
		setMessageAlertExpanded( false );
		setAlertExpanded( false );
		setLanguageExpanded( false ); 
		setUserExpanded( false );
	}	
	
	// Login / logout
	const handleClickLogInOut = async( event ) => {
		event.preventDefault();
		if( isAuthenticated() ){
			// const resp = await logOut();
			// if( resp !== true  ){
				// message.error( resp );
				// return;
			// }
			setUser( null );
			
		}

		navigate( '/login' )
	}

	// User unread message
	const [ totalUnread, setTotalUnread ] = useState( 0 );
	useEffect( () => {
		// 
		const getUnread = async () =>{
			const unreadMessages = await getUserUnreadMessages( userId );
// console.log( 'unreadMessages', unreadMessages );
			if( unreadMessages ){
				setUserUnreadMessages( unreadMessages );
				const total = unreadMessages.length;
				setTotalUnread( total )
			}
			else{
console.log( 'Unable to get unreadMessages', unreadMessages );	
			}
		}
		getUnread();
		// setInterval( getUnread, 15000 );
		
		// websoket message listener

		
		mySocket.onmessage = async function(e) {
			const wssmsg = e.data;
// alert( wssmsg );
			const senderId = wssmsg.split( '*' )[ 0 ];
			const receiverId = wssmsg.split( '*' )[ 1 ];

			if( receiverId == userId ){

// alert( 'receiverId == userId' );
// alert( '!isTabActive: ' + isTabActive );
				if( !isTabActive ){
// alert( '!isTabActive' );
					updateFavicon( faviconAlert )
				}

				await getUnread();
			}
		}

	}, [isTabActive] );
	

	
	// Open a chatbox dialog
	const [ isOwner, setIsOwner ] 						= useState( '' );
	const [ project, setProject ] 						= useState( '' );
	const [ messageReceiverId, setMessageReceiverId ] 	= useState( '' );
	const [ messageUserId, setMessageUserId ] 			= useState( '' );
	const [ messageId, setMessageId ] 					= useState( '' );
	const handleClickOpenDialog = async ( messageSenderId, project, isOwner, themessageId ) => { 

		// If the element is already on the page, just scroll down to it
		var elt = '';
		if( window.document.getElementById( 'text_' + themessageId ) )
			elt = window.document.getElementById( 'text_' + themessageId )
		else if( window.document.getElementById( 'file_' + themessageId ) )
			elt = window.document.getElementById( 'file_' + themessageId )

		if( elt ){
			elt.scrollIntoView( { behavior: "smooth", block: "end", inline: "nearest" } );
			return
		}
		
		// open the chatbox modal
		setMessageReceiverId( messageSenderId );		// inversion: sender will be receiver and receiver will be sender
		setMessageUserId( userId );
		setMessageId( themessageId );
		
		setIsOwner( isOwner );
		setProject( project );
		const messages = await getMessages( userId, project.id );
		setProjectMessages( messages );
// console.log( 'userId', userId );		
// console.log( 'project.id', project.id );	
// console.log( '>>> messages >>>', messages );

		setOpenModalChatBox( true );
	}
	
	// chat modal
	const [ openModalChatBox, setOpenModalChatBox ] = useState(false);
	const onOpenModalChatBox  	= () => setOpenModalChatBox(true);
	const onCloseModalChatBox 	= async () => {
console.log( 'currentIntervalId', currentIntervalId );
// alert( 'clearInterval' );
		// await window.clearInterval( currentIntervalId );
		setOpenModalChatBox(false)
	};
	
	// truncate string
	const truncateString = ( str, maxLength ) => {
		if (str.length > maxLength) {
			return str.slice(0, maxLength - 3) + '...';
		}
		return str;
	}

	
	//
	const BuildUnreadMessageSender = () =>{ return ( 
		userUnreadMessages.map( message =>
			<li className="notification-unread">
				<a style={{ cursor: 'pointer' }} onClick = { e => handleClickOpenDialog( message.senderId, message.project, message.isOwner, message.messageId ) } >
					<img className="float-left mr-3 avatar-img" src="./img/avatar/1.jpg" alt=""/>
					<div className="notification-content">
						<div className="notification-heading">{ message.senderName }</div>
						<div className="notification-timestamp">{ message.displayDate }</div>
						<div className="notification-text">{ message.messageText ? truncateString( message.messageText, 45 ) : truncateString( message.messageFileName, 45 ) }</div>
					</div>
				</a>
			</li>
		)
	)}

	return (
		<>
		<SecuredPagesAuth />
		<Modal open={ openModalChatBox } onClose={ onCloseModalChatBox } center>
			<ModalChatBox params =
				{{
					messageId:			messageId,
					project: 			project,
					isOwner: 			isOwner,
					messageReceiverId: 	messageReceiverId,
					messageUserId: 		messageUserId,

				}}
			/>
		</Modal>
		<div className="header">
					<div className="header-content clearfix">
						
						<div className="nav-control">
							<div className="hamburger">
								<span className="toggle-icon"><i className="icon-menu"></i></span>
							</div>
						</div>
						<div className="header-left">
							<div className="input-group icons">
								<div className="input-group-prepend">
									<span className="input-group-text bg-transparent border-0 pr-2 pr-sm-3" id="basic-addon1"><i className="mdi mdi-magnify"></i></span>
								</div>
								<input type="search" className="form-control" placeholder="Search a Project" aria-label="Search Dashboard" />
								<div className="drop-down animated flipInX d-md-none">
									<form action="#">
										<input type="text" className="form-control" placeholder="Search" />
									</form>
								</div>
							</div>
						</div>
						<div className="header-right">
							<ul className="clearfix">
								<li className="icons dropdown">
									<Link 
										onClick 	= { e => handleClickMessageAlertExpanded( e ) }
									>
										<i className="mdi mdi-email-outline"></i>
										<span className="badge badge-pill gradient-1">{ totalUnread > 10 ? '+10' : totalUnread }</span>
									</Link>
									<div 
										className="drop-down animated fadeIn dropdown-menu" 
										style={{ display: messageAlertExpanded ? 'block' : 'none' }}
									>
										<div className="dropdown-content-heading d-flex justify-content-between">
											<span className="">{ totalUnread } New Messages</span>  
											<a href="javascript:void()" className="d-inline-block">
												<span className="badge badge-pill gradient-1">{ totalUnread }</span>
											</a>
										</div>
										<div className="dropdown-content-body" style={{ height: '250px', overflowY: 'auto' }}>
											<ul>
												<BuildUnreadMessageSender />
											</ul>
										</div>
									</div>
								</li>
								<li className="icons dropdown">
									<Link 
										onClick = { e => handleClickAlertExpanded( e ) }
									>
										<i className="mdi mdi-bell-outline"></i>
										<span className="badge badge-pill gradient-2">0</span>
									</Link>
									<div 
										style={{ display: alertExpanded ? 'block' : 'none' }}
										className="drop-down animated fadeIn dropdown-menu dropdown-notfication"
									>
										<div className="dropdown-content-heading d-flex justify-content-between">
											<span className="">2 New Notifications</span>  
											<a href="javascript:void()" className="d-inline-block">
												<span className="badge badge-pill gradient-2">5</span>
											</a>
										</div>
										<div className="dropdown-content-body">
											<ul>
												<li>
													<a href="javascript:void()">
														<span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span>
														<div className="notification-content">
															<h6 className="notification-heading">Events near you</h6>
															<span className="notification-text">Within next 5 days</span> 
														</div>
													</a>
												</li>
												<li>
													<a href="javascript:void()">
														<span className="mr-3 avatar-icon bg-danger-lighten-2"><i className="icon-present"></i></span>
														<div className="notification-content">
															<h6 className="notification-heading">Event Started</h6>
															<span className="notification-text">One hour ago</span> 
														</div>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</li>
								<li className="icons dropdown d-none d-md-flex">
									<Link 
										className 	= "log-user"  
										onClick 	= { handleClickLanguageExpanded }
									>
										<span>English</span>  
										<i className="fa fa-angle-down f-s-14" aria-hidden="true"></i>
									</Link>
									<div className="drop-down dropdown-language animated fadeIn  dropdown-menu" style={{ display: languageExpanded ? 'block' : 'none' }}>
										<div className="dropdown-content-body">
											<ul>
												<li><a href="javascript:void()">English</a></li>
											</ul>
										</div>
									</div>
								</li>
								<li className="icons dropdown">
									<div 
										className	= "user-img c-pointer position-relative"  
										onClick 	= { e => handleClickUserExpanded( e ) }
									>
										<span className="activity active"></span>
										<img src="./img/user/1.png" height="40" width="40" alt=""/>
									</div>
									<div 
										style = {{ display: userExpanded ? 'block' : 'none' }}
										className = "drop-down dropdown-profile animated fadeIn dropdown-menu"
									>
										<div className="dropdown-content-body">
											<ul>
												<li>
													<a href="app-profile.html"><i className="icon-user"></i> <span>Profile</span></a>
												</li>
												<li>
													<a href="javascript:void()">
														<i className="icon-envelope-open"></i> <span>Inbox</span> <div className="badge gradient-3 badge-pill gradient-1">3</div>
													</a>
												</li>
												<hr className="my-2" />
												<li>
													{ isAuthenticated() ? getUser().userEmail : '' }
												</li>
												<li>
													<Link onClick={ e => handleClickLogInOut( e ) }>
														<i className="icon-key"></i> <span>{ isAuthenticated() ? 'Logout' : 'Login' }</span>
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
		</>
	);
};

export default Header;

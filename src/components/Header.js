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

const Header = ( params ) => {

	const { isAuthenticated, logOut, getUser } = useContext( AuthContext );

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
	const navigate = useNavigate();
	const handleClickLogInOut = async( event ) => {
		event.preventDefault();
		if( isAuthenticated() ){
			const resp = await logOut();
			if( resp !== true  ){
				message.error( resp );
				return;
			}
			
		}
		

		navigate( '/login' )
	}
	
	return (
		<>
		<SecuredPagesAuth />
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
										<span className="badge badge-pill gradient-1">3</span>
									</Link>
									<div 
										className="drop-down animated fadeIn dropdown-menu" 
										style={{ display: messageAlertExpanded ? 'block' : 'none' }}
									>
										<div className="dropdown-content-heading d-flex justify-content-between">
											<span className="">3 New Messages</span>  
											<a href="javascript:void()" className="d-inline-block">
												<span className="badge badge-pill gradient-1">3</span>
											</a>
										</div>
										<div className="dropdown-content-body">
											<ul>
												<li className="notification-unread">
													<a href="javascript:void()">
														<img className="float-left mr-3 avatar-img" src="./img/avatar/1.jpg" alt=""/>
														<div className="notification-content">
															<div className="notification-heading">Saiful Islam</div>
															<div className="notification-timestamp">08 Hours ago</div>
															<div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
														</div>
													</a>
												</li>
												<li className="notification-unread">
													<a href="javascript:void()">
														<img className="float-left mr-3 avatar-img" src="./img/avatar/2.jpg" alt=""/>
														<div className="notification-content">
															<div className="notification-heading">Adam Smith</div>
															<div className="notification-timestamp">08 Hours ago</div>
															<div className="notification-text">Can you do me a favour?</div>
														</div>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</li>
								<li className="icons dropdown">
									<Link 
										onClick = { e => handleClickAlertExpanded( e ) }
									>
										<i className="mdi mdi-bell-outline"></i>
										<span className="badge badge-pill gradient-2">3</span>
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

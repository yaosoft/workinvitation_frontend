import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

import { AuthContext } from "../../context/AuthProvider";
import { SiteContext } from "../../context/site";

const Login = ( params ) => {
	// context
	const { logIn, setUser }	= useContext( AuthContext );
	const { getReferrer }		= useContext( SiteContext );
	

	const [ loginSpin, setLoginSpin ] = useState( 'none' );

		// login email
	const [ loginEmail, setLoginEmail ] = useState( '' );
	const handleChangeLoginEmail = ( e ) => {	
		setLoginEmail( e.target.value );
	}

	// login password
	const [ loginPassword, setLoginPassword ] = useState( '' );
	const handleChangeLoginPassword = ( e ) => {	
		setLoginPassword( e.target.value );
	}

	// Email regex
	const regexEmailValidation = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/; 

	// 
	const navigate = useNavigate();
	const handleClickLogin = async ( event ) => {
		
		event.preventDefault();
		
		// spin
		setLoginSpin( 'block' );

		if( !loginEmail ){
			message.error( 'Email address is missing.' );
			setLoginSpin( 'none' );
			return
		}

		if( !regexEmailValidation.test( loginEmail ) ) {
			message.error( 'Email address is not valide.' );
			setLoginSpin( 'none' );
			return
		}
		// validation registration password
		if( !loginPassword ){
			message.error( 'Type a password please.' );
			setLoginSpin( 'none' );
			return
		}
		// if( isValidPassword( loginPassword ) !== true ) {
			// message.error( 'Password must have 6 to 100 characters, upper and lower case letters and at least one number.', [6] );
			// return
		// }
		
		// Post
		const base_api_url	= 'http://localhost/diamta/projects/public/index.php/api/'; 
		// const base_api_url		= 'https://diamta.com/projects/public/index.php/api/'

		const loginApiURL = base_api_url + 'user/login';
		const method 	= 'POST';
		const loginData = {
			password: 	loginPassword,
			email: 		loginEmail
		};
		
		const respJson = await postData( loginApiURL, loginData, method );

		// Login error
		if( respJson.status !== 200 ){
			// stop login button's spin
			setLoginSpin( 'none' );
			message.error( respJson.statusText );
			
			return
		}
		
		const user = {
			userEmail: 	loginEmail,
			userId: 	await respJson.json(),
		}


		// stop login button's spin
		setLoginSpin( 'none' );

		// Frontend login
		logIn( user );	
		
		// goto validation
		const path	= getReferrer() ? getReferrer() : '/project/received';

		navigate( path );
	}
	

	useEffect(() => {
		setUser( null );
		setLoginSpin( 'none' );
	}, []);

	// post data definition
	async function postData( url, data, method ) {
		const response = await fetch( url, {
			method: method, // *GET, POST, PUT, DELETE, etc.
			// mode: "no-cors", // no-cors, *cors, same-origin
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify( data ), // body data type must match "Content-Type" header
		});
		// if( response.status !== 200 ){
			// return false;
		// }
		// else{
			// return response.json(); // parses JSON response into native JavaScript objects
		// }
		return response;
	}
	
	
	return (
		<>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
			<div class="login-form-bg h-100">
				<div class="container h-100">
					<div class="row justify-content-center h-100">
						<div class="col-xl-6">
							<div class="form-input-content">
								<div class="card login-form mb-0">
									<div class="card-body pt-5">
										<h4 class="text-center">Login</h4>
										<form class="mt-5 mb-5 login-input">
											<div class="form-group">
												<input 
													onChange 	= {handleChangeLoginEmail}
													value 		= {loginEmail}
													className	= "form-control" 
													type		= "email" 
													placeholder = "Email" 
												/>
											</div>
											<div class="form-group">
												<input 
													onChange	= {handleChangeLoginPassword}
													value 		= {loginPassword} 
													className	= "form-control"
													type		= "password" 
													placeholder	= "Password" 
												/>
												<Link to='/password/forgot'>Password Forgot?</Link>
											</div>
											
											<button 
												class	= "btn login-form__btn submit w-100"
												onClick	= {handleClickLogin}
											>
												<Space>
													<Spin
														indicator={
															<LoadingOutlined
																style={{
																	fontSize: 		20,
																	marginRight: 	'10px',
																	display:		loginSpin,
																	color: 			'wheat',
																}}
																spin
															/>
														}
													/>
												</Space>
												Sign in
											</button>
										</form>
										<p class="mt-5 login-form__footer">Dont have account? <Link to="/registration" class="text-primary">Sign Up</Link> now</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login; 

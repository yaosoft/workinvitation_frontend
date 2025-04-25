import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { AuthContext } from "../../context/AuthProvider";
import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const RegistrationEmailExist = ( params ) => {

	const { isValidPassword }	= useContext( AuthContext );
	const [ subscribeSpin, setSubscribeSpin ] 	= useState( 'none' );

	// subscribe email
	const [ subscribeEmail, setSubscribeEmail ] = useState( '' );
	const handleChangeSubscribeEmail = ( e ) => {	
		setSubscribeEmail( e.target.value );
	}
	
	// subscribe password
	const [ subscribePassword, setSubscribePassword ] = useState( '' );
	const handleChangeSubscribePassword = ( e ) => {	
		setSubscribePassword( e.target.value );
	}
		

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
		if( response.status !== 200 ){
			return false;
		}
		else{
			return response.json(); // parses JSON response into native JavaScript objects
		}
	}
	
	
	// Email regex
	const regexEmailValidation = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/; 
	// const regexPasswordValidation = /(\d+[a-zA-Z!\*\-\+&éàçè\'\(\)ç]*){6,100}/

	// click
	const navigate = useNavigate();
	const handleClickRegistration = async ( event ) => {
		
		event.preventDefault();
		
		// spin
		setSubscribeSpin( 'block' );

		if( !subscribeEmail ){
			message.error( 'Email address is missing.' );
			return
		}

		if( !regexEmailValidation.test( subscribeEmail ) ) {
			message.error( 'Email address is not valide.' );
			return
		}
		// validation registration password
		if( !subscribePassword ){
			message.error( 'Type a password please.' );
			return
		}
		if( isValidPassword( subscribePassword ) !== true ) {
			message.error( 'Password must have 6 to 100 characters, upper and lower case letters and at least one number.', [6] );
			return
		}
		
		// Post
		// const base_api_url	= 'http://localhost/diamta/projects/public/index.php/api/'; 
		// const base_api_url		= 'https://diamta.com/projects/public/index.php/api/'
		const base_api_url	= 'https://backend.workinvitation.com/index.php/api/'
		const signupApiURL = base_api_url + 'user/registration';


		const method = 'POST';
		const subscribeData = {
			password: 	subscribePassword,
			email: 		subscribeEmail
		};
		
		const resp = await postData( signupApiURL, subscribeData, method );
		if( !resp ){
			setSubscribeSpin( 'none' );
			message.error( 'User already exists' );
			return
		}
		
		// goto validation
		const validationPath	= '/login';
					
		navigate( validationPath );
	}

	useEffect(() => {
		setSubscribeSpin( 'none' );
	}, []);

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
										<h4 class="text-center">Registration</h4>
										<form class="mt-5 mb-5 login-input">
											<div class="form-group">
												<input 
													onChange 	= {handleChangeSubscribeEmail}
													value 		= {subscribeEmail}
													className	= "form-control" 
													type		= "email" 
													placeholder = "Email" 
												/>
											</div>
											<div class="form-group">
												<input 
													onChange	= {handleChangeSubscribePassword}
													value 		= {subscribePassword} 
													className	= "form-control"
													type		= "password" 
													placeholder	= "Password" 
												/>
											</div>
											<button 
												class	= "btn login-form__btn submit w-100"
												onClick	= {handleClickRegistration}
											>
											<Space>
												<Spin
													indicator={
														<LoadingOutlined
															style={{
																fontSize: 		20,
																marginRight: 	'10px',
																display:		subscribeSpin,
																color: 			'wheat',
															}}
															spin
														/>
													}
												/>
											</Space>
												Sign up
											</button>
										</form>
										<p class="mt-5 login-form__footer">
											Have account <Link to='/Login' class="text-primary">Login</Link> now
										</p>
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

export default RegistrationEmailExist;

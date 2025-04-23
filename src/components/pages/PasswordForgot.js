import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import HeaderHome from '../HeaderHome';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { Modal } from 'react-responsive-modal';

import { Space, Spin, Button, notification, message, Popconfirm, Radio, Flex, DatePicker, Upload } from 'antd';

import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined,
	InboxOutlined, 
	QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Input, Select } from 'antd';

import { SiteContext } from '../../context/site';

import ModalPasswordForgot from '../ModalPasswordForgot';

const PasswordForgot = ( params ) => {

	const { passwordForgot } = useContext( SiteContext );
	const [ loginSpin, setLoginSpin ] = useState( 'none' );
	
	// 
	const [ email, setEmail ] = useState( '' );
	const handleChangeEmail = ( e ) => {

		const data = e.target.value;
		setEmail( data );
	}

	// 
	const [ userId, setUserId ] = useState( '' );

	//
	const [ code, setCode ] = useState( Math.floor(Math.random()*90000) + 10000 );

	//
	const handleClickBtnSave = async( e ) => {
		e.preventDefault();
		// validation registration password
		if( !email ){
			message.error( 'Type your email please.' );
			// setSubscribeSpin( 'none' );
			return
		}

		const data = {
			email:	email,
			code: code
		}
		
		// spin
		setLoginSpin( 'block' );
		const rep = await passwordForgot( data );
		if( !rep ){
			message.error( 'email not found' );
		}
		else{
			message.success( 'Type the code you received please' )
			setOpenModalPasswordForgot( true )
			setUserId( rep );
		}		
		setLoginSpin( 'none' );
	}

	// Password forgot modals
	const [ openModalPasswordForgot, setOpenModalPasswordForgot ] = useState( false );
	const onOpenModalPasswordForgot  = () => setOpenModalPasswordForgot( true );
	const onCloseModalPasswordForgot = () => setOpenModalPasswordForgot( false );

	// get the data
	useEffect( () => {
		
	}, [] );


	return (
	<>
		<Modal open={ openModalPasswordForgot } onClose={ onCloseModalPasswordForgot } center>
			<ModalPasswordForgot params =
				{{
					code: 		code,
					userId: 	userId
				}}
			/>
		</Modal>
		<HeaderHome />
			<div class="login-form-bg h-100">
				<div class="container h-100">
					<div class="row justify-content-center h-100">
						<div class="col-xl-6">
							<div class="form-input-content">
								<div class="card login-form mb-0">
									<div class="card-body pt-5">
										<h4 class="text-center">Password forgot</h4>
										<span>Type your email you will receive a code to reset your password.</span>
										<form class="mt-5 mb-5 login-input">
											<div class="form-group">
												<input 
													type		= "email" 
													className	= "form-control" 
													placeholder	= "Your Email"
													value		= { email }
													onChange	= { e => handleChangeEmail( e ) }
												/>
											</div>
											<button 
												class	= "btn login-form__btn submit w-100"
												onClick	= { e => handleClickBtnSave( e ) }
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
												Send
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
			<div>&nbsp;</div>
			<Footer />
		</>
	);
};

export default PasswordForgot;

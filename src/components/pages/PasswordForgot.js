import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
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
	const handleClickBtnSave = async() => {
		
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

		const rep = await passwordForgot( data );
		if( !rep ){
			message.error( 'email not found' );
		}
		else{
			message.success( 'Type the code you received please' )
			setOpenModalPasswordForgot( true )
			setUserId( rep );
		}		
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
		
				<Header />
				<Sidebar />	

				<div className="content-body">

            <div className="container-fluid mt-3">
                <div className="row">
                   <h3>Change your Password</h3> 
                </div>
				<div className="row">
					<div className="form-group">
						&nbsp;
					</div>
                </div>
				<div className="row">
					<div className="card">
                       <div className="card-body">
							Enter your email and we will send you a code to reset your password.
					   </div>
					</div>
				</div>
				<div className="row">
					<div className="card">
                       <div className="card-body">
							<input 
								type		= "email" 
								className	= "form-control bg-transparent" 
								placeholder	= "Your Email"
								value		= { email }
								onChange	= { e => handleChangeEmail( e ) }
							/>
							<p>&nbsp;</p>
							<p>&nbsp;</p>
							<Button
								className	= "btn btn-success"
								onClick		= { e => handleClickBtnSave( e ) }
							>
								Send
							</Button>
									
							</div>
						</div> 
					</div>
				</div>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
			</div>
			
			<Footer />
		</>
	);
};

export default PasswordForgot;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import HeaderHome from '../HeaderHome';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { Modal } from 'react-responsive-modal';
import { AuthContext } from '../../context/AuthProvider';

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

const PasswordForgotUpdate = ( params ) => {

	const { isValidPassword }	= useContext( AuthContext );
	const { passwordUpdate } 	= useContext( SiteContext );
	
	const [ password, setPassword  ] = useState( '' );

	// update password
	const [ email, setEmail ] = useState( '' );
	const navigate = useNavigate();
	const { getUser } = useContext( AuthContext );
	
	const updatePassword = async () => {
	
		if( isValidPassword( password ) !== true ) {
			message.error( 'Password must be 6 to 100 characters long, uppercase and lowercase letters, and at least one number.' );
			return
		}
		
		const rep = await passwordUpdate( userId, password );
		if( !rep ){
			message.error( 'Error' );
			return;
		}
		else{
			message.success( 'Password updated' );
			navigate( '/login' );
		}
	}

	// handle password Change
	const handleChangePassword = ( e ) => {
		const data = e.target.value;
		setPassword( data );
	}

	//
	const [searchParams, setSearchParams] = useSearchParams();

	// 
	const [ userId, setUserId ] = useState( '' );

	//
	const [ code, setCode ] = useState( Math.floor(Math.random()*90000) + 10000 );

	// get the data
	useEffect( () => {
		const id = searchParams.get( 'userId' );
		setUserId( id );
	}, [] );


	return (
		<>
		<HeaderHome />

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
							Enter your new password.
					   </div>
					</div>
				</div>
				<div className="row">
					<div className="card">
                       <div className="card-body">
							<input 
								type		= "password" 
								className	= "form-control bg-transparent" 
								placeholder	= "password"
								value		= { password }
								onChange	= { e => handleChangePassword( e ) }
							/>
							<p>&nbsp;</p>
							<p>&nbsp;</p>
							<Button
								className	= "btn btn-success"
								onClick		= { e => updatePassword( e ) }
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

export default PasswordForgotUpdate;

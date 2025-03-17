import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

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

import { AuthContext } from '../../context/AuthProvider';
import { SiteContext } from '../../context/site';

const ProfilePasswordEdit = ( params ) => {
	const [ painting, setPainting ] = useState( './img/paintings/0.jpg' );
	const [ loginSpin, setLoginSpin ] = useState( 'none' );
	const { getUser }	= useContext( AuthContext );
	const user_id 		= getUser().userId;
	const { getCurrentPassword, passwordSave, passwordCheck }	= useContext( SiteContext );

	const { isValidPassword } = useContext( AuthContext );
	const isValidPasswordRepeat = ( passwordRepeat ) => {
		if( newPassword == passwordRepeat )
			return true
		else
			return false
	}

	// 
	const [ currentPassword, setCurrentPassword ] = useState( '' );
	const [ currentPasswordError, setCurrentPasswordError ] = useState( '' );
	const handleChangeCurrentPassword = ( e ) => {
		const data = e.target.value;
		setCurrentPassword( data );
		
		var currentPasswordErrorText = '';
		if( data.length && data.length < 4 )
			currentPasswordErrorText = 'Your password seems incomplete'

		setCurrentPasswordError( currentPasswordErrorText );
	}


	//
	const [ newPassword, setNewPassword ] = useState( '' );
	const [ newPasswordError, setNewPasswordError ] = useState( '' );
	const handleChangeNewPassword = ( e ) => {
		const data = e.target.value;
		setNewPassword( data );
		
		var newPasswordErrorText = '';
		if( data.length && data.length < 4 )
			newPasswordErrorText = 'Your password seems incomplete'
		else if( isValidPassword( data ) !== true )
			newPasswordErrorText = 'Password must have more than 5 characters, upper and lower case letters and at least one number.';

			setNewPasswordError( newPasswordErrorText );
	}

	//
	const [ newPasswordRepeat, setNewPasswordRepeat ] = useState( '' );
	const [ newPasswordRepeatError, setNewPasswordRepeatError ] = useState( '' );
	const handleChangeNewPasswordRepeat = ( e ) => {
		const data = e.target.value;
		setNewPasswordRepeat( data );
		
		var newPasswordRepeatErrorText = '';
		if( !isValidPasswordRepeat( data ) )
			newPasswordRepeatErrorText = 'Password are different'

			setNewPasswordRepeatError( newPasswordRepeatErrorText );
	}
	
	// check the form
	const checkTheForm = async( ) => {

		var errorsExist = false;
		// validation registration password
		if( !currentPassword ){
			setCurrentPasswordError( 'Type your current password.' );
			errorsExist = true
		}
		if( !newPassword ){
			setNewPasswordError( 'Type your new password.' );
			errorsExist = true
		}
		if( !newPasswordRepeat ){
			setNewPasswordRepeatError( 'Repeat your new password.' );
			errorsExist = true
		}
		
		return errorsExist
	}

	//
	const handleClickSaveButton = async() => {

		// check the form
		const formError = await checkTheForm();	
		
		if( formError === true ){ // if errors exist in the form
			const errorsExistText = 'Please correct the errors and try again.';
			message.error( errorsExistText );
			return;
		}
		
		// old password check
		setLoginSpin( 'block' ); // spin
		const currentPasswordCheck = await passwordCheck( user_id, currentPassword );
		if( !currentPasswordCheck ){
			const errorsExistText = 'Current password is incorrect.';
			setCurrentPasswordError( errorsExistText );
			message.error( errorsExistText );
			setLoginSpin( 'none' ); // spin
			return;
		}
			
		// send data
		const data = {
			currentPassword:	currentPassword, 
			newPassword: 		newPassword,
			userId:   			user_id
		}
		const rep = await passwordSave( data );
		
		if( rep ){
			message.success( 'Password changed' )
		}
		else{
			message.error( 'Your current password is incorrect' )
		}
		
		setLoginSpin( 'none' ); // spin
	}

	// get the data
	useEffect( () => {
		const getData = async () => {
			// painting
			const paintings = [ 1, 2, 3 ];
			const rd = await Math.floor( Math.random() * paintings.length + 1 );
			if( painting == './img/paintings/0.jpg' )
			setPainting( './img/paintings/' + rd + '.jpg' );
			
			const userPassword = await getCurrentPassword( user_id );	// todo: get hashed password
console.log( '>>>> userPassword: ' + userPassword );
			setCurrentPassword( '' );
		}
		getData();
	}, [] );
	
	const [form] = Form.useForm();

	return (
		<>
			<Header />
			<Sidebar />	

			<div className="content-body">
			<Breadcrumbs />
            <div className="container-fluid mt-3">
                <div className="row" style={{ marginLeft: '10px' }}>
                   <h3>Change your password</h3> 
                </div>
				<div className="row">
					<div className="col-md-6 container-fluid">
						<Form 
							form = {form}
						>
							<div className="row">
								<Form.Item
									name  = "currentPassword"
									style = {{ marginBottom: '0px' }}
									rules = {[
										{
											message: currentPasswordError,
											validator: ( value ) => {
												if ( currentPasswordError ) {
													return Promise.reject(currentPasswordError);
												} 
												else {
													return Promise.resolve();
												}
											}
										}
									]}
									initialValue  = { currentPassword }
								>
									<input 
										type		= "password" 
										className	= "form-control " 
										placeholder	= "Current Password"
										value		= { currentPassword }
										onChange	= { e => handleChangeCurrentPassword( e ) }
										style 		= {{ width: '400px', height: '30px' }}
									/>
								</Form.Item>
							</div>
							<div className="row">
								&nbsp;
							</div>
							<div className="row">
								<Form.Item
									name  = "newPassword"
									style = {{ marginBottom: '0px' }}
									rules = {[
										{
											message: newPasswordError,
											validator: ( value ) => {
												if ( newPasswordError ) {
													return Promise.reject(newPasswordError);
												} 
												else {
													return Promise.resolve();
												}
											}
										}
									]}
									initialValue  = { newPassword }
								>
									<input 
										type		= "password" 
										className	= "form-control " 
										placeholder	= "New Password"
										value		= { newPassword }
										onChange	= { e => handleChangeNewPassword( e ) }
										style 		= {{ width: '400px', height: '30px' }}
									/>
								</Form.Item>
							</div>
							<div className="row">
								&nbsp;
							</div>
							<div className="row">
								<Form.Item
									name  = "newPasswordRepeat"
									style = {{ marginBottom: '0px' }}
									rules = {[
										{
											message: newPasswordRepeatError,
											validator: ( value ) => {
												if ( newPasswordRepeatError ) {
													return Promise.reject(newPasswordRepeatError);
												} 
												else {
													return Promise.resolve();
												}
											}
										}
									]}
									initialValue  = { newPasswordRepeat }
								>
									<input 
										type		= "password" 
										className	= "form-control " 
										placeholder	= "New Password"
										value		= { newPasswordRepeat }
										onChange	= { e => handleChangeNewPasswordRepeat( e ) }
										style 		= {{ width: '400px', height: '30px' }}
									/>
								</Form.Item>
							</div>
							
							<div className="row">
								<div className="form-group">
									<button 
										className 	= "btn mb-1 btn-primary btn-lg" 
										id			= "sendBtn" 
										onClick		= { e => handleClickSaveButton() }
										style		= {{
											width: '400px', 
											marginTop: '20px'
										}}
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
										Save
									</button>
									<br/>
									<span><Link to='/privacy'>Privacy</Link></span>
								</div>
							</div>
						</Form>
					</div>
					<div className="col-md-6 container-fluid" style={{textAlign: 'center'}}>
						<img src={ painting } style={{maxWidth: '50%'}} />
					</div>
				</div>
			</div>
		</div>
			<Footer />
		</>
	);
};

export default ProfilePasswordEdit;

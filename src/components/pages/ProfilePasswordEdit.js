import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

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

	const { getUser }	= useContext( AuthContext );
	const user_id 		= getUser().userId;
	const { getCurrentPassword, passwordSave }	= useContext( SiteContext );

	const { isValidPassword } = useContext( AuthContext );

	//
	const [ newPassword, setNewPassword ] = useState( '' );
	const handleChangeNewPassword = ( e ) => {
		const data = e.target.value;
		setNewPassword( data );
	}

	//
	const [ currentPassword, setCurrentPassword ] = useState( '' );
	const handleChangeCurrentPassword = ( e ) => {
		const data = e.target.value;
		setCurrentPassword( data );
	}

	//
	const handleClickBtnSave = async() => {
		
		// validation registration password
		if( !currentPassword ){
			message.error( 'Type your current password please.' );
			// setSubscribeSpin( 'none' );
			return
		}
		if( !newPassword ){
			message.error( 'Type your new password please.' );
			// setSubscribeSpin( 'none' );
			return
		}
		if( isValidPassword( newPassword ) !== true ) {
			message.error( 'Password must have 6 to 100 characters, upper and lower case letters and at least one number.', [6] );
			// setSubscribeSpin( 'none' );
			return
		}
		
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
	}

	// get the data
	useEffect( () => {
		const getData = async () => {
			const userPassword = await getCurrentPassword( user_id );
			setCurrentPassword( userPassword );
		}
		// getData();
	}, [] );


	return (
		<>
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
							<input 
								type		= "password" 
								className	= "form-control bg-transparent" 
								placeholder	= "Current Password"
								value		= { currentPassword }
								onChange	= { e => handleChangeCurrentPassword( e ) }
							/>
							<p>&nbsp;</p>
							<input 
								type		= "password" 
								className	= "form-control bg-transparent" 
								placeholder	= "New Password"
								value		= { newPassword }
								onChange	= { e => handleChangeNewPassword( e ) }
							/>
							<p>&nbsp;</p>
							<Button
								className	= "btn btn-success"
								onClick={ e => handleClickBtnSave( e ) }
							>
								save
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

export default ProfilePasswordEdit;

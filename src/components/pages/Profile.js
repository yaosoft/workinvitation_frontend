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

const Profile = ( params ) => {
	
	const { getUser }	= useContext( AuthContext );
	const user_id = getUser().userId;

	const { userProfileGet, userProfileSave }	= useContext( SiteContext );

	const [ userProfile, setUserProfile ] = useState( {} );
	

	const [ fullname, setFullname ] = useState( '' );
	const handleChangeFullname = ( e ) => {
		const data = e.target.value;
		setFullname( data );
	}

	const [ email, setEmail ] = useState( '' );
	const handleChangeEmail = ( e ) => {
		const data = e.target.value;
		setEmail( data );
	}

	const [ occupation, setOccupation ] = useState( '' );
	const handleChangeOccupation = ( e ) => {
		const data = e.target.value;
		setOccupation( data );
	}

	const [ biography, setBiography ] = useState( '' );
	const handleChangeBiography = ( e ) => {
		const data = e.target.value;
		setBiography( data );
	}

	const [ country, setCountry ] = useState( '' );
	const handleChangeCountry = ( e ) => {
		const data = e.target.value;
		setCountry( data );
	}

	const [ city, setCity ] = useState( '' );
	const handleChangeCity = ( e ) => {
		const data = e.target.value;
		setCity( data );
	}
	
	// handle click save button

	// Email validation
	const regexEmailValidation = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/; 
	const isValideEmail = () => {
		if( !regexEmailValidation.test( email ) )
			return 'Email is invalide';

		return true;
	}
	
	// Name validation
	const isValideName = () => {
		if( fullname ){
			if( fullname.length < 4 ){
				return false;
			}
		}
		return true;
	}
	
	const navigate = useNavigate();
	const handleClickSaveButton = async() => {
		
		if( !isValideEmail( email ) ){
			message.error( 'Bad email address' );
			return;
		}

		if( !isValideName( fullname ) ){
			message.error( 'Your full name seems to not be correct' );
			return;
		}


		const data = {
			fullname: 	fullname,
			email: 		email,
			occupation: occupation,
			biography: 	biography,
			country:	country,
			city:		city,
			userId:		user_id,
		}
		
		const rep = await userProfileSave( data );
		
		if( rep ){
			message.success( 'Profile saved' )
			const newEmail = rep;
			if( newEmail != getUser().userEmail ){
				message.success( 'Log in with your new email' );
console.log( newEmail + ' - ' + email );
				navigate("/login");
			}
		}
		else
			message.error( 'Error: ' + rep )
	}

	// get the profile data
	useEffect( () => {
		
		const getProfile = async () => {
			const profile = await userProfileGet( user_id );
			// setUserProfile( profile );
			if( profile ){
				setFullname( profile.fullname );
				setOccupation( profile.occupation );
				setBiography( profile.biography );
				setCountry( country.biography );
				setCity( country.city );
			}
			setEmail( getUser().userEmail );
		}

		getProfile();

	}, [] );




	return (
		<>
				<Header />
				<Sidebar />	

				<div className="content-body">

            <div className="container-fluid mt-3">
                <div className="row">
                   <h3>Edit your Profile</h3> 
                </div>
				<div className="row">
					<div className="form-group">
						&nbsp;
					</div>
                </div>
				<div className="row">
                   <div className="form-group">
						<input 
							type		= "text" 
							className	= "form-control bg-transparent" 
							placeholder	= "Full name"
							value		= { fullname }
							onChange	= { e => handleChangeFullname( e ) }
						/>
					</div> 
				</div>
				<div className="row">
					<div className="form-group">
						<input 
							type		= "email" 
							className	= "form-control bg-transparent" 
							placeholder	= "Email"
							value		= { email }
							onChange	= { e => handleChangeEmail( e ) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group">
						<input 
							type		= "text" 
							className	= "form-control bg-transparent" 
							placeholder	= "Occupation"
							value		= { occupation }
							onChange	= { e => handleChangeOccupation( e ) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group">
						<input 
							type		= "text" 
							className	= "form-control bg-transparent" 
							placeholder	= "Country"
							value		= { country }
							onChange	= { e => handleChangeCountry( e ) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group">
						<input 
							type		= "text" 
							className	= "form-control bg-transparent" 
							placeholder	= "City"
							value		= { city }
							onChange	= { e => handleChangeCity( e ) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group">
						<textarea 
							type		= "text" 
							className	= "form-control bg-transparent" 
							placeholder	= "Biography"
							value		= { biography }
							onChange	= { e => handleChangeBiography( e ) }
						/>
					</div>
                </div>
				<div className="row">
					<div className="form-group">
						<button 
							className 	= "msger-send-btn" 
							id			= "sendBtn" 
							onClick		= { e => handleClickSaveButton( e ) }
						>
							Save
						</button>
					</div>
                </div>
				<div className="row">
					<div className="form-group">
						&nbsp;
					</div>
                </div>
				<div className="row">
					<div className="form-group">
						&nbsp;
					</div>
                </div>
			</div>
		</div>
			<Footer />
		</>
	);
};

export default Profile;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { Country, State, City }  from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import ReCAPTCHA from "react-google-recaptcha";
import myDraggable from '../../myDraggable.css';
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
import Breadcrumbs from '../Breadcrumbs';

const Profile = ( params ) => {

	const [ painting, setPainting ] = useState( './img/paintings/0.jpg' );

	let captcha;
	 const setCaptchaRef = (ref) => {
		if (ref) {
		  return captcha = ref;
		}
	 };

	 const resetCaptcha = () => {
	   // maybe set it till after is submitted
	   captcha.reset();
	 }

	const [ profile, setProfile ]  = useState( {} );

	const [ loginSpin, setLoginSpin ] = useState( 'none' );

	const [ flagSrc, setFlagSrc ] = useState( '' );
	
	const { getUser }	= useContext( AuthContext );
	const user_id 		= getUser().userId;

	const { userProfileGet, userProfileSave, siteURL }	= useContext( SiteContext );
	const [ userProfile, setUserProfile ] = useState( {} );
	
	const profilePicSizeLimit = 2000000; // 2mb
	const [ pictureError, setPictureError ] = useState( '' );
	const [ openPictureConfirmBox, setOpenPictureConfirmBox ] = useState( false );
	// const [ checkEmptyPicture, setCheckEmptyPicture ] = useState( false );
	const handlePictureConfirmBox = ( e ) => { 			// I want to set a profile's picture
console.log( 'I want a profile\'s picture' );
		const iWantAProfilePicture = true;
		handleClickSaveButton( iWantAProfilePicture );			// true I want to add a profile picture
		setOpenPictureConfirmBox( false ); // close the confirm box
	}
	const handlePictureConfirmBoxCancel = ( e ) => {	// I don't want a profile's picture
console.log( 'I don\'t want a profile\'s picture' );
		const iWantAProfilePicture = false;
		handleClickSaveButton( iWantAProfilePicture );	
		setOpenPictureConfirmBox( false ); 	// close the confirm box
	}

	const [ fullname, setFullname ] = useState( '' );
	const [ fullnameDefault, setFullnameDefault ] = useState( 'Type your full name' );
	const [ fullNameError, setFullNameError ] = useState( '' );

	const handleChangeFullname = ( e ) => {
		const data = e.target.value;
		setFullname( data );
		
		var fullNameErrorText = '';
		if( data.length && data.length < 4 )
			fullNameErrorText = 'Your name seems incomplete'
		else if( !isValidFullName( countryPhoneCode + data ) )
			fullNameErrorText = 'Your name seems incorrect'

		setFullNameError( fullNameErrorText );
	}

	const [ email, setEmail ] = useState( getUser().userEmail );
	const [ emailDefault, setEmailDefault ] = useState( 'Email' );
	const [ emailError, setEmailError ] = useState( '' );
	const handleChangeEmail = ( e ) => {
		const data = e.target.value;
		setEmail( data );

		var emailErrorText = '';
		if( data && !isValidEmail( data ) )
			emailErrorText = 'Your email is not correct'
		
		setEmailError( emailErrorText );
	}

	// Phone number
	const [ phoneNumber, setPhoneNumber ] = useState( '' );
	const handleChangePhoneNumber = ( e ) => {
		const data = e.target.value;
		setPhoneNumber( data );

		var phoneNumberErrorText = '';
		if( data.length < 7 )
			phoneNumberErrorText = 'Your phone number seems incomplete';
		else if( !isValidPhoneNumber( countryPhoneCode + data ) )
			phoneNumberErrorText = 'Your phone number seems incorrect';
			
		setPhoneNumberError( phoneNumberErrorText );
	}

	// Biography
	const [ biographyError, setBiographyError]  = useState( '' );
	const [ biography, setBiography ] = useState( '' );
	const handleChangeBiography = ( e ) => {
		const data = e.target.value;
		setBiography( data );

		var biographyErrorText = '';
		if( !isValidBiography( data ) )
			biographyErrorText = 'Please add a few words to your biography';

		setBiographyError( biographyErrorText );
	}

	// Profile File
	const [ profileFiles, setProfileFiles ] = useState( [] );
	const [ profilePicture, setProfilePicture ] = useState( '' );

	// City
	const [ city, setCity ] = useState( '' );
	const handleChangeCity = ( e ) => {
		const data = e.target.value;
		setCity( data );
		
		setCityError( '' )
	}

	// Occupations
	const [ occupationError, setOccupationError ] = useState( '' );
	const { getOccupations } = useContext( SiteContext );
	const [ occupationDefault, setOccupationDefault ] = useState( 'Select an occupation' );
	const [ occupationSelected, setOccupationSelected ] = useState( '' );
	const [ occupations, setOccupations ]  	= useState( [] ); 
	const handleChangeOccupationSelected 	= ( value ) => { // occupation Id
		setOccupationSelected( value );

		setOccupationError( '' );
	}
	
	// countries
	const [ countryError, setCountryError ] = useState( '' );
	const [ countryDefault, setCountryDefault ] = useState( 'Select a country' );
	const [ countrySelected, setCountrySelected ] = useState( '' );
	const [ countries, setCountries ]  = useState( [] ); 
	const [ countryCode, setCountryCode ] = useState( '' );	
	const [ flagCode, setFlagCode ] = useState( '' );
	const [ countryPhoneCode, setCountryPhoneCode ] = useState( '' );

	const handleChangeCountrySelected = ( countryCode ) => {
		setCountrySelected( countryCode );
		const countryStates = State.getStatesOfCountry( countryCode );
		setCountryCode( countryCode );
		const flagCode = countryPhoneCode.toLowerCase();
		setFlagCode( flagCode );
		
		setStates( countryStates );		
		setFlagSrc( './img/flags/' + flagCode + '.svg' );
		
		const country = countries.filter( country => country.isoCode == countryCode );
		const countryPhoneCode = country[0].phonecode;
	
		setCountryError( '' );

		setCountryPhoneCode( countryPhoneCode );
		
		setStateSelected( '' );
		setCitySelected( '' );
	}
	
	// states
	const [ stateError, setStateError ] = useState( '' );
	const [ stateDefault, setStateDefault ] = useState( 'Select a state' );
	const [ stateNotFound, setStateNotFound ] = useState( 'Select a country first' );
	const [ stateSelected, setStateSelected ] = useState( '' );
	const [ states, setStates ]  = useState( [] );
	const handleChangeStateSelected = ( stateCode ) => {
		setStateSelected( stateCode );
		const stateCities = City.getCitiesOfState( countryCode, stateCode );

		setStateError( '' );

		setCities( stateCities );
		
		setCitySelected( '' );
	}

	// cities
	const [ cityError, setCityError ] = useState( '' );
	const [ cityDefault, setCityDefault ] = useState( 'Select a city' );
	const [ cityNotFound, setCityNotFound ] = useState( 'Select a state first' );
	const [ citySelected, setCitySelected ] = useState( '' );
	const [ cities, setCities ]  = useState( [] ); 
	const handleChangeCitySelected = ( value ) => {
		setCitySelected( value );

		setCityError();
	}

	// Email validation
	const regexEmailValidation = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/; 
	const isValidEmail = ( email ) => {
		if( !regexEmailValidation.test( email ) )
			return false;

		return true;
	}

	// Name validation
	const isValidFullName = ( fullname ) => {
		if( fullname.length && fullname.length < 5 ){
			return false;
		}
		return true;
	}
	
	// Phone validation
	const [phoneNumberError, setPhoneNumberError]  = useState( '' );
	const isValidPhoneNumber = (value) => {
		return (/^\d{7,}$/).test(value.replace(/[\s()+\-\.]|ext/gi, ''));
	}

	// Biography validation
	const isValidBiography = ( biography ) => {
		if( 
			biography.length &&
			( biography.length <= 20 ||
			biography.split( ' ' ).length < 3 )
		)
			return false
		else
			return true
	}

	//
	const getOccupationName = ( occupations, occupationId ) => {

		const x = occupations.filter( a => a.id == occupationId );

		return x[0]
	}
	
	// File upload
	const { Dragger } = Upload;
	const [ uploading, setUploading ] = useState(false);

	const [ fileList, setFileList ] = useState([]);
	const [ fileListToPost, setFileListToPost ] = useState( [] );
	const [ showUploadList, setShowUploadList ] = useState( false );
	const props = {
		accept: '.png,.jpg,.jpeg',
		listType: 'picture',
		fileList: fileList,
		multiple: false,
		maxCount: 1,
		showUploadList: showUploadList,
		className: 'avatar-uploader',
		onChange(info) {
			info.file.status = 'success';
			let newFileList = [...info.fileList];
			setFileList( newFileList );

console.log( 'fileList', fileList );

			setProfilePicture( info.file );

			if( newFileList.length )
				setShowUploadList( true )
			else
				setShowUploadList( false )
			
			setPictureError( '' )
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	// save
	const navigate = useNavigate();
	
	// check if there are form errors
	const checkTheForm = async( ) => {

		var errorsExist = false;

		// name
		if( !fullname ){
			const nameErrorText = 'Your full name field is empty';
			setFullNameError( nameErrorText );
			// setErrorsExist( true )
			errorsExist = true
		}
		// email
		if( !email ){
			const emailErrorText = 'The email field is empty';
			setEmailError( emailErrorText );
			// setErrorsExist( true )
			errorsExist = true
		}
		// occupation
		if( !occupationSelected ){
			const occupationErrorText = 'Select an occupation';
			setOccupationError( occupationErrorText );
			// setErrorsExist( true )
			errorsExist = true
		}
		// country
		if( !countrySelected ){
			const countryErrorText = 'Select a country';
			setCountryError( countryErrorText );
			// setErrorsExist( true )
			errorsExist = true
		}
		// state
		if( !stateSelected ){
			const stateErrorText = 'Select a state';
			setStateError( stateErrorText );
			// setErrorsExist( true )
			errorsExist = true
		}
		// city
		if( !citySelected ){
			const cityErrorText = 'Select a city';
			setCityError( cityErrorText );
			// setErrorsExist( true )
			errorsExist = true
		}
		// phone
		if( !phoneNumber ){
			const phoneNumberErrorText = 'Your phone number is empty.';
			setPhoneNumberError( phoneNumberErrorText );
			// errorsExist = true
			errorsExist = true
		}
		// biography
		if( !biography ){
			const biographyErrorText = 'Please add a few words to your biography.';
			setBiographyError( biographyErrorText );
			// setErrorsExist( true )
			errorsExist = true
		}
		// picture
		if( fileList.length ){
			
			const fileObj = fileList[0];
console.log( 'fileObj', fileObj );
			// check extension
			const ext = fileObj.type.replaceAll( 'image/', '' );
			const exts = props.accept.replaceAll( '.', '' ).replaceAll( 'image/', '' ).split( ',' );
			if( !exts.includes( ext ) ){
				const error = 'Your picture\'s file type is not correct';
				setPictureError( error );
				// setErrorsExist( true )
				errorsExist = true
			}
			
			// check size
			const size = fileObj.size;
			if( size > profilePicSizeLimit  ){
				const error = 'Your image file must be less than 2MB';
				setPictureError( error );
				// setErrorsExist( true )
				errorsExist = true
			}
		}
		
		return errorsExist
	}
	
	const iWantAProfilePicture = '';
	async function handleClickSaveButton ( iWantAProfilePicture = 1 ){		
		// check the form
		const formError = await checkTheForm();	

		// if errors exist in the form
		if( formError === true ){
			const errorsExistText = 'Please correct the errors and try again.';
			message.error( errorsExistText );
			setLoginSpin( 'none' );
			return;
		}
		
		// if no picture was selected, confirm submission with no picture
		if( !fileList.length && iWantAProfilePicture === 1 ){
			await setOpenPictureConfirmBox( true );
			return;
		}
		else if( !fileList.length && iWantAProfilePicture === true ){
			return;
		}
		
		// check the recaptcha 
		if( !recaptchaValue ){ // recaptcha
			message.error( 'Please check the recaptcha verification' )
			return;
		}

		// send data
		setLoginSpin( 'block' ); // spin
		
		const data = {
			fullname: 	fullname,
			email: 		email,
			occupation: occupationSelected,
			phone: 		phoneNumber,
			country:	countrySelected,
			state:		stateSelected,
			city:		citySelected,
			userId:		user_id,
			biography: 	biography,
		}

// console.log(data);

		const rep = await userProfileSave( data, profilePicture );

		if( rep ){
			message.success( 'Profile updated' );
			// window.location.reload();
			resetCaptcha();
			
			const newEmail = rep;
			if( newEmail != getUser().userEmail ){
				// message.success( 'Log in with your new email' );
// console.log( newEmail + ' - ' + email );
				// navigate("/login");
			}
		}
		else{
			message.error( 'Error: ' + rep )
		}
		setLoginSpin( 'none' );
		// setCheckEmptyPicture( false );
	}

	// Build occupations options
	const BuildOccupationsOptions = () => {
		return(
			occupations.map( ( occupation, index ) => 
				({
					value: occupation.id,
					label: occupation.name,
				})
			)
		)
	}

	// Build countries options
	const BuildCountriesOptions = () => {
		return(
			countries.map( ( country, index ) => 
				({
					value: country.isoCode,
					label: country.name,
				})
			)
		)
	}

	// Build countries options
	const BuildStatesOptions = () => {
		return(
			states.map( ( state, index ) => 
				({
					value: state.isoCode,
					label: state.name,
				})
			)
		)
	}

	// Build cities options
	const BuildCitiesOptions = () => {
		return(
			cities.map( ( city, index ) => 
				({
					value: city.name,
					label: city.name,
				})
			)
		)
	}

	// recaptcha
	const [ recaptchaValue, setRecaptchaValue ] = useState( false );
	const onRecaptchaChange = ( value ) => {
		if( !value )
			setLoginSpin( 'none' )
		else
			setRecaptchaValue( true );
		// console.log("Captcha value:", value);
	}

	// get the profile data
	useEffect( () => {
		// Counries list
		const allCountries = Country.getAllCountries();
		var countries = Array();
		// Add an id property to the countries array for and Select to work
		for( const country of allCountries ){ 
			country.id = country.isoCode;
			countries.push( country );
		}
		setCountries( countries );

		var occupationsList = [];
		const getOccupationsList = async () => {
			occupationsList = await getOccupations();
			setOccupations ( occupationsList );
		}
		getOccupationsList();

		const getProfile = async () => {
			// form.resetFields();
			const profile = await userProfileGet( user_id );

			setProfile( profile );
			// Display profile data from database
			if( profile.fullname ){
				// Full name
				setFullname( profile.fullname );
				// Biography
				setBiography( profile.biography );
				// Occupation
				setOccupationSelected( profile.occupation.id );
				// Country
				const countryObj = countries.filter( country => 
					country.id == profile.country
				)[0];
				setCountrySelected( profile.country );
				const countryStates = State.getStatesOfCountry( countryObj.isoCode )
				setStates( countryStates );
				// Country phone code
				if( countryObj ) 
					setCountryPhoneCode( countryObj.phonecode )
				// Phone
				setPhoneNumber( profile.phone );
				// Country flag
				const flagCode = countryObj.isoCode.toLowerCase();
				setFlagCode( flagCode );
				
				if( countryObj ) 
					setFlagSrc( './img/flags/' + flagCode + '.svg' )
				// Country States
				if( countryObj ){ 
					setStateSelected( profile.state );
					const stateCities = City.getCitiesOfState( countryObj.isoCode, profile.state );
					// console.log( 'stateCities', stateCities );
					setCities( stateCities );
				}
				// State cities
				if( countryObj ){ 
					setCitySelected( profile.city )
				}
				// picture
				if( profile.picture ){
					setShowUploadList( true );
					const pictureObj = {
						"uid": "rc-upload-" + profile.id,
						"id": profile.id,
						"lastModified": 1712629873826,
						"lastModifiedDate": "2025-01-04T13:16:34.267Z",
						"name": "Your profile picture",
						// "size": profile.pictureSize,
						"type": 'image/' + profile.picture.split( '.' )[ profile.picture.split( '.' ).length - 1 ],
						"url":  siteURL + 'uploads/files/profile/' + profile.picture,
						"path": profile.picture,
						"percent": 100,
						"originFileObj": {
							"uid": "rc-upload-" + profile.id,	// fake
						},
						"status": "done"
					}
					setFileList( [ pictureObj ] );
// console.log( 'pictureObj', pictureObj );
					setProfilePicture( pictureObj );
					
					// const itemNameElt = document.getElementsByClassName( 'ant-upload-list-item-name' )[0];
					// itemNameElt.innerHTML( 'Profile picture' );
				}
				form.setFieldsValue({
					fullName: profile.fullname,
					occupation: profile.occupation.id,
					country: profile.country,
					phoneNumber: profile.phone,
					state:  profile.state,
					city: profile.city,
					biography: profile.biography
				});
			}
			// setEmail( getUser().userEmail );
			
			// painting
			const paintings = [ 1, 2, 3 ];
			const rd = await Math.floor( Math.random() * paintings.length + 1 );
			if( painting == './img/paintings/0.jpg' )
				setPainting( './img/paintings/' + rd + '.jpg' );
		}

		if( !profile.id )
			getProfile();

	}, [profile] );



	const [form] = Form.useForm();


	return (
		<>
			<Header />
			<Sidebar />	

			<div className="content-body">
			<Breadcrumbs />
            <div className="container-fluid mt-3">
                <div className="row" style={{ marginLeft: '10px' }}>
                   <h3>Edit your Profile</h3> 
                </div>
				<div className="row">
					<div className="col-md-6 container-fluid">
						<Form 
							form = {form}
						>
							<div className="row">
								<div className="form-group">
									<Form.Item
										name  = "fullName"
										style = {{ marginBottom: '0px' }}
										rules = {[
											{
												message: fullNameError,
												validator: ( value ) => {
													if ( fullNameError ) {
														return Promise.reject( fullNameError );
													} 
													else {
														return Promise.resolve();
													}
												}
											}
										]}
										initialValue  = { fullname ? fullname : fullnameDefault }
									>
										<input 
											type		= "text" 
											className	= "form-control" 
											placeholder	= "Full name"
											value		= { fullname }
											onChange	= { e => handleChangeFullname( e ) }
											style 		= {{ width: '400px', height: '30px' }}
										/>
									</Form.Item>
								</div> 
							</div>
							<div className="row">
								<div className="form-group">
									<Form.Item
										name  = "email"
										style = {{ marginBottom: '0px' }}
										rules = {[
											{
												message: emailError,
												validator: ( value ) => {
													if ( emailError ) {
														return Promise.reject( emailError );
													} 
													else {
														return Promise.resolve();
													}
												}
											}
										]}
										initialValue  = { email ? email : emailDefault }
									>
										<input 
											type		= "email" 
											className	= "form-control" 
											placeholder	= "Email"
											disabled	= { true }
											value		= { email }
											onChange	= { e => handleChangeEmail( e ) }
											style 		= {{ width: '400px', height: '30px' }}
										/>
									</Form.Item>
								</div>
							</div>
							<div className="row">
								<div className="form-group">
									<div className="btn-group show" role="group">
										<Form.Item
											name  = "occupation"
											style = {{ marginBottom: '0px' }}
											rules = {[
												{
													message: occupationError,
													validator: ( value ) => {
														if ( occupationError ) {
															return Promise.reject( occupationError );
														} 
														else {
															return Promise.resolve();
														}
													}
												}
											]}
											initialValue  = { occupationSelected ? occupationSelected : occupationDefault }
										>
											<Select
												size 		 	= 'middle'
												value			= { occupationDefault }
												onChange		= { e => handleChangeOccupationSelected( e ) }
												style			= {{
													width: '400px',
													height: '30px'
												}}
												showSearch
												optionFilterProp="label"
												filterSort={(optionA, optionB) =>
												  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
												}
												options = { BuildOccupationsOptions() }
												notFoundContent = { occupationDefault }
											/>
										</Form.Item>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group">
									<div className="btn-group show" role="group">
										<Form.Item
											name  = "country"
											style = {{ marginBottom: '0px' }}
											rules = {[
												{
													message: countryError,
													validator: ( value ) => {
														if ( countryError ) {
															return Promise.reject( countryError );
														} 
														else {
															return Promise.resolve();
														}
													}
												}
											]}
											initialValue  = { countrySelected ? countrySelected : countryDefault }
										>
											<Select
												size 		 	= 'middle'
												value			= { countrySelected }
												onChange		= { e => handleChangeCountrySelected( e ) }
												style={{
													width: '400px',
													height: '30px'
												}}
												showSearch
												optionFilterProp="label"
												filterSort={(optionA, optionB) =>
												  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
												}
												options = { BuildCountriesOptions() }
												notFoundContent = { countryDefault }
											/>
										</Form.Item>
									</div>
								</div>
							</div>
							{ countryPhoneCode &&
								<div className="row">
									<div className="form-group">
										<img 
											src			= { flagSrc } 
											style		={{ height: '30px', float: 'left'  }}
											className	= "mt-auto" 
										/>
										<input 
											type		= "text" 
											value		= { countryPhoneCode }
											style 		= {{ width: '25px', height: '30px', border: 'none', marginLeft: '10px', backgroundColor: '#e9ecef', float: 'left' }}
											disabled	= { true }

										/>
										<Form.Item
											name  = "phoneNumber"
											style = {{ marginBottom: '0px', float: 'left' }}
											rules = {[
												{
													message: phoneNumberError,
													validator: ( value ) => {
														if ( phoneNumberError ) {
															return Promise.reject( phoneNumberError );
															
														} 
														else {
															return Promise.resolve();
														}
													}
												}
											]}
										>
											<Input 
												type		= "text" 
												className	= "mt-auto" 
												placeholder	= "Type your phone number"
												value		= { phoneNumber }
												onChange	= { e => handleChangePhoneNumber( e ) }
												style 		= {{ marginLeft: '5px', height: '30px', float: 'left' }}
											/>
										</Form.Item>
									</div>
								</div>
							}
							<div className="row">
								<div className="form-group">
									<div className="btn-group show" role="group">
										<Form.Item
											name  = "state"
											style = {{ marginBottom: '0px' }}
											rules = {[
												{
													message: stateError,
													validator: ( value ) => {
														if ( stateError ) {
															return Promise.reject( stateError );
														} 
														else {
															return Promise.resolve();
														}
													}
												}
											]}
											initialValue  = { stateSelected ? stateSelected : stateDefault }
										>
											<Select
												size 		 	= 'middle'
												value			= { stateSelected }
												onChange		= { e => handleChangeStateSelected( e ) }
												style={{
														width: '400px',
														height: '30px'
												}}
												showSearch
												optionFilterProp="label"
												filterSort={(optionA, optionB) =>
												  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
												}
												options = { BuildStatesOptions() }
												notFoundContent = { stateNotFound }
											/>
										</Form.Item>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group">
									<div className="btn-group show" role="group">
										<Form.Item
											name  = "city"
											style = {{ marginBottom: '0px' }}
											rules = {[
												{
													message: cityError,
													validator: ( value ) => {
														if ( cityError ) {
															return Promise.reject( cityError );
														} 
														else {
															return Promise.resolve();
														}
													}
												}
											]}
											initialValue  = { citySelected ? citySelected : cityDefault }
										>
											<Select
												size 		 	= 'middle'
												value			= { citySelected }
												onChange		= { e => handleChangeCitySelected( e ) }
												style={{
														width: '400px',
														height: '30px'
												}}
												showSearch
												optionFilterProp="label"
												filterSort={(optionA, optionB) =>
												  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
												}
												options = { BuildCitiesOptions() }
												notFoundContent = { cityNotFound }
											/>
										</Form.Item>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group">
									<Form.Item
										name  = "biography"
										style = {{ marginBottom: '0px' }}
										rules = {[
											{
												message: biographyError,
												validator: ( value ) => {
													if ( biographyError ) {
														return Promise.reject( biographyError );
													} 
													else {
														return Promise.resolve();
													}
												}
											}
										]}
									>
										<textarea 
											type		= "text" 
											className	= "form-control" 
											placeholder	= "About you"
											value		= { biography }
											onChange	= { e => handleChangeBiography( e ) }
											style		= {{
												width: '400px', 
												height: '90px'
											}}
										/>
									</Form.Item>
								</div>
							</div>
							<div className="row">
								<div className="form-group ">
									<div className="fallback myDraggable">
										<Form.Item
											name  = "picture"
											style = {{ marginBottom: '0px' }}
											rules = {[
												{
													message: pictureError,
													validator: ( value ) => {
														if ( pictureError ) {
															return Promise.reject( pictureError );
														} 
														else {
															return Promise.resolve();
														}
													}
												}
											]}
										>
											<Dragger {...props} >
												<p className="ant-upload-drag-icon">
													Click or drag your picture<br/>.png and jpg only<br/>
												</p>
											</Dragger>
										</Form.Item>
										<Popconfirm
											title="Do you want to add a profile picture?"
											open={openPictureConfirmBox}
											onConfirm={handlePictureConfirmBox}
											onCancel={handlePictureConfirmBoxCancel}
											okText="Yes"
											cancelText="No"
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<ReCAPTCHA
									ref={(r) => setCaptchaRef(r) }
									sitekey="6LenE-0qAAAAAI12TzPIfn8d-P-UKrci4VfdnxET"
									onChange={onRecaptchaChange}
								  />
							</div>
							<div className="row">
								<div className="form-group">
									<button 
										className 	= "btn mb-1 btn-primary btn-lg" 
										id			= "sendBtn" 
										onClick		= { e => handleClickSaveButton( 1 ) }
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
										Update your profile
									</button><br/>
									<span><Link to='/privacy'>Privacy</Link></span>
								</div>
							</div>
							<div className="row">
								<div className="form-group">
									&nbsp;
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

export default Profile;

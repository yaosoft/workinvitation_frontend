import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

import { ProjectContext } from '../../context/Project';
import { SiteContext } from '../../context/site';
import { AuthContext } from '../../context/AuthProvider';

import ModalAddContact from '../ModalAddContact';
import ModalEditContact from '../ModalEditContact';

import { UploadOutlined } from '@ant-design/icons';

import '../../sidebarOverrides.css';

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

const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ContactsListsEdit = ( params ) => {
	const { TextArea } 		= Input;
	const [ pageType, setPageType ] = useState( params.params.type );
	const pageTitle = pageType == 'create' ? 'Create a contacts list' : 'Edit a contacts list';	
	
	// get the project id in query params
	const [searchParams, setSearchParams] = useSearchParams();
	const [ contactsListId, setContactsListId ] = useState( searchParams.get( 'contactsListId' ) ? searchParams.get( 'contactsListId' ) : '' );

	const [ buttonSpin, setButtonSpin ] = useState( 'none' );

	//
	const [ buttonDisplay, setButtonDisplay ] = useState( 'none' );

	// const { setContactsListContact, contactsListContact } 	= useContext( SiteContext );
	const { contact, setContact } = useContext( SiteContext );
	// const { setContactsListContacts, contactsListContacts } = useContext( SiteContext );
	const { contacts, setContacts } = useContext( SiteContext );

	const { contactsListSave, getContactsList, contactsListContactsSave, getContactsListContacts } = useContext( SiteContext );

	const { getUser } 			= useContext( AuthContext );
	const userId 				= getUser().userId;

	const [ listName, setListName ] 			= useState( '' ); 
	const [ description, setDescription ] 		= useState( '' ); 

	
	const handleChangeContactListName = ( e ) => {
		const typed = e.target.value;
		setListName( typed )
	}

	const handleChangeContactListDescription = ( e ) => {
		const typed = e.target.value;
		setDescription( typed )
	}

	const handleClickBtn = async () => {

		// list name
		if( !listName ){
			message.error( 'Type a contact list name' );
			return;
		}
	
		const data = {
			title: 			listName,
			description: 	description,
			userId: 		userId, 
			contactsListId: contactsListId
		};
		
		// save contacts list
		const resp = await contactsListSave( data );
		
		// save contacts list 's contacts
		if( !isNaN( resp ) ){
			
			// save contacts list's contacts
// console.log( 'contacts', contacts );

			const data = contacts.map( ( x, y ) => (
				{ ...x, contactsListId : resp }
			))
			
			const res = await contactsListContactsSave( data );
			message.success( 'Saved!' )
		}
		else{
			message.error( 'A contact list with this name already exists' )
		}
	}

	// Build contacts
	const BuildContacts = () => {
		return(
			contacts.map( ( contact, key ) =>
				<button 
					type			= "button" 
					className		= "btn btn-dark" 
					data-toggle		= "modal" 
					data-target		= "#contactEditModal"
					onClick			= { e => setContact( contact ) }
					index			= { key }
				>
					{ contact.email }
				</button>
			)
		)
	}

	// Empty contacts list
	const handleClickDeleteAll  = () => {
		setContact( {} );
		setContacts( [] )
		setButtonDisplay( 'none' )
	}

	// Email validation
	const regexEmailValidation = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/; 
	const isValideEmail = ( email ) => {
		if( !regexEmailValidation.test( email ) )
			return 'Email is invalide';

		return true;
	}

	// get the project if edit
	useEffect( () => {
		// contacts list
		handleClickDeleteAll();
		if( pageType == 'edit' ){
		
			const getContactsListData = async () => {

				const data = await getContactsList( contactsListId ); //  contact lit data

				setListName( data.title );
				setDescription( data.description );
				setContactsListId( data.id );

				// contacts list's contacts
				const contacts = await getContactsListContacts( contactsListId );
// console.log( 'contacts', contacts );
				await setContacts( contacts );
				
				// if( contacts.length > 5 )
					// setButtonDisplay( 'block' )
				// else
					// setButtonDisplay( 'none' )
			}
			getContactsListData();
		}
	}, [] );

	// Display bulk contacts delete button
	useEffect(() => {
		if( contacts.length > 5 )
			setButtonDisplay( 'block' )
		else
			setButtonDisplay( 'none' )
	}, [ contact, contacts ] );

	return (
		<>
				<Header />
				<Sidebar />	
				<div class="content-body">
					<ModalAddContact params = {{
							contactsListId : contactsListId,
						}}
					/>
					<ModalEditContact />
				<Breadcrumbs />
				
				<div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
						<h3>{ pageTitle }</h3>
						<br />
                        <div className="card">
                            <div className="card-body">
                                <div class="form-group">
												<input 
													onChange 	= {  e => handleChangeContactListName( e ) } 
													value 		= { listName }
													className	= "form-control" 
													type		= "text" 
													placeholder = "Contacts list's name" 
												/>
									</div>
									<div class="form-group">
												<TextArea 
													rows			= { 5 }
													defaultValue 	= ''
													value 			= { description }
													onChange 		= { e => handleChangeContactListDescription( e ) }
													type			= "text" 
													className		= "form-control" 
													id				= "description" 
													placeholder 	= "Contacts list's description"
												/>
									</div>
									<div>
										<BuildContacts />
									</div>
									<p>&nbsp;</p>
									<div className="">
										<button 
												type			= "button" 
												className		= "btn btn-ligth" 
												data-toggle		= "modal" 
												data-target		= "#contactAddModal"
												style			= {{ padding: '2px 18px' }}
										>
												Add a new contact
												<span className="btn-icon-right">
													<i className="fa fa-plus"></i>
													<i className="fa fa-user"></i>
												</span>
										</button>
										&nbsp;
										<Upload
												accept=".txt, .csv, .sql"
												showUploadList={false}
												beforeUpload={file => {
													const reader = new FileReader();
													var countError = 0;
													reader.onload = e => {
														const uploaded_text = e.target.result;
														const emaillst = uploaded_text .match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
														if( !emaillst.length ){
															message.error( 'No email address found!' )
														}
														else{
															emaillst.map( ( v, k ) => {
																
																const rd = Math.floor(Math.random() * 1000000000);
																const newContact = {
																	name: '',
																	email: v,
																	uid: 'create_' + rd,
																}
																
																var error = false;
																
																// Email validation
																const emailValidation = isValideEmail( newContact.email );
																if( emailValidation !== true ){
																	message.error( 'Email ' + newContact.email + ' incorrect' );
																	error = true;
																	countError++;
																}
																else {
																	// duplicate verification
																	const check = contacts.filter( e => e.name == newContact.name && e.email == newContact.email );
																	console.log( 'check', check );
																	if( check.length ){
																		message.error( 'This contact already exists!' );
																		error = true;
																		countError++;
																	}
																}

																if( error == false ){
																	setContact( newContact );
																	const conts = contacts;
																	conts.push( newContact );
																	setContacts( conts );
																	
																	// if( contacts.length > 5 )
																		// setButtonDisplay( 'block' )
																	// else
																		// setButtonDisplay( 'none' )
																	
																	
																}
															})
															
														}
														if( countError < emaillst.length ){
															message.success( ( emaillst.length - countError )  + ' contacts willl be added' );
														}
														console.log( emaillst );
													};
													reader.readAsText(file);

													// Prevent upload
													return false;
												}}
											>
												<Button>
													<i className="fa fa-upload"/>&nbsp; Extract contacts from a file
												</Button>
										</Upload>
										&nbsp;
										<Popconfirm
											title		= 'RemoveALl'
											description	= 'Do you really want to remove all contacts?'
											onConfirm	= { handleClickDeleteAll }
											okText		= 'Yes'
											cancelText	= 'No'
											
										>
											<button 
													type			= "button" 
													className		= "btn btn-danger" 
													style			= {{ padding: '2px 18px', display: buttonDisplay }}
											>
													Remove all contacts
													<span className="btn-icon-right">
														<i className="fa fa-trash"></i>
													</span>
											</button>
										</Popconfirm>
									</div>
									<p>&nbsp;</p>
									<button 
										className	= "btn login-form__btn submit w-100"
										onClick		= { e => handleClickBtn( e ) }
									>
												<Space>
													<Spin
														indicator={
															<LoadingOutlined
																style={{
																	fontSize: 		20,
																	marginRight: 	'10px',
																	display:		buttonSpin,
																	color: 			'wheat',
																}}
																spin
															/>
														}
													/>
												</Space>
												Save
									</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			 </div>
			<Footer />
		</>
	);
};

export default ContactsListsEdit;

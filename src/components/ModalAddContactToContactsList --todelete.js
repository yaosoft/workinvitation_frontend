import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { SiteContext } from "../context/site";
import '../modalOverrides.css';

import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const ModalAddContactToContactsList = ( params ) => {

	var newContact = {};
	
	const openNotificationContactSuccess = ( message ) => {			// Error no size selected
		notification.success({
			message: `${message}`,
			duration: 3,
			description: 'contacts added!',
			placement: 'topRight',
		});
	};

	// contactsListContact email
	const [ email, setEmail ] = useState( '' );
	const handleChangeEmail = ( e ) => {	
		setEmail( e.target.value );
	}
		
	// contact nom
	const [ name, setName ] = useState( '' );
	const handleChangeName = ( e ) => {	
		setName( e.target.value );
	}

// console.log( params );
	// contacts list id
	const [ contactsListId, setContactsListId ] = useState( params.params.contactsListId );	
	
	// 
	const { setContactsListContact, contactsListContact } 	= useContext( SiteContext );
	const { setContactsListContacts, contactsListContacts } = useContext( SiteContext );
	
	// Add contact
	const handleClickContact = () => {
		// check if contact already exist

		// Name validation
		const nameValidation = isValideName();
		if( nameValidation !== true ){
			message.error( nameValidation );
			return;
		}

		// Email validation
		const emailValidation = isValideEmail();
		if( emailValidation !== true ){
			message.error( emailValidation );
			return;
		}
		
		// duplicate verification
		const check = contactsListContacts.filter( e => e.name == name && e.email == email );
// console.log( 'check', check );
		if( check.length ){
			message.error( 'This contact already exists!' );
			window.document.getElementById( 'closeModal' ).click(); // Todo: react way
			return;
		}
			
		
		const rd = Math.floor(Math.random() * 1000000000);
		newContact = {
			name: 			name,
			email: 			email,
			uid: 			'create_' + rd,
			contactId: 		'',
			contactsListId: contactsListId
		}

		setContactsListContact( newContact );
		const conts = contactsListContacts;
		conts.push( newContact );
		setContactsListContacts( conts );
		
		openNotificationContactSuccess( 'Success' );
		
		window.document.getElementById( 'closeModal' ).click(); // Todo: react way
	}
	
	// Name validation
	const isValideName = () => {
		// if( !name )
		// 	return 'Name is empty!';

		return true;
	}
	
	// Email validation
	const regexEmailValidation = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/; 
	const isValideEmail = () => {
		if( !regexEmailValidation.test( email ) )
			return 'Email is invalide';

		return true;
	}
	

	useEffect(() => {
		// if( contactsListContacts.length == 0 )
			// setContactsListContacts( [] );
	}, [ newContact ] );

	return (
		<>
			<div class="bootstrap-modal">
				<div class="modal fade" style={{ zIndex: 5 }} id="contactAddModal" tabindex="-1" role="dialog" aria-labelledby="contactAddModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="contactAddModalLabel">Add a contactsListContact</h5>
								<button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="recipient-name" class="col-form-label">contact name:</label>
										<input 
											value 		= { name }
											onChange 	= { e => handleChangeName( e ) }
											type 		= "text" 
											class		= "form-control" 
											id			= "recipient-name" 
										/>
									</div>
									<div class="form-group">
										<label for="recipient-email" class="col-form-label">Email *:</label>
										<input 
											value 		= { email }
											onChange 	= { e => handleChangeEmail( e ) }
											type		= "email" 
											class		= "form-control" 
											id			= "recipient-email" 
										/>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button 
									type	= "button" 
									class	= "btn btn-success"
									onClick = { e => handleClickContact( e ) }
								>
									Add a contacts
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalAddContactToContactsList;

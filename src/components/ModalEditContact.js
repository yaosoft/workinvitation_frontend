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

const ModalEditContact = ( params ) => {

	var newContact = {};
	
	const openNotificationContactSuccess = ( message ) => {
		notification.success({
			message: `${message}`,
			duration: 3,
			description: 'Contact Added!',
			placement: 'topRight',
		});
	};
	const openNotificationModifContactSuccess = ( message ) => {
		notification.success({
			message: `${message}`,
			duration: 3,
			description: 'Contact have been updated!',
			placement: 'topRight',
		});
	};
	const openNotificationDeleteContactSuccess = ( message ) => {			// Error no size selected
		notification.success({
			message: `${message}`,
			duration: 3,
			description: 'Contact have been removed!',
			placement: 'topRight',
		});
	};

	// 
	const { setContact, contact } 	= useContext( SiteContext );
	const { contacts, setContacts } = useContext( SiteContext );
	
	// Contact email
	const [ email, setEmail ] = useState( '' );
	const handleChangeEmail = ( e ) => {	
		setEmail( e.target.value );
	}

	// Contact nom
	const [ name, setName ] = useState( '' );
	const handleChangeName = ( e ) => {	
		setName( e.target.value );
	}

	// Contact uid
	const [ uid, setUid ] = useState( '' );

	// Update Contact
	const handleClickModifyContact = () => {
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
		const check = contacts.filter( e => e.name == name && e.email == email );
		console.log( 'check', check );
		if( check.length ){
			message.error( 'This contact already exists!' );
			return;
		}
		// delete and recreate the contact in the contacts list
		// newContact = {
			// name: name,
			// email: email
		// }

		var toUpdate = '';
		contacts.map( e => {
			if( e.id ){		// contact existing in the database
				if( e.id == uid )
					toUpdate = e
			} 
			if ( e.uid ){	// newly created contact
				if( e.uid == uid )
					toUpdate = e
			} 
		})

		toUpdate.email = email;
		toUpdate.name  = name;
		
		const newContacts = contacts.map( e => e.id == uid ? toUpdate : e )
		// contacts.push( newContact );
		setContact( toUpdate );
		setContacts( newContacts );

		// deleteAContact();

		openNotificationModifContactSuccess( 'Success' );
		window.document.getElementById( 'closeEditModal' ).click(); // Todo: react way

	}

	// Delete contact
	const handleClickDeleteContact = () => {
		deleteAContact();
		// setContact( {} );
		
		openNotificationDeleteContactSuccess( 'Success' );
		window.document.getElementById( 'closeEditModal' ).click(); // Todo: react way
	}

	// Delete current contact
	const deleteAContact = () => {
		var toDelete = '';
		contacts.map( e => {
			if( e.id ){		// contact existing in the database
				if( e.id == uid ){
					toDelete = e;
					setContacts( contacts.filter( e => e.id != toDelete.id ) );
				}
			} 
			if ( e.uid ){	// newly created contact
				if( e.uid == uid ){
					toDelete = e;
					setContacts( contacts.filter( e => e.uid != toDelete.uid ) );
				}
			} 
		})
	}

	// Name validation
	const isValideName = () => {
		//if( !name )
		//	return 'Name is empty!';

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

		setEmail( contact.email );
		setName( contact.name );
		setUid( contact.id ? contact.id : contact.uid ); // newly created contact doesn't have id but uid
	}, [ contact ] );

	return (
		<>
			<div class="bootstrap-modal">
				<div class="modal fade" id="contactEditModal" tabindex="-1" role="dialog" aria-labelledby="contactModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="contactModalLabel">Edit contact</h5>
								<button id="closeEditModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="edit-recipient-name" class="col-form-label">Edit Name:</label>
										<input 
											value 		= { name }
											onChange 	= { e => handleChangeName( e ) }
											type 		= "text" 
											class		= "form-control" 
											id			= "edit-recipient-name" 
										/>
									</div>
									<div class="form-group">
										<label for="edit-recipient-email" class="col-form-label">Edit Email:</label>
										<input 
											value 		= { email }
											onChange 	= { e => handleChangeEmail( e ) }
											type		= "email" 
											class		= "form-control" 
											id			= "edit-recipient-email" 
										/>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button 
									type="button" 
									class="btn btn-light" 
									data-dismiss="modal"
								>
									Close
								</button>
								<button 
									type	= "button" 
									class	= "btn btn-danger"
									onClick = { e => handleClickDeleteContact( e ) }
								>
									Remove contact
								</button>
								<button 
									type	= "button" 
									class	= "btn btn-success"
									onClick = { e => handleClickModifyContact( e ) }
								>
									Mofidy contact
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalEditContact;

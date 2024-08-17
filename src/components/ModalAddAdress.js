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
	
	const openNotificationContactSuccess = ( message ) => {			// Error no size selected
		notification.success({
			message: `${message}`,
			duration: 3,
			description: 'Contact Added!',
			placement: 'topRight',
		});
	};
	const openNotificationModifContactSuccess = ( message ) => {			// Error no size selected
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
			description: 'Contact have been deleted!',
			placement: 'topRight',
		});
	};

	// 
	const { setContact, contact } = useContext( SiteContext );
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
		
		// delete and recreate the contact in the contacts list
		
		newContact = {
			name: name,
			email: email
		}
		// contacts.push( newContact );
		setContact( newContact );
		const cont = contacts;
		cont.push( newContact );
		setContacts( cont );
		
		deleteAContact();
		
		openNotificationModifContactSuccess( 'Success' );
		window.document.getElementById( 'closeEditModal' ).click(); // Todo: react way

	}
	
	// Delete cntact
	const handleClickDeleteContact = () => {
		deleteAContact();
		// setContact( {} );
		
		openNotificationDeleteContactSuccess( 'Success' );
		window.document.getElementById( 'closeEditModal' ).click(); // Todo: react way
	}
	// Delete current contact
	const deleteAContact = () => {
		setContacts( contacts.filter( e => e.email != contact.email ) );
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
	
// alert( contact.email );	
	// window.document.getElementById( 'edit-recipient-name' ).value = contact.name;
	// window.document.getElementById( 'edit-recipient-email' ).value = contact.email;
	
	useEffect(() => {
		setEmail( contact.email );
		setName( contact.name );
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
									Delete contact
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

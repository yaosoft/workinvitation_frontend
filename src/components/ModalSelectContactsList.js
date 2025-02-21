import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { SiteContext } from "../context/site";
import { AuthContext } from '../context/AuthProvider';

import '../modalOverrides.css';


import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const ModalSelectContactsList = ( params ) => {

	var newContact = {};
	
	const openNotificationContactSuccess = ( message ) => {			// Error no size selected
		notification.success({
			message: `${message}`,
			duration: 3,
			description: 'Contact Added!',
			placement: 'topRight',
		});
	};

	const { getUser }	= useContext( AuthContext );

	// 
	const { setContact, contact } 				= useContext( SiteContext );
	const { setContacts, contacts } 			= useContext( SiteContext );
	const { getContacts, getContactsLists, getContactsListContacts } 	= useContext( SiteContext );

	const [ existingContactsList, setExistingContactsList ] =  useState( [] );

	const [ checks, setChecks ] = useState( [] );

console.log( 'existingContacts', existingContactsList );
console.log( 'length', existingContactsList.length );
console.log( 'checks', checks );

	const [ subscribeCheckbox, setSubscribeCheckbox ] = useState( '' );

	const changeSubscribeCheckbox = ( indice ) => {
		const arr = checks.map( ( v, k ) => indice === k ? !v : v  );
		setChecks( arr );
	}

	const BuildExistingContactsLists = () => {
		return (
			existingContactsList.map( ( contactsList, key ) => 
				<p>
					<input 
						onChange	= { e => changeSubscribeCheckbox( key ) }
						checked 	= { checks[ key ] }
						type		= 'checkbox'
						index		= { key }
					/>
					&nbsp;&nbsp;
					<span>{ contactsList.title }</span>
				</p>
			)
		)
	}
	
	// Add Contact
	const handleClickContact =  () => {

		if( ! checks.filter( v => v === true ).length ){
			message.error( 'No contacts list selected' );
		}
		else{
			checks.map( async ( v, k ) => {
				if( v ){
					const contacts = await getContactsListContacts( existingContactsList[ k ].id );
					
					contacts.map( ( contact, index ) => {
						addAContact( contact );
					})
				}
			})
		}
		window.document.getElementsByClassName( 'close' )[0].click(); // Todo: react way
	}
	
	const addAContact = ( contact ) => {
		const name  = contact.name;
		const email = contact.email;
		// Name validation
		const nameValidation = isValideName( name );
		if( nameValidation !== true ){
			message.error( nameValidation );
			return;
		}

		// Email validation
		const emailValidation = isValideEmail( email );
		if( emailValidation !== true ){
			message.error( emailValidation );
			return;
		}

		// duplicate verification
		const check = contacts.filter( e => e.name == name && e.email == email );

		if( check.length ){
			message.error( 'This contact already exists!' );
			// window.document.getElementsByClassName( 'closeModal' ).click(); // Todo: react way
			return;
		}
			
		
		const rd = Math.floor(Math.random() * 1000000000);
		newContact = {
			name: name,
			email: email,
			uid: 'create_' + rd,
		}

		setContact( newContact );
		const conts = contacts;
		conts.push( newContact );
		
		setContacts( conts );
		
		openNotificationContactSuccess( 'Success' );
	}
	
	// Name validation
	const isValideName = ( nom ) => {
		// if( !name )
		// 	return 'Name is empty!';
		return true;
	}
	
	// Email validation
	const regexEmailValidation = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/; 
	const isValideEmail = ( email ) => {
		if( !regexEmailValidation.test( email ) )
			return 'Email is invalide';

		return true;
	}

	// get existing contacts
	const user_id = getUser().userId;
	useEffect( () => {
		const getExistingContactsLists 	= async () => {
			const contactsLists			= await getContactsLists( user_id );
			setExistingContactsList ( contactsLists );
			setChecks ( new Array( contactsLists.length ).fill( false ) );
		}
		getExistingContactsLists();
	}, [] );

	return (
		<>
			<div class="bootstrap-modal">
				<div class="modal fade" style={{ zIndex: 5 }} id="contactsListSelectModal" tabindex="-1" role="dialog" aria-labelledby="contactSelectModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="contactSelectModalLabel">Select a Contact List</h5>
								<button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">

								<BuildExistingContactsLists />

							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button 
									type	= "button" 
									class	= "btn btn-success"
									onClick = { e => handleClickContact( e ) }
								>
									Add Contacts
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalSelectContactsList;

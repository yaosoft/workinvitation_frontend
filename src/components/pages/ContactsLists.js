import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

import { ProjectContext } from '../../context/Project';
import { SiteContext } from '../../context/site';
import { AuthContext } from '../../context/AuthProvider';

import '../../sidebarOverrides.css';

const ContactsLists = ( params ) => {
	
	const pageTitle = 'List of contact list';
	const { getContactsLists } = useContext( SiteContext );
	const [ contactsLists, setContactsLists ] 	= useState( [] ); 
	const { getUser } = useContext( AuthContext );
	// Build contacts lists
	const BuildContactslists = () => {
		if( contactsLists.length ){
			return(
				contactsLists.map( ( contactsList, key ) =>
					<>
						<Link to={ '/contacts-list/edit/?contactsListId=' + contactsList.id }>
							{ contactsList.title } 
						</Link>
						<br/>
					</>
				)
			)
		}
		else{
			return(
				<>
					No contacts list found. Create one.
				</>
			)
		}
	}

	// contacts lists
	useEffect( () => {

		const getLists = async () => {
			const userId = getUser().userId;
			const lists = await getContactsLists( userId );

			setContactsLists( lists );
		}
		getLists();

	}, [] );

	return (
		<>
				<Header />
				<Sidebar />	
				        <div className="content-body">

				<Breadcrumbs />
				
				<div className="container-fluid" style={{ minHeigth: '600px' }}>
                <div className="row">
                    <div className="col-lg-12">
						<h3>{ pageTitle }</h3>
						<br />
                        <div className="card">
                            <div className="card-body">
                               <Link to='/contacts-list/create'>+ Create a contacts list </Link> &nbsp;
                            </div>
                        </div>
						<div className="card">
                            <div className="card-body">
								<BuildContactslists />
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

export default ContactsLists;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { SiteContext } from "../context/site";


const SecuredPagesAuth = () => {
	const navigate 				= useNavigate();
	const { isAuthenticated }	= useContext( AuthContext );
	const { setReferrer } 		= useContext( SiteContext );
	const securedPagesPath 	= [
		'/project/edit',
		'/project/sent',
		'/project/view',
		'/project/received'
	]

	const location 		= useLocation();
	const currentPage 	= location.pathname;
// alert( isAuthenticated() );
	const [authenticate, setAuthenticate ] = useState( isAuthenticated() );
	useEffect(() => {
		if( ( securedPagesPath.filter( ( path ) => currentPage.includes( path ) ).length  ) && !authenticate ) {
			setReferrer( currentPage );
			navigate( '/login' )
		}
	}, [authenticate]);
	
	return (
		<></>
	);
};

export default SecuredPagesAuth;

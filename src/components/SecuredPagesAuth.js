import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { SiteContext } from "../context/site";


const SecuredPagesAuth = () => {
	const navigate 				= useNavigate();
	const { isAuthenticated }	= useContext( AuthContext );
	const { setReferrer } 		= useContext( SiteContext );
	const securedPagesPath 	= [
		'/commander',
		'/mon-espace',
		'/mon-espace/historique',
		'/mon-espace/changer-de-mot-de-passe'
		
	]

	const location 		= useLocation();
	const currentPage 	= location.pathname;
	const [authenticate, setAuthenticate ] = useState( isAuthenticated() );
	
	useEffect(() => {
		if( securedPagesPath.includes( currentPage ) && !authenticate  ){
			setReferrer( currentPage );
			navigate( '/connexion' )
		}
	}, [authenticate]);
	
	return (
		<></>
	);
};

export default SecuredPagesAuth;

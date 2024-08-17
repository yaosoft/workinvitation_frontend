import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import { Space, Spin } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';
export const SiteContext = createContext();


export const SiteProvider = ({ children }) => {

	// spiner
	const [ spiner, setSpiner ] = useState( 'none' );

	// helper: Fetch data definition
	async function fetchData( url, data, method ) {
		setSpiner( 'block' )
		const response = await fetch( url, {
			method: method, // *GET, POST, PUT, DELETE, etc.
			// mode: "no-cors", // no-cors, *cors, same-origin
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify( data ), // body data type must match "Content-Type" header
		});
		setTimeout( setSpiner, 2000, 'none' );
		if( response.status != 200 )
			return false;
		
		if( response.status == 200 ){

			if( method == 'GET' )
				return response.json(); // parses JSON response into native JavaScript objects
			
			if( method == 'POST' )
				return true;

		}
	}
	
	// site
	const [ site, setSite ] = useState( {} );

	// set user referrer before redirection to login page
	const setReferrer = ( url ) => {
		site[ 'referrer' ] = url;
	}
	
	// get user referrer
	const getReferrer = () => {

		return site.referrer;
	}
	
	// get site url
	const siteURL = 'https://www.237usa.com';
	
	// contact
	const [ contact, setContact ] = useState( {} );
	
	// contacts
	const [ contacts, setContacts ] = useState( [] );

	return (	
	
		<SiteContext.Provider 
			value={{ 
				setReferrer,
				getReferrer,
				contact,
				setContact,
				contacts,
				setContacts,
				siteURL,
			}}
		>
		
			<Space
				style={{ display: spiner }}
			>
				<Spin
					indicator={
						<LoadingOutlined
							style={{
									display:		spiner,
									fontSize: 		100,
									color: 			'#fcb800'
								}}
							spin
						/>
					}
					fullscreen
					tip		= "loading" 
					size	= "large"
			/>
			
		</Space>

		{children}

		</SiteContext.Provider>

	);
	
	
	
};

SiteProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
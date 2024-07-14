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
export const ProjectContext = createContext();


export const ProjectProvider = ({ children }) => {

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
			...( method == 'POST' && { body: JSON.stringify( data ), } )
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
	
	const getCategories = async () => {
		const productApiURL		= 'http://localhost/diamta/projects/public/index.php/api/categories/list';
		const data 		= {};
		const method	= 'GET';
		
		const categories = await fetchData( productApiURL, data, method );

		return categories;
		
	}

	return (	
	
		<ProjectContext.Provider 
			value={{ 
				getCategories,
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
					tip		= "chargement" 
					size	= "large"
			/>
			
		</Space>

		{children}

		</ProjectContext.Provider>

	);
	
	
	
};

ProjectProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
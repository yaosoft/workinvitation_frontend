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
export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

	const base_api_url	= 'http://localhost/diamta/projects/public/index.php/api/'; 
	// const base_api_url = 'https://diamta.com/projects/public/index.php/api/'
	
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
// alert( response.status );
		if( response.status != 200 )
			return false;
		
		if( response.status == 200 ){
			return response.json(); // parses JSON response into native JavaScript objects
			// if( method == 'GET' )
				// return response.json(); // parses JSON response into native JavaScript objects
			
			// if( method == 'POST' )
				// return true;

		}
	}
	
	// save a chat message
	const saveMessage = async ( data ) => {
		const url 		= base_api_url +  'chat/save/message';
		const method 	= 'POST';
console.log( 'saveMessage', data ); 
		const resp 		= await fetchData( url, data, method );

		return resp.id;
	}

	// save a chat file
	const saveFile = async ( data, fileList ) => {
		const url 		= base_api_url +  'chat/save/file';
		const formData 	= new FormData();
		const method  	= 'POST';
		// Append files

		fileList.forEach( ( file ) => {
			formData.append( 'files[]', file.originFileObj )
		});

		// Append data
		for ( var key in data ) 
			formData.append(key, data[key]);

		// Post
		// const resp = await fetchData( url, formData, method )
		// setSpiner( 'block' );
		const resp = await fetch( url, {
			method: 'POST',
			body: formData,
		})
		setTimeout( setSpiner, 2000, 'none' );
		return resp;
	};

	// get messages
	const getMessages = async ( userId, projectId ) => {
		
		const url		= base_api_url + 'chat/getMessages?userId=' + userId + '&projectId=' + projectId;
		const data 		= {};
		const method	= 'GET';

		const messages = await fetchData( url, data, method );
		return messages;
	}

	// delete a chat message
	const deleteChatMessage = async ( messageId ) => {
		
		const url		= base_api_url + 'chat/deleteChatMessage?messageId=' + messageId;
		const data 		= {};
		const method	= 'GET';

		const messages = await fetchData( url, data, method );
		return messages;
	}

	// delete a chat file
	const deleteChatFile = async ( messageId ) => {
		
		const url		= base_api_url + 'chat/deleteChatFile?messageId=' + messageId;
		const data 		= {};
		const method	= 'GET';

		const messages = await fetchData( url, data, method );
		return messages;
	}

	return (	
	
		<ChatContext.Provider 
			value={{ 
				saveMessage,
				saveFile,
				getMessages,
				deleteChatMessage,
				deleteChatFile
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

		</ChatContext.Provider>

	);
	
	
	
};

ChatProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
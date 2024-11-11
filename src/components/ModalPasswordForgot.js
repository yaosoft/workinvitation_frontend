import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { SiteContext } from "../context/site";
import '../modalOverrides.css';
import { Modal } from 'react-responsive-modal';

import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const ModalPasswordForgot = ( params ) => {
	
	const [ code, setCode ] = useState( '' );
	const [ userId, setUserId ] = useState( '' );
	
	const [ resetCode, setResetCode ] = useState( '' );
	
	// send
	const navigate = useNavigate();
	const handleClickBtnSend = () => {
		if( ! ( resetCode == code ) ){
			message.error( 'Your code is not correct. Try again .' );
		}
		else{
			message.success( 'Your code is correct' );
			document.getElementsByClassName( 'react-responsive-modal-closeButton' )[0].click();
			
			navigate( '/password/forgot/update/?userId=' + userId );
		}
	}
	
	// change
	const handleChangeCode = ( e ) =>{
		setResetCode( e.target.value );
	}

	useEffect( () => {
		setCode( params.params.code );
		setUserId( params.params.userId );
console.log( params );
	}, [] );

	return (
		<>
			<div style={{ height: '350px' }}>
				<p>Password reset code</p>
				<input 
					value 		= { resetCode }
					onChange 	= { e => handleChangeCode( e ) }
					type 		= "text" 
					className	= "form-control" 
					id			= "code"
					style		= {{ width: '96%' }}
				/>
				<br/>
				<Button
					className	= "btn btn-success"
					onClick		= { e => handleClickBtnSend( e ) }
				>
					Send
				</Button>
			</div>
		</>
	);
};

export default ModalPasswordForgot;

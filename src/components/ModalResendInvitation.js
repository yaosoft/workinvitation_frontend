import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { SiteContext } from "../context/site";
import '../modalOverrides.css';
import { ProjectContext } from '../context/Project';

import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const ModalResendInvitation = ( params ) => {

	const [ project, setProject ] 				= useState( params.params.project );
	const [ receiverEmail, setReceiverEmail ] 	= useState( params.params.receiverEmail );

	const { invitationResend }	= useContext( ProjectContext );

	// Send invitation
	const handleClickSend = async() => {
		const rep = await invitationResend( project.id, receiverEmail );
		if( !rep ){
			message.error( 'Error' );
		}
		else{
			message.success( 'Invitation sent' );
		}
			
		window.document.getElementsByClassName( 'react-responsive-modal-closeButton' )[0].click(); // Todo: react way
	}

	// Helper: truncate 
	function truncateString(str, maxLength) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength - 3) + '...';
		}
		return str;
	}

	// get existing contacts
	useEffect( () => {
		console.log( 'project', project );
	}, [project] );

	return (
		<>
					<div className="modal-dialog" role="document">
						<div className="modal-content" >
							<div className="modal-header">
								<h5 className="modal-title">Resend invitation</h5>
								
							</div>
							<div className="modal-body">
								<div className="card">
									<div className="card-body">
										<b>Project title:</b> { truncateString( project.title, 100 ) }
										<br/>
										<b>Description:</b> { truncateString( project.description, 150 ) }
										<br/>
										<b>Guest worker:</b> { receiverEmail }
									</div>
								</div>

							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
								<button 
									type	= "button" 
									className	= "btn btn-success"
									onClick = { e => handleClickSend( e ) }
								>
									Resend Invitation
								</button>
							</div>
						</div>
					</div>
		</>
	);
};

export default ModalResendInvitation;

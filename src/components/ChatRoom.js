import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';
import { ChatContext } from '../context/Chat';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import '../sidebarOverrides.css';
import '../chatStyles.css';
import ModalChatBox from './ModalChatBox';

import '../modalOverrides.css';
import '../chatStylesOverrides.css';

const ChatRoom = ( params ) => {
// console.log( 'ChatRoomParams', params );	
	const [ msgerChat, setMsgerChat ] = useState( document.createElement("div") );
	
	const { getUser }	= useContext( AuthContext );

	// project chat message
	// const { projectMessages } = useContext( ChatContext );
	const { 
		getMessages,
		setProjectMessages,
		projectMessages,
		currentIntervalId,
	} = useContext( ChatContext );


	// product id
	const [searchParams, setSearchParams] = useSearchParams();
	const [ projectId, setProjectId ] = useState( searchParams.get( 'projectId' ) );
	const [ project, setProject ] = useState( params.params.project );
	
	// user
	const userId = getUser() ? getUser().userId : 0;

	// setIsOwner
	const [ isOwner, setIsOwner ] = useState( params.params ? params.params.isOwner : '' );

	// chat messages
	// const [ chatMessages, setChatMessages ] 			= useState( [] );
	const [ messageReceiverId, setMessageReceiverId ] 	= useState( '' );
	const [ messageUserId, setMessageUserId ] 			= useState( '' );

	// messageId
	const [ messageId, setMessageId ] = useState( '' );

	// chat textarea
	const [ chatMessage, setChatMessage ] = useState( '' );
	const handleChangeChatMessage = ( e ) => {
		const data = e.target.value;

		setChatMessage( data )
	}

	// get unread messages
	const getProjectUnread = ( messageReceiverId, messageUserId ) => {
		var unread = 0;
		if( !projectMessages ){
console.log( 'No projectMessages!' );
			return;
		}

		for( const message of projectMessages ){
			if( 
				message.messageReceiverId 	== userId && 
				message.messageUserId 		== messageUserId &&
				!message.viewed )
				unread ++
		}
		return unread;
	}
	
	const [ chatDialogs, setChatDialogs ] = useState( [] ); // one message per project's chat messages
	const BuildChatRoomDialog = () => {
// console.log( '>><<<>>><<< chatMessages', chatMessages );
		var count			= 0;
		var count_unread 	= 0;
		return (
			chatDialogs.map( ( message ) => 
				<div className= { 'msg ' + message.side + '-msg' }>
					<div
						className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg' }} >
					</div>
					<div className={ 'msg-bubble' }> 
						<div className={ 'msg-info' } >
						  <div className={ 'msg-info-name' }> { message.messageUserName }</div>
						  <div className={ 'msg-info-time' }> { message.displayDate }</div>
						</div>
						<div>{ message.message }</div>
					</div>
						<a title='Open the dialog'  style={{ color: 'blue', cursor: 'pointer' }}  onClick={ (e) => handleClickOpenDialog( message.messageUserId, message.messageReceiverId ) }>Open the dialog ( { getProjectUnread( message.messageReceiverId, message.messageUserId ) + ' new'} )&nbsp;&nbsp;</a>
				</div>
			)
		)
	}

	// set the 2 dialog members for the chatbox
	const handleClickOpenDialog = ( messageReceiverId, messageUserId ) => {	// inversion: sender will be receiver and receiver will be sender
		setMessageReceiverId( messageReceiverId );
		setMessageUserId( messageUserId );
		setOpenModalChatBox( true );
	}

	// chat Message Owner
	const [ chatMessageOwnerId, setChatMessageOwnerId ] 		= useState( '' );
	const [ chatMessageReceiverId, setChatMessageReceiverId ] 	= useState( '' );
	
	// Modal
	const [ openModalChatBox, setOpenModalChatBox ] = useState(false);
	const onOpenModalChatBox  	= () => setOpenModalChatBox(true);
	const onCloseModalChatBox 	= async () => {

		window.clearInterval( currentIntervalId );
		setOpenModalChatBox(false)
	};

	useEffect( () => {
		const elt = document.getElementsByClassName( 'msger-chat' )[ 0 ];
		// setMsgerChat( elt );
		const projectObj = params.params.project;
		setProject( projectObj );
		const owner = params.params.isOwner;
		// setIsOwner( true );
		// chat message's sender / receiver
		if( owner === false ){
			setChatMessageOwnerId( userId );
			setChatMessageReceiverId( projectObj.ownerId );
		}
		else{
			setChatMessageOwnerId( projectObj.ownerId );
			setChatMessageReceiverId( userId );
		}
		
		
	}, [projectId] );
	
	
	useEffect( () => {
		// set chatroom messages

		
		const getChatDialogs = async () => {
			const messages = await getMessages( userId, projectId );
// console.log( '>>>>>>> messages', messages );
			setProjectMessages( messages );
			const messageListId = Array();
			const dialogs = Array();

			// Get one message for each project's chat messages
			for( const message of messages ){
				if( !messageListId.includes( message.messageUserId ) ) {
					messageListId.push( message.messageUserId );
					if( message.messageUserId != userId )
						dialogs.push( message )
				}
			}
			setChatDialogs( dialogs );
		}

		getChatDialogs()
 
		//if( projectMessages.length == 0 )
		//	getChatDialogs()
		//else
		//	setChatDialogs( projectMessages );
	}, [] );
	
	
	return (
	<>
			<Modal open={ openModalChatBox } onClose={ onCloseModalChatBox } center>
				<ModalChatBox params =
					{{
						messageId:				messageId,
						project: 				params.params.project,
						isOwner: 				params.params.isOwner,
						messageReceiverId:	 	messageReceiverId,
						messageUserId:		 	messageUserId,
					}}
				/>
			</Modal>

			<div className="row">
						<div className="col-lg-12">
							<div className="row">
								<div className="col-12">
									<div className="card">
										<div className="card-body pb-0 d-flex justify-content-between">
											<div style={{ width: '100%' }}>
												<h4 className="mb-1">Communication and files</h4>
												
												
												
		  <main className="cd__main">
			
			 <section className="msger">
	  <header className="msger-header">
		<div className="msger-header-title">
		  <i className="fas fa-comment-alt"></i>Project's messages ( <span id='countMessages'></span> )
		</div>
		<div className="msger-header-options close">
		  <span><i className="fas fa-cog"></i></span>
		</div>
	  </header>

	  <div className="msger-chat" id="msgerchat">
		
		<div className="msg right-msg">
		  <div
		   className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg' }} ></div>

		  <div className="msg-bubble">
			<div className="msg-info">
			  <div className="msg-info-name">Diamta</div>
			  <div className="msg-info-time"><span id='curentTime'>12:45</span></div>
			</div>

			<div className="msg-text">
			  Hi Foo UserName, welcome to your project's Chat room! Go ahead and open a dialog.
			</div>
		  </div>
		</div>
		<BuildChatRoomDialog />
	  </div>
	  
	  <div id='chatMsgMenu' style={{ height: '70px', padding: '5px', borderTop: '0.5px solid silver', display: 'none' }}>
		<p id='chatMsgUserId'>Message sender</p> 
		<p><div id='chatMsgResponse' style={{ width: '95%', border: 'none', display: 'inline-block', float: 'left' }}></div><a title='close' id='responseFinishBtn' style={{ cursor: 'pointer' }}>X</a></p>
	  </div>  
	  <div title='close' id='chatFilesPreviewContainer' style={{ height: '50px', width: '100%', display: 'inline-block', display: 'none' }}>
	  <div id='chatFilesPreview' style={{ padding: '5px', borderTop: '0.5px solid silver', width: '98%', float: 'left' }}>
	  </div><div id='chatFilesPreviewFinishBtnDiv' style={{ width: '2%', float: 'left' }}><a title='close' id='chatFilesPreviewFinishBtn' style={{ cursor: 'pointer' }}>X</a></div></div>
	
	</section>
		   
		  </main>	
												
												<br />
												
			
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
	</>
		);
};
export default ChatRoom;


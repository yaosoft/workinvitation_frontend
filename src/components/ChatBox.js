
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';
import { ChatContext } from '../context/Chat';
import { SiteContext } from '../context/site';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';

import '../sidebarOverrides.css';
import '../antUpload.css';


import '../chatStyles.css';

import { Space, Spin, Button, notification, message, Popconfirm, Radio, Flex, DatePicker, Image, Upload } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined,
	InboxOutlined, 
	QuestionCircleOutlined
} from '@ant-design/icons';


const ChatBox = ( params ) => {
// console.log( 'params', params );

	// 
	const [ spinerDisplay, setSpinerDisplay ]	= useState( 'block' );

	const { 
		siteURL, 
		mySocket, 
		isTabReactivated,
		isTabActive,
		socketMessage,
	}	= useContext( SiteContext );

	const { 
		saveMessage, 
		saveFile, 
		getMessages, 
		userUnreadMessages,
		deleteChatMessage, 
		deleteChatFile, 
		updateMessagesRead,
		setProjectMessages,
		projectMessages,
		getUserUnreadMessages,
		setUserUnreadMessages
	} = useContext( ChatContext );

	const { getUser }	= useContext( AuthContext );

	// chat Message receiver ( interlocutor )

	const [ chatMessageReceiverId, setChatMessageReceiverId ] = useState( params.params.messageReceiverId );
	// project
	const [ searchParams, setSearchParams ] = useSearchParams();
	const [ projectId, setProjectId ] 		= useState( params.params.project.id );
	const [ project, setProject ] 			= useState( params.params.project );

	// setIsOwner
	const [ isOwner, setIsOwner ] = useState( params.params.isOwner );	

	// user
	const userId = getUser().userId;

	// chat messages
	const [ chatMessages, setChatMessages ] = useState( [] );

	// chat textarea
	const [ chatMessage, setChatMessage ] = useState( '' );
	const handleChangeChatMessage = ( e ) => {
		const data = e.target.value;
		setChatMessage( data )
	}

	// chat menu
	const [ displayChatMenu, setDisplayChatMenu ] = useState( 'none' );
	const handleClickCloseChatMenu = () => {
		setDisplayChatMenu( 'none' )
	}

	// chat title
	const truncateString = ( str, maxLength ) => {// truncate string
		if (str.length > maxLength) {
			return str.slice(0, maxLength - 3) + '...';
		}
		return str;
	}
	const titleText = params.params.project.title ? params.params.project.title : 'Project title';
	const title = truncateString( titleText, 80 );
	const [ chatTitle, setChatTitle ] = useState( title );

	// reply div's user name
	const [ replyUserName, setReplyUserName ] = useState( '' );
	
	// reply div's message
	const [ replyContent, setReplyContent ] = useState( '' );
	
	// replied message id
	const [ chatRepliedMsgId, setChatRepliedMsgId ] = useState( '' );
	
	// replied image id
	const [ chatRepliedImageId, setChatRepliedImageId ] = useState( '' );

	// replied image display
	const [ repliedImageDisplay, setRepliedImageDisplay ] = useState( 'none' );
	
	//replied image path
	const [ repliedImagePath, setRepliedImagePath ] = useState( 'none' );
	
	// message is read
	const [ isRead, setIsRead ] = useState( [] );
	
	// chatbox element
	const [ chatBox, setChatbox ] = useState( '' );

	// reply to a chat's message
	const handleClickReply = ( msg, msgid, type, displayName, path ) => {
		clearEntries();
		setDisplayChatMenu( 'block' );
		setReplyUserName( displayName );
		
		if( type == 'file' ){
			const src = siteURL + '/uploads/files/chat/' + path;
			setRepliedImageDisplay( 'block' );
			setChatRepliedImageId( msgid );
			setRepliedImagePath( src )
		}
		else{
			setReplyContent( msg );
			setChatRepliedMsgId( msgid );
		}
		
	}

	// scroll up to the replied message
	const handleClickReplyed = ( messageId ) => {
		const elt = window.document.getElementById( messageId );
// console.log( messageId );
		// const message 	= messagesPositions.filter( ( messagePosition => messagePosition.messageId == messageId ) )[ 0 ];
		// const position 	= message.topPosition;
		
		elt.scrollIntoView( { behavior: "smooth", block: "end", inline: "nearest" } );

	}

	// File uploader
	const { Dragger } = Upload;
	const [ fileList, setFileList ] = useState([]);
	const props = {
		listType: 'picture',
		fileList: fileList,
		multiple: true,
		beforeUpload : ()=> {
			/* update state here */
			return false; 
		},
		onChange(info) {
			info.file.status = 'success';
			let newFileList = [...info.fileList];
			setFileList( newFileList );
			console.log(info.file, info.fileList);
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	// Chat Files
	const [ chatFiles, setChatFiles ] = useState( [] );

	// group images by lot
	const [ alreadyDisplayedLot, setAlreadyDisplayedLot ] = useState( [] );
	const getGroupedImages = ( lot, type ) => {
		if( alreadyDisplayedLot.includes( lot ) )
			return []
		
		const lotFiles = chatMessages.filter( ( message ) => message.type == 'file' && message.lot == lot );
		alreadyDisplayedLot.push( [ lot, type ] );
		setAlreadyDisplayedLot( alreadyDisplayedLot );
		
		return lotFiles
	}

	// message position in chat
	const [ messagesPositions, setMessagesPositions ] = useState( [] );

	// imageExtentions
	const imageExtentions = [ 'jpg', 'gif', 'png', 'jpeg' ];
	
	// get a file extension's icone
	const getExtensionIcon = ( extension ) => {	// todo: put this in a composant

		if( extension == 'css' )
			return 'cssIcon.png';
		else if( extension == 'csvIcon' )
			return 'csvIcon.png';
		else if( extension == 'docm' )
			return 'docIcon.png';
		else if( extension == 'docx' )
			return 'docIcon.png';
		else if( extension == 'dot' )
			return 'docIcon.png';
		else if( extension == 'dotm' )
			return 'docIcon.png';
		else if( extension == 'dotx' )
			return 'docIcon.png';
		else if( extension == 'html' )
			return 'htmlIcon.png';
		else if( extension == 'htm' )
			return 'htmlIcon.png';
		else if( extension == 'mhtml' )
			return 'htmlIcon.png';
		else if( extension == 'mht' )
			return 'htmlIcon.png';
		else if( extension == 'pdf' )
			return 'pdfIcon.png';
		else if( extension == 'rtf' )
			return 'textIcon.png';
		else if( extension == 'txt' )
			return 'textIcon.png';
		else if( extension == 'xml' )
			return 'xmlIcon.png';
		else if( extension == 'xls' )
			return 'excelIcon.png';
		else if( extension == 'xlsx' )
			return 'xmlIcon.png';
		else if( extension == 'mp4' )
			return 'mp4Icon.png';
		else if( extension == 'ppt' )
			return 'pptIcon.png';
		else if( extension == 'pptx' )
			return 'pptIcon.png';
		else if( extension == 'wmv' || extension == 'wmf'  )
			return 'mpegIcon.png';
		else if( extension == 'js' )
			return 'jsIcon.png';
		else if( extension == 'json' )
			return 'jsonIcon.png';
		else if( extension == 'sql' )
			return 'sqlIcon.png';
		else if( extension == 'zip' )
			return 'zipIcon.png';
		else if( extension == 'rar' )
			return 'rarIcon.png';
		else return 'filesIcon.png';
	}

	// Set unreads messages alerts with setUserUnreadMessages in Chat context
	const setUnreads = async( ) => {
		const unreadMessages = await getUserUnreadMessages( userId );
// console.log( 'unreadMessages', unreadMessages );
		if( unreadMessages ){
			setUserUnreadMessages( unreadMessages );
		}
	}

	// Load messages
	const loadMessages = async ( messagesToLoad ) => {

		setSpinerDisplay( 'block' );
		
		// if( !chatBox ){
// console.log( 'No chatBox' );
			// return;
		// }
		
console.log( 'loading messages ...' );

		var messages = [];
		if( messagesToLoad === undefined ){
			messages = await getMessages( userId, projectId );
		}
		else{
			messages = messagesToLoad;
		}
console.log( '---- messages', messages );
		
		if( !messages ){
console.log( 'No message found' );
			return;
		}

		const thechatBox = await window.document.getElementById( "msgerChatbox" );

//console.log( 'params.params', params.params );
		// Note: params.params.messageReceiverId is the project receiver id
		// if current user is the project owner (in a modal): The project owner receive message from numtiple project worker, then we must get only his message with the selected dialog worker
//  console.log( 'params.params.messageReceiverId', params.params );
		if( params.params.isOwner ){ // current is the project owner
			// params.params.messageUserId == interlocuteur in the dialog with the owner wich can have many
			const chatBoxMessages = await messages.filter( ( message => 
				( message.messageUserId == params.params.messageUserId ) && ( message.messageReceiverId == params.params.messageReceiverId ) ||
				( message.messageReceiverId == params.params.messageUserId ) && ( message.messageUserId == params.params.messageReceiverId )
			));

			setChatMessages( chatBoxMessages );
// console.log( 'chatBoxMessages', chatBoxMessages );
			
			
			chatboxScrollingListener( thechatBox, chatBoxMessages );
			
			// check new opened message
			await setViewed( thechatBox, chatBoxMessages );
			// scroll down the chatbox
			setTimeout( scrollToMessage, 2000 ); //
		} // if current user is a project worker: the project worker receive messages only from the project owner 
		else{				// current user is the receiver
			setChatMessages( messages ); 

			// chatboxScrollingListener( thechatBox, messages );// To do: settimeout
			setTimeout( chatboxScrollingListener, 2000, thechatBox, messages );

			// check new opened message
			await setViewed( thechatBox, messages );
			// scroll down the chatbox
			setTimeout( scrollToMessage, 2000 ); //
		}

// console.log( 'ChatMessages', chatMessages );
		// ind = 1;
	}
	
	// chatbox scrolling listener
	const chatboxScrollingListener = ( chatBox, messages ) => {
		// Check viewed messages listener on scroll
		chatBox.onscroll = async function(){
console.log( 'chatBox scrolled...' );
			await setViewed( chatBox, messages );

		}
	}

	// send websocket message
	const sendWsMessage = async() => {
		const wsMessage = userId + '*' + chatMessageReceiverId;
// alert( userId + '*' + chatMessageReceiverId );
		mySocket.send( wsMessage );		// mySocket is initializeded in Chat context
	}

	// delete a chat text message
	const handleClickDeleteChatMessage = async ( messageId ) => {
		const rep = await deleteChatMessage( messageId );
		
		// send websocket message
		sendWsMessage();

		// reload message in the chatbox
		await loadMessages();
	}

	// delete a chat file message
	const handleClickDeleteChatFile = async ( messageId ) => {
		const rep = await deleteChatFile( messageId );
		
		// send websocket message
		sendWsMessage();

		// reload message in the chatbox
		await loadMessages();
	}

	// build chat dialog
	const BuildChatDialog = () => {

		var count			= 0;
		var count_unread 	= 0;

		return (
			chatMessages.map( ( message ) => 
				<div className= { 'msg ' + message.side + '-msg' } {...{ "id": message.type + "_" + message.messageId }} >
					<div
						className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg' }} >
					</div>
					<div className={ 'msg-bubble' }> 
						{
							message.type == 'text' &&
							<>
								{ 
									message.repliedMessage.category && message.repliedMessage.category == 'B' &&
									<div 
										className={ 'msg-reply' } 
										style={{ cursor: 'pointer' }} 
										onClick={ e => handleClickReplyed( message.repliedMessage.messageId ) }
									>
										<div className={ 'msg-info' } >
										  <div className={ 'msg-info-name' }> { message.repliedMessage.userId == userId ? 'You' : message.repliedMessage.name }</div>
										</div>
										<div style={{ whiteSpace: 'pre-wrap'}}>{ message.repliedMessage.replied_message }</div>
									</div>
								}
								<div className={ 'msg-info' } >
									{ 
										message.messageUserId != userId &&
										<div className={ 'msg-info-name' }> { message.messageUserName }</div>
									}
									<div className={ 'msg-info-time' }> { message.displayDate }</div>
								</div>
								<div style={{ whiteSpace: 'pre-wrap'}}>{ message.message }</div>
								
								{ 
									message.isReceiver === false &&
									<>
									{
										message.viewed ?
											<a title='read'>
												<i className='fa fa-eye-slash text-success' >&nbsp;</i>
											</a>
										:
											<a title='not read'>
												<i className='fa fa-eye-slash' style={{ color: '#C8C8C8' }} >&nbsp;</i>
											</a>
									}
									</>
								}
								{
									message.messageUserId != userId && 
									<a 
										title	= 'reply' style={{ color: 'blue', cursor: 'pointer' }} 
										onClick	= { e => handleClickReply( message.message, message.messageId, message.type, message.messageUserName, message.path) } 
									>
										reply
									</a>
								}
								{ 
									message.canbedeleted == '1' && message.messageUserId == userId && 
										<Popconfirm
											title		= 'Delete'
											description	= 'Do you really want to delete this message?'
											onConfirm	= { e => handleClickDeleteChatMessage( message.messageId ) }
											okText		= 'Yes'
											cancelText	= 'No'
													
										>
											<a 
												title	= 'delete' style={{ color: 'blue', cursor: 'pointer' }} 
											>
												<span className="btn-icon-right">
													<i className="fa fa-trash"></i>
												</span>
											</a>
										</Popconfirm>
								}
							</>
							
						}
						{
							message.type == 'file' &&
							<>
								{ 
									message.repliedFile.category && message.repliedFile.category == 'D' &&
									<div className={ 'msg-reply' } style={{ cursor: 'pointer' }} >
										<div className={ 'msg-info' } >
										  <div className={ 'msg-info-name' }> { message.repliedFile.userId == userId ? 'You' : message.repliedFile.name }</div>
										</div>
										<div>{ message.repliedFile.replied_message }</div>
									</div>
								}
								{ 
									message.repliedFile.category && message.repliedFile.category == 'E' &&
									<div 
										className	= { 'msg-reply' } 
										style		= {{ cursor: 'pointer' }} 
										onClick		= { e => handleClickReplyed( message.repliedFile.messageId )}
									>
										<div className={ 'msg-info' } >
											<div className={ 'msg-info-name' }> 
												{ message.repliedFile.userId == userId ? 'You' : message.repliedFile.name }
											</div>
										</div>
										<div>
											{ 
												imageExtentions.includes( message.repliedFile.replied_fileExt ) ?
													<img style={{ maxWidth: '200px' }} src={ siteURL + '/uploads/files/chat/' + message.repliedFile.replied_fileSrc } />
												:
													<img style={{ maxWidth: '200px' }} src={ siteURL + '/img/' + getExtensionIcon( message.repliedFile.replied_fileExt ) } />
											}
										</div>
									</div>
								}
								<div className={ 'msg-info' } >
									{ 
										message.messageUserId != userId &&
										<div className={ 'msg-info-name' }> { message.messageUserName }</div>
									}
									<div className={ 'msg-info-time' }> { message.displayDate }</div>
								</div>
								
								<div className="msg-text">
								{
									getGroupedImages( message.lot ).map( ( message ) =>
										<div className='row' style={{ marginLeft: '1%' }}>
											<div className='row'>
												<a target='_blanc' href= {  siteURL + '/uploads/files/chat/' + message.path } download>
													
													
													{ 
												imageExtentions.includes( message.fileExtension ) ?
													<img style={{ maxWidth: '200px' }} src={  siteURL + '/uploads/files/chat/' + message.path } />
												:
													<img style={{ maxWidth: '200px' }} src={ siteURL + '/img/' + getExtensionIcon( message.fileExtension ) } />
													}
													
												</a>
												<br/>
												<a target='_blanc'  href={ siteURL + '/uploads/files/chat/' + message.path } download>
													{ message.fileName }
												</a>
											</div>
											<div className='row'>
												<br/> { message.size.toFixed(2) } mo
												<br/><br/>
												{ 
													message.isReceiver === false &&
													<>
														{
															message.viewed ?
																<a title='read'>
																	<i className='fa fa-check text-success' >&nbsp;</i>
																</a>
															:
																<a title='not read'>
																	<i className='fa fa-eye-slash' style={{ color: '#C8C8C8' }} >&nbsp;</i>
																</a>
														}
													</>
												}
												{
													message.messageUserId != userId && 
													<a 
														title	= 'reply' style={{ color: 'blue', cursor: 'pointer' }} 
														onClick	= { e => handleClickReply( message.message, message.messageId, message.type, message.messageUserName, message.path) } 
													>
														reply
													</a>
												}
												{ 
													message.canbedeleted == '1' && message.messageUserId == userId && 
														<Popconfirm
															title		= 'Delete'
															description	= 'Do you really want to delete this file?'
															onConfirm	= { e => handleClickDeleteChatFile( message.messageId ) }
															okText		= 'Yes'
															cancelText	= 'No'
																	
														>
															<a 
																title	= 'delete' style={{ color: 'blue', cursor: 'pointer' }} 
															>
																<span className="btn-icon-right">
																	<i className="fa fa-trash"></i>
																</span>
															</a>
														</Popconfirm>
												}
											</div>
										</div>
									)
								}
								</div>

							</>
						}
					</div>
						
				</div>
			)
		)
	}

	

	// chat send message or file
	const handleClickSendChatMessage = async( e ) => {
		e.preventDefault();
		
		// Nothing to save
		if( !chatMessage && !fileList.length ){ // file message
			message.error( 'Nothing to do.' )
			return
		}

		// scroll to the bottom
		const elt =  window.document.getElementById( 'messagesEnd' );
		await elt.scrollIntoView( { behavior: "smooth", block: "end", inline: "nearest" } );

		var rep = '';
// console.log( 'project', project );
		// text message
		if( chatMessage ){	
			const data = {
				message_text 		: chatMessage,
				receiver_id			: chatMessageReceiverId,
				userId				: userId,	// sender
				project_id			: project.id,
				replied_msg_id		: chatRepliedMsgId,
				replied_file_id		: chatRepliedImageId,
			};						
			rep = await saveMessage ( data );									
		}

		// file message
		if( fileList.length ){ 
		
			const data = {
				receiver_id			: chatMessageReceiverId,
				userId				: userId,	// sender
				project_id			: project.id,
				replied_msg_id		: chatRepliedMsgId,
				replied_file_id		: chatRepliedImageId,
			};	
			rep = await saveFile ( data, fileList );
		}
		
		
		// load message in the chatbox
		loadMessages()
		
		// transmit to websocket canal
		sendWsMessage();
		
		// clear
		clearEntries();

	}

	// clear
	const clearEntries = () => {
		setFileList( [] );
		setChatMessage( '' );
		setDisplayChatMenu( 'none' );
		setRepliedImageDisplay( 'none' );
		setReplyContent( '' );
	}

	
	// websoket send a message
	// sendWsMessage();
	
	// Chatbox settings
	useEffect( () => {
		// Chatbox scroll listener
		const getChatBox = async () => {
			const thechatBox = await window.document.getElementById( "msgerChatbox" );
			setChatbox( thechatBox );	// set chatbox
			await loadMessages();
		}
		if( !chatBox )
			getChatBox();
	}, [] );

	// Socket message
	useEffect( () => {
		// 
		const getSocketMessage = async () => {
			await loadMessages();
		}
		getSocketMessage() 

	}, [socketMessage] );

	// Chat settings
	useEffect( () => {

console.log( 'isTabReactivated: ' + isTabReactivated );
		// Chatbox scroll listener
		const getChatBox = async () => {
			// load Messages
			await loadMessages();
		}
		if( isTabReactivated )
			getChatBox();

	}, [ isTabReactivated ] );

	// scroll to message
	const scrollToMessage = async() => {
	// console.log( '+++++++++++++++++ params.params', params.params );
		var elt = '';
		if( params.params.messageId ){

			const eltId = params.params.messageId;
			if( window.document.getElementById( 'text_' + eltId ) )
				elt = window.document.getElementById( 'text_' + eltId )
			if( window.document.getElementById( 'file_' + eltId ) )
				elt = window.document.getElementById( 'file_' + eltId )
		}
		const messageToScrollElt = elt ? elt : window.document.getElementById( 'messagesEnd' );
console.log( 'messageToScrollElt', messageToScrollElt )
		await messageToScrollElt.scrollIntoView( { behavior: "smooth", block: "end", inline: "nearest" } );

		setSpinerDisplay( 'none' );
	}


	// Get messages and load in the chat
	//const getProjectMessage = async () => {
		// setSpinerDisplay( 'block' )
		// const ind = 0; 
		// await loadMessages( projectMessages );
		
	// }
	

	// check / persist the user's messages viewed on the chatbox visible area
	const setViewed = async ( chatBox, messages ) => {
// alert( 'setViewed' );

		// check if the browsertab is hiden
		if( !isTabActive )
			return

		var newReadMessageIds = '';
		// chatbox position
		// const chatBox 		= await window.document.getElementById( "msgerChatbox" );
		
		if( !chatBox ){
console.log( 'Chatbox is not ready!' );
			return;
		}

		const chatBoxTop 	= chatBox.offsetTop;
		const chatBoxBottom = chatBoxTop + chatBox.offsetHeight;
		
		// check if message is viewed
		const scrollTop	= chatBox.scrollTop;
		// await messages.map( async( message ) => {
		for( const message of messages ){
			if( message.messageUserId === userId || message.viewed === true ){
				continue;
			}
			// message element
			const messageElt = await window.document.getElementById( message.type + '_' + message.messageId );
			if( messageElt === null ){
// console.log( 'Message Id ' + message.type + '_' + message.messageId + ' is not found' )
				return;
			}

			// message element position
			const messageEltTop 	= messageElt.offsetTop - scrollTop;
			const messageEltBottom 	= messageEltTop + messageElt.offsetHeight;

			if ( ( messageEltTop >= chatBoxTop && messageEltBottom <= chatBoxBottom ) ||
				( messageEltTop <= chatBoxTop && messageEltBottom >= chatBoxBottom )
			){
				const text = message.type + '*' + message.messageId;
				newReadMessageIds = newReadMessageIds + text + '-';
			}
			
		}

		if( newReadMessageIds ){ // unread messages found
// alert( 'newReadMessageIds: ' + newReadMessageIds );
			// persist user read message ( they are unread by default ) 
			await updateMessagesRead( userId, projectId, newReadMessageIds.slice( 0, -1 ) );
			
			// reload the user chatbox
			await loadMessages()
			
			// update total unread messages alert
			await setUnreads();
			
			// update interlocutor chatbox
console.log( '--- sendWsMessage ---' );
			await sendWsMessage();
			
		}
	}

	return (
		<>
			<div className="row">
				<div className="col-lg-12">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body pb-0 d-flex justify-content-between">
									<div style={{ width: '100%' }}>
										<h4 className="mb-1">{ chatTitle }</h4>
										<main className="cd__main">
											<section className="msger">
												<div className="msger-chat" id="msgerChatbox">
													<div className="msg right-msg">
														<div className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg' }} >
														</div>
														<div className="msg-bubble">
															<div className="msg-info">
																<div className="msg-info-name">Diamta</div>
																<div className="msg-info-time"><span id='curentTime'>12:45</span></div>
															</div>
															<div className="msg-text">
																Chat with the project's owner.
															</div>
														</div>
													</div>
													<BuildChatDialog />
													<div id = 'messagesEnd' style={{ float: "left", clear: "both" }} class='foo' >&nbsp;</div>
												</div>
												<p>&nbsp;</p>
												<div style={{ width: "100%", display: "contents", padding: '2%' }}  >
													<div style={{ float: "left", width: "48%", display: "block" }} >
														<div style={{ float: "left", width: "100%", display: "inline" }}>
															<div id='chatMsgMenu' style={{ float: 'left', width: '90%', height: '70px', padding: '5px', borderTop: '0.5px solid silver', display: displayChatMenu }}>
																<p id='chatMsgUserId'>{ replyUserName }</p> 
																<div className='crop' id='chatMsgResponse' style={{ width: '95%', border: 'none', display: 'inline-block', float: 'left' }}>
																	<img src={ repliedImagePath } style={{ display: repliedImageDisplay }} /> { replyContent }
																</div>
																<a title='close' onClick={ handleClickCloseChatMenu } style={{ cursor: 'pointer' }}>X</a>
															</div>  
															<div title='close' id='chatFilesPreviewContainer' style={{ float: 'left', height: '50px', width: '10%', display: 'none' }}>
																<div id='chatFilesPreview' style={{ padding: '5px', borderTop: '0.5px solid silver', width: '98%', float: 'left' }}>
																</div>
																<div id='chatFilesPreviewFinishBtnDiv' style={{ width: '2%', float: 'left' }}>
																	<a title='close' id='chatFilesPreviewFinishBtn' style={{ cursor: 'pointer' }}>X</a>
																</div>
															</div>
														</div>
														<div style={{ float: "left", width: "100%" }}>
															<div style={{ marginTop: '1%', marginLeft: '1%' }}>
																<div style={{ width: '98%', marginLeft: '1%' }} className='row'>
																	<textarea  
																		className	= "msger-input" 
																		style		= {{ whiteSpace: 'pre-wrap', height: '80px' }} 
																		placeholder	= "Enter your message..."
																		onChange 	= { e => handleChangeChatMessage( e ) }
																		value		= { chatMessage }
																	>
																	</textarea>
																</div>
															</div>
														</div>
														<div style={{  float: "left", width: "100%" }}>
															<button 
																style	= {{ width: '25%', whiteSpace: 'pre-wrap', height: '37px',  marginTop: '1%' }} 
																className = "msger-send-btn" 
																id		= "sendBtn"
																onClick	= { e => handleClickSendChatMessage( e ) }
															>
																<i className='fa fa-plane'></i>Send
															</button>
														</div>
													</div>
													<div style={{ float: "left", width: "46%", display: "block", paddingLeft: "2%" }} >
														<Dragger {...props}>
															<p className="ant-upload-drag-icon">
																<i className='fa fa-file' style={{ fontSize: '25px', color: '#808080b5' }}></i>&nbsp;Click or drag here to upload files
															</p>
														</Dragger>
													</div>
												</div>
											</section>
										</main>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Space
				style={{ display: spinerDisplay }}
			>
				<Spin
					indicator={
						<LoadingOutlined
							style={{
									display:		spinerDisplay,
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
		</>
	);
};
export default ChatBox;
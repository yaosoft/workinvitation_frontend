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

	const [ indice, setIndice ] = useState( 0 );
	const [ msgerChat, setMsgerChat ] = useState( document.createElement("div") );
	
	const { siteURL }	= useContext( SiteContext );
	const { getUser }	= useContext( AuthContext );
	const { 
		saveMessage, 
		saveFile, 
		getMessages, 
		projectMessages, 
		deleteChatMessage, 
		deleteChatFile, 
		updateMessagesRead,
	} = useContext( ChatContext );

	var { 
		currentIntervalId
	} = useContext( ChatContext );

	// product id
	const [searchParams, setSearchParams] = useSearchParams();
	const [ projectId, setProjectId ] = useState( searchParams.get( 'projectId' ) );
	const [ project, setProject ] = useState( params.params.project );

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
	
	// unread messages
	const [ unreads, setUnreads ] = useState( [] );
	
	// message is read
	const [ isRead, setIsRead ] = useState( [] );
	
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
console.log( messageId );
		// const message 	= messagesPositions.filter( ( messagePosition => messagePosition.messageId == messageId ) )[ 0 ];
		// const position 	= message.topPosition;
		
		elt.scrollIntoView( { behavior: "smooth", block: "end", inline: "nearest" } );

	}

	// File uploader
	const { Dragger } = Upload;
	const [ uploading, setUploading ] = useState(false);
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
	const getExtensionIcon = ( extension ) => {

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

	// avoid a scroll to occure avary chat reload
	const [ currentScrollTop, setCurrentScrollTop ] = useState( 0 );

	// delete a chat text message
	const handleClickDeleteChatMessage = async ( messageId ) => {
		const rep = await deleteChatMessage( messageId );
	}

	// delete a chat file message
	const handleClickDeleteChatFile = async ( messageId ) => {
		const rep = await deleteChatFile( messageId );
	}

	// build dialog
	const BuildChatDialog = () => {
// console.log( 'chatMessages.map: ' + chatMessages );
		var count			= 0;
		var count_unread 	= 0;
		const userid = getUser.userId;
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



	// chat send message
	const handleClickSendChatMessage = async( e ) => {
		e.preventDefault();
		var rep = '';

		// text message
		if( chatMessage ){		
			const data = {
				message_text 		: chatMessage,
				receiver_id			: chatMessageReceiverId,
				ownerId				: chatMessageOwnerId,
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
				ownerId				: chatMessageOwnerId,
				project_id			: project.id,
				replied_msg_id		: chatRepliedMsgId,
				replied_file_id		: chatRepliedImageId,
			};	
			rep = await saveFile ( data, fileList );
		}
		
		// Nothing to save
		if( !chatMessage && !fileList.length ){ // file message
			message.error( 'Nothing to do.' )
		}
		
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

	// chat Message Owner
	const [ chatMessageOwnerId, setChatMessageOwnerId ] 		= useState( '' );
	const [ chatMessageReceiverId, setChatMessageReceiverId ] 	= useState( '' );

	// chatbox's relative diff 
	const [ relatifDiff, setRelatifDiff ] = useState( 0 );
	
	
	

	// Icons made by Freepik from www.flaticon.com

	var chatIsOpen		= false; // the chat is loaded but the user hevent click on chat modal yet
	
// console.log( 'msgerChat:' + msgerChat );
	var lastLoaded		= '';
	const http 			= window.location.protocol;
	const URL  			= window.location.href;
	const domain 		= 'diamta.com';
	const serverbase 	= URL.includes( 'localhost' ) ? http + '//localhost/diamta/projects/public/index.php/projects' :  http + '//' + 
	 domain + '/projects/public/index.php/projects';
	const chatFileDir 	= URL.includes( 'localhost' ) ? http + '//localhost/diamta/projects/public/uploads/files/chat' : http + '//' +  domain +  '/projects/public/uploads/files/chat'; 
	function setMessagesRead( project_id ){	// set messages as read
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			var result = this.responseText;
// console.log( 'setMessagesRead:' + result );
		}
		const server = serverbase + "/setMessagesRead/" + project_id;
		xhttp.open( "POST", server );
		xhttp.setRequestHeader( "Content-type", "Content-type: application/json" );
		xhttp.send();		
	}
	useEffect( () => {
		const elt = document.getElementsByClassName( 'msger-chat' )[ 0 ];
		// setMsgerChat( elt );

		setProject( params.params.project );

		// setIsOwner
		setIsOwner( params.params.isOwner );	


		// chat message's sender / receiver
		setChatMessageOwnerId( userId );
		if( params.params.isOwner === false ){
			setChatMessageReceiverId( project.ownerId );
		}
		else{
// console.log( '>>>>>>> params', params );

			setChatMessageReceiverId( params.params.messageReceiverId ); // To do
		}
	}, [ params.params ] );
	

	// create contact list
	useEffect( () => {
		clearEntries();
		const ind = 0; // Todo: was unable to use setIndice( 1 );
		currentIntervalId = setInterval( loadMessages, 25000, ind );
	}, [] );

	// reload messages and manage read ( seen ) messages
	
	const loadMessages = async ( ind ) => {
// console.log( 'Reload ...' );
// console.log( 'CurrentScrollTop ', currentScrollTop );		

		const messages = await getMessages( userId, projectId );
		
		if( !messages ){
console.log( 'getMessages fails' );
			return;
		}

		const chatBox 		= await window.document.getElementById( "msgerChatbox" );
		if( !chatBox ){
console.log( 'No chatBox' );
			return;
		}

		// Note: params.params.messageReceiverId is the project receiver id
		// if current user is the project owner (in a modal): The project owner receive message from numtiple project worker, then we must get only his message with the selected dialog worker
		if( params.params.isOwner ){ // current is the project owner
			const chatBoxMessages = await messages.filter( ( message => 
				( message.messageReceiverId == userId && 
				message.messageUserId == params.params.messageReceiverId ) ||
				( message.messageReceiverId == params.params.messageReceiverId && 
				message.messageUserId == userId )
			));

			await setChatMessages( chatBoxMessages );
			await setViewed( messages );

		} // if current user is a project worker: the project worker receive messages only from the project owner 
		else{				// current user is the receiver
			await setChatMessages( messages ); // Todo: display only the last message from all the project receivers
			await setViewed( messages );
		}

// console.log( 'ind', ind );
		ind = 1;
	}

	// set new viewed messages
	const setViewed = async ( messages ) => {
		var newReadMessageIds = '';
		// chatbox position
		const chatBox 		= await window.document.getElementById( "msgerChatbox" );
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

// if( message.messageId == 63 ){
	// console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' );
	// console.log( 'scrollTop', scrollTop );
	// console.log( 'messageElt', messageElt );
	// console.log( 'messageElt.offsetTop', messageElt.offsetTop );
	// console.log( 'chatBoxTop: ' + chatBox.offsetTop + ' chatBoxBottom: ' + ( + chatBox.offsetTop + chatBox.offsetHeight ) );
	// console.log( 'messageEltTop: ' + messageEltTop + ' messageEltBottom: ' + messageEltBottom  );
	// if ( messageEltTop > 0 && ( ( messageEltTop >= chatBoxTop || messageEltBottom <= chatBoxBottom ) || 
								// ( messageEltTop <= chatBoxTop && messageEltBottom >= chatBoxBottom ) // a message larger than the display window
	// ) ) {
// console.log( 'message read!' );
	// }
	// else{
// console.log( 'message NOT read' );	
	// }

// }	


// console.log( 'chatBoxTop: ' + chatBox.offsetTop + ' chatBoxBottom: ' + ( + chatBox.offsetTop + chatBox.offsetHeight ) );
// console.log( 'messageEltTop: ' + messageEltTop + ' messageEltBottom: ' + messageEltBottom  );
	 if ( ( messageEltTop >= chatBoxTop && messageEltBottom <= chatBoxBottom ) ||
		( messageEltTop <= chatBoxTop && messageEltBottom >= chatBoxBottom ) 
	) {
 // console.log( 'message read!' );
	 }
	 else{
// console.log( 'message NOT read' );	
	 }

// console.log( '>>>>> is message ' + message.messageId + ', type ' + message.type + ' already viewed: ', message.viewed );

			
				if ( ( messageEltTop >= chatBoxTop && messageEltBottom <= chatBoxBottom ) ||
					( messageEltTop <= chatBoxTop && messageEltBottom >= chatBoxBottom )
				){
					const text = message.type + '*' + message.messageId;
					newReadMessageIds = newReadMessageIds + text + '-';
				}
			
		}
		// setIsRead( reads );
		
// console.log( 'newReadMessageIds', newReadMessageIds );
		
		if( newReadMessageIds ){
			await updateMessagesRead( userId, projectId, newReadMessageIds.slice( 0, -1 ) );
			// alert( reads.length );
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
										<h4 className="mb-1">Communication and files</h4>
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
		</>
	);
};
export default ChatBox;

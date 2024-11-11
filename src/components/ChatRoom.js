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

const ChatRoom = ( params ) => {
console.log( 'ChatRoomParams', params );	
	
	const [ msgerChat, setMsgerChat ] = useState( document.createElement("div") );
	
	const { getUser }	= useContext( AuthContext );

	// save chat message
	const { saveMessage, getMessages } = useContext( ChatContext );

	// product id
	const [searchParams, setSearchParams] = useSearchParams();
	const [ projectId, setProjectId ] = useState( searchParams.get( 'projectId' ) );
	const [ project, setProject ] = useState( params.params.project );
	
	// user
	const userId 	= getUser().userId;

	// setIsOwner
	const [ isOwner, setIsOwner ] = useState( params.params ? params.params.isOwner : '' );

	// chat messages
	const [ chatMessages, setChatMessages ] 			= useState( [] );
	const [ messageReceiverId, setMessageReceiverId ] 	= useState( '' );
	const [ messageUserId, setMessageUserId ] 			= useState( '' );

	// messageId
	const [ msgId, setMsgId ] = useState( '' );

	// chat textarea
	const [ chatMessage, setChatMessage ] = useState( '' );
	const handleChangeChatMessage = ( e ) => {
		const data = e.target.value;

		setChatMessage( data )
	}

	// build dialog
	const BuildChatDialog = () => {
// console.log( '>><<<>>><<< chatMessages', chatMessages );
		var count			= 0;
		var count_unread 	= 0;
		return (
			chatMessages.map( ( message ) => 
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
					{ 
						message.messageUserId == userId ?
							<a title='Open the dialog'  style={{ color: 'blue', cursor: 'pointer' }}  onClick={ (e) => handleClickOpenDialog( message.messageReceiverId, message.messageUserId ) }>Author! Open the dialog</a>
						:
							<a title='Open the dialog'  style={{ color: 'blue', cursor: 'pointer' }}  onClick={ (e) => handleClickOpenDialog( message.messageUserId, message.messageReceiverId ) }>Open the dialog</a>
					}
				</div>
			)
		)
	}

	// 
	const handleClickOpenDialog = ( messageReceiverId, messageUserId ) => {
		setMessageReceiverId( messageReceiverId );
		setMessageUserId( messageUserId );
		setOpenModalChatBox( true );
	}

	const responseMessage = ( msg, msgid, type, displayname, fileSrc ) => {
	// alert( type );
		document.getElementById( 'chatMsgMenu' ).style.display = 'block'; 		// display the responce div
		document.getElementById( 'chatMsgUserId' ).innerHTML = displayname; 	// display the user name
		if( type == 'file' ){
			replied_file_id = msgid;
			const html = '<img src="' + fileSrc + '" className="chatFilesPreviewClass">';
			document.getElementById( 'chatMsgResponse' ).innerHTML = html;
		}
		else{
			replied_msg_id = msgid;
			document.getElementById( 'chatMsgResponse' ).innerHTML = msg;
		}
	}


	// chat Message Owner
	const [ chatMessageOwnerId, setChatMessageOwnerId ] 		= useState( '' );
	const [ chatMessageReceiverId, setChatMessageReceiverId ] 	= useState( '' );

	// Load chat messages
	
	// Append text message that reply to image or text message
	const imgExt = [];
	const getFileScr = (a) => {
		return '';
	}
	async function appendMessageReply( repliedDisplayName, repliedMessage, displayName, person_img, side, msg, time, cancelable, msgid, msgreceiverid, replyToType, replyTo_FileSrc, replyTo_fileExt, replyTo_fileName, replyTo_fileSize, readbyreceiver ){
		const type	  		= 'message';
		replyTo_fileSize 	= parseFloat( replyTo_fileSize ).toFixed(2);
		const noSrc 		= '';
		const msgmenu 		= getMsgMenu( type, cancelable, msgid, displayName, msgreceiverid, msg, noSrc, readbyreceiver );
	// console.log( msgmenu );	
		const fileSrc		= ( imgExt.includes( replyTo_fileExt ) ) ? replyTo_FileSrc : getFileScr( replyTo_fileExt );
		
		const contentHTML 	= ( replyToType == 'file' ) ? "<a href='" + replyTo_FileSrc + "' download><img src='" + fileSrc + "' style='max-width:200px;' ></a><br><a href='" + replyTo_FileSrc + "' download>" + replyTo_fileName + "</a><br>" + replyTo_fileSize + " mo" : repliedMessage;
		const msgHTML 		= `
		<div className="msg ${side}-msg">
		  <div className="msg-bubble">
			<div className="msg-info" style='display:block'>
			  <div className="msg-info-name">${repliedDisplayName}</div>
			  <div className="msg-text" style="white-space: pre-wrap;"><br>${contentHTML}</div>
			</div>
			<span>---------------------------</span>
			<div className="msg-info">
			  <div className="msg-info-name">${displayName}</div>
			  <div className="msg-info-time">${time}</div>
			</div>

			<div className="msg-text" style="white-space: pre-wrap;">${msg}</div>
			
		  </div>
		  ${msgmenu}
		</div>
	  `;
		// document.getElementById( 'curentTime' ).innerHTML = time;
		await msgerChat.insertAdjacentHTML( "beforeend", msgHTML );
		// msgerChat.innerHTML = msgHTML;
		msgerChat.scrollTop += 50000;
	}
	
	//
	function getMsgMenu( type, cancelable, msgid, displayname, userid, msg, fileSrc, readbyreceiver ){	// message button for cancelation, modification, ...
	// alert( msg );
		// read
		var read = '';
		if( readbyreceiver === true ) 
			read = '<span style="color:green">read</span>';
		else if( readbyreceiver === false )
			read = '<span style="color:silver">not read</span>';
		
		// cancel
		var cancel = '';
		
		if( cancelable )
			cancel = '<a title=\'delete\' style="cursor:pointer; color:red;" onclick="deleteMessage( ' + msgid + ', \'' + type + '\' );" >&nbsp;x</a>';
		
		// reply
		msg = msg.replace(/'/g, "&lsquo;");
		var respond = '';
		if( !isOwner ){
			respond = '<a title=\'reply\' style="cursor:pointer; color:blue;" onclick="responseMessage( \'' + msg + '\', ' + msgid + ', \'' + type + '\', \'' + displayname + '\', \'' + fileSrc + '\' );">&nbsp;reply</a>';
		}
		else{
			respond = '<a title=\'reply\' style="cursor:pointer; color:blue;" onclick="handleClickOpenDialog( \'' + msgid + '\' );">&nbsp;open dialog</a>';
		}

		const html = '<div style="font-size:11px; ">' + read + ' ' + respond + ' ' + cancel + '</div>';
		return html;
	}

	//
	const length = 500;
	const appendMessage = async( displayname, img, side, msg, time, cancelable, msgid, msgreceiverid, readbyreceiver ) => {
		const type	  = 'message';
		const fileSrc = '';
		const msgmenu = getMsgMenu( type, cancelable, msgid, displayname, msgreceiverid, msg, fileSrc, readbyreceiver );
		const msgHTML = `
		<div className="msg ${side}-msg">
		  <div className="msg-bubble">
			<div className="msg-info">
			  <div className="msg-info-name">${displayname}</div>
			  <div className="msg-info-time">${time}</div>
			</div>

			<div className="msg-text" style="white-space: pre-wrap;">${msg}</div>
			
		  </div>
		  ${msgmenu}
		</div>`;
		// document.getElementById( 'curentTime' ).innerHTML = time;
		await msgerChat.insertAdjacentHTML( "beforeend", msgHTML );
		// msgerChat.innerHTML = msgHTML;
		var divMessagelength = length
		msgerChat.scrollTop += 50000;
	}

	//
	async function appendFile( displayname, person_img, message_side, fileName, fileURL, fileSize, fileExt, message_time, cancelable, msgid, msgreceiverid, readbyreceiver ){
		const type		= "file";
		fileSize		= parseFloat( fileSize ).toFixed(2);
		const fileSrc	= ( imgExt.includes( fileExt ) ) ? fileURL : getFileScr( fileExt );
		const msgmenu 	= getMsgMenu( type, cancelable, msgid, displayname, msgreceiverid, fileName, fileSrc, readbyreceiver );
		const imgHTML 	= `
		<div className="msg ${message_side}-msg">

		<div className="msg-bubble">
			<div className="msg-info">
			  <div className="msg-info-name">${displayname}</div>
			  <div className="msg-info-time">${message_time}</div>
			</div>
			<div className="msg-text"><a href='${fileURL}' download><img style='max-width:200px;' src='${fileSrc}'></a><br><a href='${fileURL}' download>${fileName}</a> <br> ${fileSize} mo</div>
		  </div>
		  ${msgmenu}
		</div>
	  `;
		// document.getElementById( 'curentTime' ).innerHTML = time;
		await msgerChat.insertAdjacentHTML( "beforeend", imgHTML );
		
		msgerChat.scrollTop += 50000;

	}

	//
	async function loadMessages( messages ){
		var count 		 = 0;
		var count_unread = 0;
		const userid = getUser.userId
		for( var key01 in messages ){
			if ( messages.hasOwnProperty( key01 ) ) {

				for( var key02 in messages[ key01 ] ){
					const message = messages[ key01 ];
					if ( message.hasOwnProperty( key02 ) ) {
						// get messages data;
						const username 			= message.name;		// current user
						// const msgreceivername 	= message.msgusername;
						const msgusername 		= message.messageUserName;
						const msguserid 		= message.messageUserId;
						const msgreceiverid 	= message.messageReceiverId;
						const person_img 		= PERSON_IMG;
						const message_side 		= message.side;
						const message_text 		= message.message;
						const message_time 		= message.displayDate;
						const type 				= message.type;
						const viewed 			= message.viewed;
						const cancelable		= message.canbedeleted == '1' ? true : false;
						const msgid				= message.messageId;
						var displayname 		= ( userid == msguserid ) ? 'You' : msgusername.split( ' ' )[0];
						if( !viewed && message.isReceiver )   
							count_unread++;
						
						var readbyreceiver = '';
						if( userid == msguserid && viewed )
							readbyreceiver = true;
						else if( userid == msguserid && !viewed )
							readbyreceiver = false;
							
						// display messages data
						if( type == 'text' ){ 				// display a text message
							const repliedMessage 		= message.repliedMessage;
							const category 				= repliedMessage.category;
							
							if( category == null || category == 'A' ){	// not amessage reply

								await appendMessage( displayname, person_img, message_side, message_text, message_time, cancelable, msgid, msgreceiverid, readbyreceiver );
								
							}
							else if( category == 'B' ||  category == 'C' ){		// display a text message replying to a message
								const repliedDisplayName 	= repliedMessage.name.split( ' ' )[0] ;
								displayname 		= ( userid == msguserid ) ? 'You replied' : msgusername.split( ' ' )[0] + ' replied';
								var replyToType  			= '';
								var replyTo_FileSrc			= '';
								var replyTo_fileExt 		= '';
								var replyTo_fileName		= '';
								var replyTo_fileSize		= '';
								var repliedMsg				= '';
								if( category == 'C' ){
									replyToType 		= 'file';
									replyTo_FileSrc		= chatFileDir + "/" + repliedMessage.replied_fileSrc;
									replyTo_fileExt 	= repliedMessage.replied_fileExt;
									replyTo_fileName 	= repliedMessage.replied_fileName;
									replyTo_fileSize	= repliedMessage.replied_fileSize;
								}
								else{
									replyToType = 'message';
									repliedMsg	= repliedMessage.replied_message;
								}
								
								await appendMessageReply( repliedDisplayName, repliedMsg, displayname, person_img, message_side, message_text, message_time, cancelable, msgid, msgreceiverid, replyToType, replyTo_FileSrc, replyTo_fileExt, replyTo_fileName, replyTo_fileSize, readbyreceiver );
							}
						}
						else{ 	 				// display image message
							const fileName 	= message.fileName; // original name
							const path 		= message.path; 	// name on the server
							const fileSize 	= parseFloat( message.size ).toFixed(2);
							const fileExt  	= message.fileExtension;
							const fileURL  	= chatFileDir + "/" + path;  
							
							const repliedFile 		= message.repliedFile;
							const category 			= repliedFile.category;	

							if( category == null || category == 'A' ){	// not a message reply
								displayname 		= ( userid == msguserid ) ? 'You' : msgusername.split( ' ' )[0];
								await appendFile( displayname, person_img, message_side, fileName, fileURL, fileSize, fileExt, message_time, cancelable, msgid, msgreceiverid, readbyreceiver );	
								
							}
							else if( category == 'D' || category == 'E' ){		// File replying to a text file

								const repliedDisplayName = repliedFile.name;
								displayname 			= ( userid == msguserid ) ? 'You reply' : msgusername.split( ' ' )[0] + ' replied';
								// displayname				= 'You replied';
								var replyToType  		= '';
								var replyTo_FileSrc		= '';
								var replyTo_fileExt 	= '';
								var replyTo_fileName	= '';
								var replyTo_fileSize	= '';
								var repliedMsg  		= repliedFile.replied_message;
								if( category == 'E' ){

									replyToType 		= 'file';
									replyTo_FileSrc		= chatFileDir + "/" + repliedFile.replied_fileSrc;
									replyTo_fileExt 	= repliedFile.replied_fileExt;
									replyTo_fileName 	= repliedFile.replied_fileName;
									replyTo_fileSize	= repliedFile.replied_fileSize;
								}
								else{

									replyToType = 'message';
									repliedMsg	= repliedFile.replied_message; 
								}
								await appendFileReply( repliedDisplayName, repliedMsg, displayname, person_img, message_side, fileName, fileURL, fileExt, fileSize, message_time, cancelable, msgid, msgreceiverid, replyToType, replyTo_FileSrc, replyTo_fileExt, replyTo_fileName, replyTo_fileSize, readbyreceiver );
							}
						}
						count++;
						break;
					}
				}
			}
		}
		// Update all projects message as read
		document.getElementById( 'countMessages' ).innerHTML = count_unread + ' new';
	}
	

	// Append text message that reply to image or text message
	async function appendFileReply( repliedDisplayName, repliedMessage, displayName, person_img, side, fileName, fileSrc, fileExt, fileSize, time, cancelable, msgid, msgreceiverid, replyTo_Type, replyTo_FileSrc, replyTo_fileExt, replyTo_fileName, replyTo_fileSize, readbyreceiver ){
		const type	  		= 'file';
		const noSrc 		= '';
		const fileSrc01		= ( imgExt.includes( replyTo_fileExt ) ) ? replyTo_FileSrc : getFileScr( replyTo_fileExt );
		const fileSrc02		= ( imgExt.includes( fileExt ) ) ? fileSrc : getFileScr( fileExt );
		const msgmenu 		= getMsgMenu( type, cancelable, msgid, displayName, msgreceiverid, fileName, fileSrc02, readbyreceiver );
		fileSize			= parseFloat( fileSize ).toFixed(2);
		replyTo_fileSize 	= parseFloat( replyTo_fileSize ).toFixed(2);
		
		const contentHTML01 = ( replyTo_Type == 'file' ) ? "<a href='" + replyTo_FileSrc + "' download><img src='" + fileSrc01 + "' style='max-width:200px;' ></a><br><a href='" + replyTo_FileSrc + "' download>" + replyTo_fileName + "</a><br>" + replyTo_fileSize + " mo" : repliedMessage;
		
		const contentHTML02 = "<a href='" + fileSrc02 + "' download><img src='" + fileSrc02 + "' style='max-width:200px;' ></a><br><a href='" + replyTo_FileSrc + "' download>" + fileName + "</a><br>" + fileSize + " mo";
		
		const msgHTML = `
		<div className="msg ${side}-msg">
		  <div className="msg-bubble">
			<div className="msg-info" style='display:block'>
			  <div className="msg-info-name">${repliedDisplayName}</div>
			  <div className="msg-text" style="white-space: pre-wrap;"><br>${contentHTML01}</div>
			</div>
			<span>---------------------------</span>
			<div className="msg-info">
			  <div className="msg-info-name">${displayName}</div>
			  <div className="msg-info-time">${time}</div>
			</div>
			<div>${contentHTML02}</div>
		  </div>
		  ${msgmenu}
		</div>`;
		
		// document.getElementById( 'curentTime' ).innerHTML = time;
		await msgerChat.insertAdjacentHTML( "beforeend", msgHTML );
		// msgerChat.innerHTML = msgHTML;
		msgerChat.scrollTop += 50000;
	}	
	
	const sendBtn 			= document.getElementById("sendBtn");
	const fileBtn 			= document.getElementById("fileBtn");
	const responseFinishBtn = document.getElementById("responseFinishBtn");


	// Icons made by Freepik from www.flaticon.com
	const PERSON_IMG 	= '';
	var bot_name  		= '';
	var person_name 	= '';
	var project_id 		= '';
	var server 			= '';
	var receiver_id 	= '';
	var replied_msg_id	= '';
	var replied_file_id = '';
	var modalOpened		= false;
	var haveNew			= true;
	var chatIsOpen		= false; // the chat is loaded but the user hevent click on chat modal yet
	
// console.log( 'msgerChat:' + msgerChat );
	var lastLoaded		= '';
	var haveNew			= true;
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
	console.log( 'setMessagesRead:' + result );
		}
		const server = serverbase + "/setMessagesRead/" + project_id;
		xhttp.open( "POST", server );
		xhttp.setRequestHeader( "Content-type", "Content-type: application/json" );
		xhttp.send();		
	}
	
	// Modal
	const [ openModalChatBox, setOpenModalChatBox ] = useState(false);
	const onOpenModalChatBox  	= () => setOpenModalChatBox(true);
	const onCloseModalChatBox 	= async () => {
		setOpenModalChatBox(false)
	};
	//

	useEffect( () => {
		const elt = document.getElementsByClassName( 'msger-chat' )[ 0 ];
		// setMsgerChat( elt );
		const projectObj = params.params.project;
		setProject( projectObj );
		const owner = params.params.isOwner;
		setIsOwner( true );
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
	
	
	// create contact list
	useEffect( () => {
// chat get messages
		const getAllMessages = async () => {
			const rep = await getMessages( userId, projectId );
			
			

			if( rep != '0' && lastLoaded != rep ){	// Todo: '0' must be an int
console.log( 'Has new message' );
// console.log( rep );
				setChatMessages( rep );

				// msgerChat.innerHTML = '';
				// var messages = JSON.stringify( rep );
				// var messages = JSON.parse( rep );
				// var messages = rep;
				
				// loadMessages( messages );
				// lastLoaded = rep;

				haveNew = true;

				if( modalOpened )
					setMessagesRead( project_id );
			}
			else{
				haveNew = false;
	console.log( 'No new message' );
			}
		}
		getAllMessages();
	}, [ msgerChat ] );
	
	return (
	<>
			<Modal open={ openModalChatBox } onClose={ onCloseModalChatBox } center>
				<ModalChatBox params =
					{{
						project: params.params.project,
						isOwner: params.params.isOwner,
						messageReceiverId : messageReceiverId,
						messageUserId : messageUserId,
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
			  Hi Foo UserName, welcome to your project's Chat room! Go ahead and send a message to our team.
			</div>
		  </div>
		</div>
		<BuildChatDialog />
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


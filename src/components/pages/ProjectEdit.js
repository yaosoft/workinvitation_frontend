import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

import { ProjectContext } from '../../context/Project';
import { SiteContext } from '../../context/site';
import { AuthContext } from '../../context/AuthProvider';

import '../../antOverrides.css';
import ModalAddContact from '../ModalAddContact';
import ModalEditContact from '../ModalEditContact';
import ModalSelectContact from '../ModalSelectContact';
import ModalSelectContactsList from '../ModalSelectContactsList';

import { Space, Spin, Button, notification, message, Popconfirm, Radio, Flex, DatePicker, Upload } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined,
	InboxOutlined, 
	QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Input, Select } from 'antd';

import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';

// text area
import { tinymce, Editor } from "@tinymce/tinymce-react";

import '../../sidebarOverrides.css';
import '../../tinymceOverrides.css';
const ProjectEdit = ( params ) => {
	
	// TextArea
	const { TextArea } = Input;
	
	// today
	const [ today, setToday ] = useState( '' );

	// get the project id in query params
	const [searchParams, setSearchParams] = useSearchParams();
	const [ projectId, setProjectId ] = useState( searchParams.get( 'projectId' ) );

	// get the project
	const [ project, setProject ] 		= useState( {} );
	const [ pageType, setPageType ] 	= useState( '' );
	const [ pageTitle, setPageTitle ] 	= useState( '' );

	const { getProject, getProjectInvitations } = useContext( ProjectContext );

	// Get the user
	const { getUser } = useContext( AuthContext );

	// set contacts
	const { contact, setContact } = useContext( SiteContext );
	const { contacts, setContacts } = useContext( SiteContext );

	// Select a Project Category
	const { getCategory, postProject } = useContext( ProjectContext );
	const [ categories, setCategories ]  = useState( [] ); 
	const [ categoryExpanded, setCategoryExpanded ] = useState( false );
	const [ CategoryDefault, setCategoryDefault ] = useState( 'Select a Category' );
	const [ categorySelected, setCategorySelected ] = useState( '' );
	const handleClickCategoryExpanded = ( event ) => {
		
		setCategoryExpanded( !categoryExpanded );
	}
	const handleChangeCategorySelected = ( value ) => {
		// const categoryLabel = categories.filter( e => e.id == value )[ 0 ].title;
		setCategorySelected( value );
	}

	// Project Subject
	const [ subject, setSubject ] = useState( '' );
	const handleChangeSubject = ( event ) => {

		setSubject( event.target.value );
	}

	//  Project Description  ( tinymce textarea )
	const [ descriptionValue, setDescriptionValue ]	= useState( '' );
	// const [ text, setText ]		= useState("");
	const [ defaultDescription, setDefaultDescription ] = useState( 'Your Project details...' );
	// const onEditorInputChange = (newValue, editor) => {
		// setDescriptionValue(newValue);
		// setText(editor.getContent({ format: "text" }));
	// }

	const handleChangeDescription = ( e ) => {
		setDescriptionValue( e.target.value );
	} 

	// Select Project Type
	const { getType } 							= useContext( ProjectContext );
	const [ types, setTypes ] 					= useState( [] ); 
	const [ typeSelectedDefault, setTypeSelectedDefault ] = useState( 'Select a Project Type' ); 
	const [ typeSelected, setTypeSelected ] = useState( typeSelectedDefault );
	const handleChangeTypeSelected = ( type ) => {
		setTypeSelected( type );
	}

	// Project Length
	const { getDuration } 						= useContext( ProjectContext );	
	const [ lengthOptions, setLengthOptions  ]  = useState( [] );
	const [ lengthSelectedDefault, setLengthSelectedDefault ] = useState( 'Estimate Length' );
	const [ lengthSelected, setLengthSelected ] = useState( lengthSelectedDefault );
	const handleChangeLengthSelected 			= ( length ) => {
		setLengthSelected( length );
	}

	// Select Project type of Workers to invite
	const [ workersExpanded, setWorkersExpanded ] = useState( false );
	const workersDefault = 'Single or Multiple Worker';
	const [ workersSelected, setWorkersSelected ] = useState( workersDefault );
	const onChangeMultiple = ( event ) => {
		
		setWorkersExpanded( !workersExpanded );
	}

	//  Project Budget
	const budgetDefault = 0; 
	const [ budget, setBudget ] = useState( budgetDefault );
	const handleChangeBudget = ( e ) => {
		setBudget( e.target.value );
	}

	// Project Files
	const [ projectFiles, setProjectFiles ] = useState( [] );

	// project's invitatins ( Edit )
	const [ invitations, setInvitations ] = useState( [] );

	// Contacts
	// const [ contacts, setContacts ] 		= useState( [] );
	// const [ editContact, setEditContact ]	= useState( [] );

	// Date
	const [ defaultDate, setDefaultDate ]  = useState( 'Send today' ); 

	// Contacts bulk removal button
	const [ buttonDisplay, setButtonDisplay ] = useState( 'none' );

	// Build contacts
	const BuildContacts = () => {
		return(
			contacts.map( ( contact, key ) =>
				<button 
					type			= "button" 
					className		= "btn btn-dark" 
					data-toggle		= "modal" 
					data-target		= "#contactEditModal"
					onClick			= { e => setContact( contact ) }
					index			= { key }
				>
					{ contact.email }
				</button>
			)
		)
	}

	// Build categories options
	const BuildCategoriesOptions = () => {
		return(
			categories.map( ( category, index ) => 
				({
					value: category.id,
					label: category.title,
				})
			)
		)
	}

	// Build types options
	const BuildTypesOptions = () => {
		return(
			types.map( ( category, index ) => 
				({
					value: category.id,
					label: category.title,
				})
			)
		)
	}

	// Build Length options
	const BuildLengthOptions = () => {
		return(
			lengthOptions.map( ( option, index ) => 
				({
					value: option.id,
					label: option.title,
				})
			)
		)
	}

	const { Dragger } = Upload;
	// File upload
	// const [fileList, setFileList] = useState([]);
	const [ uploading, setUploading ] = useState(false);
	
	const [ fileList, setFileList ] = useState([]);
	// const [ fileListToPost, setFileListToPost ] = useState( [] );

	const props = {
		fileList: fileList,
		multiple: true,
		onChange(info) {
			info.file.status = 'success';
			let newFileList = [...info.fileList];
			setFileList( newFileList );
			console.log(info.file, info.fileList);

			// if (status == 'success') {
				// let newFileList = [...info.fileList];
				// setFileList( newFileList );
				// console.log(info.file, info.fileList);
			// }
			// if (status === 'done') {
				// message.success(`${info.file.name} file uploaded successfully.`);
			// } 
			// else if (status === 'error') {
				// message.error(`${info.file.name} file upload failed.`);
			// }
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	// Invitation sending date
	const [ sendingDate, setSendingDate ] = useState('');
	const onDateChange = ( date, dateString ) => {

		const sendingDate = moment(today).isAfter( date ) ? today : date;

		setSendingDate( sendingDate );
		console.log(date, dateString);
	};

	// send
	const navigate = useNavigate();
	const sendProject = async( type ) => {

		const postData = {}; 
		
		// Category 
		if( type == 'saveSend' && ( !categorySelected || categorySelected == CategoryDefault ) ){
			message.error( 'Select a category' );
			return;
		}
		postData[ 'category' ] = categorySelected; 
		
		// Title
		if( !subject ){
			message.error( 'Type a title' );
			return;
		}

		// Description 
		if( type == 'saveSend' && !descriptionValue ){
			message.error( 'Type a description' );
			return;
		}

		// Project type
		if( type == 'saveSend' && ( !typeSelected || typeSelected == typeSelectedDefault ) ){
			message.error( 'Select a Project Type' );
			return;
		}

		// Project Length
		if( type == 'saveSend' && ( !lengthSelected || lengthSelected == lengthSelectedDefault ) ){
			message.error( 'Select a project lenght' );
			return;
		}

		// Project contacts
		if( type == 'saveSend' && !contacts.length ){
			message.error( 'Add contacts to invite' );
			return;
		}

		// Sending date
		if( type == 'saveSend' && !sendingDate ){
			setSendingDate( today );
		}

		postData[ 'category' ] 		= categorySelected; 
		postData[ 'title' ] 		= subject; 
		postData[ 'description' ] 	= descriptionValue; 
		postData[ 'type' ] 			= typeSelected;	// project type
		postData[ 'budget' ] 		= budget;	// true / false
		postData[ 'length' ]		= lengthSelected;
		postData[ 'sendingDate' ] 	= sendingDate;
		postData[ 'invitations' ] 	= JSON.stringify(contacts);
		postData[ 'userId' ] 		= getUser().userId;
		postData[ 'projectId' ] 	= '';
		postData[ 'toSave' ] 		=  type == 'save' ? true : false;	// save + send vs save

		if( pageType == 'edit' ){
			postData[ 'projectId' ] = projectId;
		}

		// remove files that already exist on the server before post
		var fileListToPost = [];
		// if( pageType == 'edit' ){
			fileListToPost = fileList.filter( e => e.status != 'done' )
		// }

		// list of files to delete on the server
		var filesToDelete = [];
		if( pageType == 'edit' ){
			const filesUIDList 	= fileList.map( e => e.uid );

			filesToDelete = projectFiles.filter( e => !filesUIDList.includes( e.uid ) ).map( f => f.id );
		}

		postData[ 'filesToDelete' ] = filesToDelete;

		// POST
		setUploading(true);
		const rep = await postProject( postData, fileListToPost );
		
		if( isNaN( rep ) ){
			message.error( 'Failed to save your project.' );
		}
		else{
			setProjectId( rep );
			
			if( type == 'saveSend' ){
				message.success( 'Project successfully sent.' );
				navigate( '/project/view/?projectId=' + rep + '&projectStatus=' + 0 + '&userId=' + getUser().userId )
			}
			else{
				message.success( 'Project successfully saved.' );
				navigate( '/project/saved' )
			}
		}
		setUploading(false)

		// setFileList([]);
	}

	// create contact list
	useEffect( () => {

		if( !contact.email )
			return
		if( contacts.includes( contact ) )
			return
		
		const cont = contacts;

		cont.push( contact );
		setContacts( cont );

	}, [ contact ] );

	// get project's categories
	useEffect( () => {

		const getCategoryList = async () => {
			const categoryList = await getCategory();
			
			setCategories ( categoryList );
		}
		getCategoryList();

		// get project's types
		const getTypeList = async () => {
			const typeList = await getType();
			setTypes ( typeList );
		}
		getTypeList();

		// get project's durations
		const getDurationList = async () => {
			const durationList = await getDuration();
			setLengthOptions ( durationList );
		}
		getDurationList();

	}, [] );

	// Empty contacts list
	const handleClickDeleteAll  = () => {
		setContact( {} );
		setContacts( [] )
	}

	// get the project if edit
	useEffect( () => {
		handleClickDeleteAll();
		
		const pageType = projectId == 0 ? 'new' : 'edit';

		setPageType( pageType );

		const pageTitle = pageType == 'edit' ? 'Edit a Project' : 'Create a New Project';
		setPageTitle( pageTitle );

		if( pageType == 'edit' ){
			const getProjectData = async () => {

				const data = await getProject( projectId, 0, 0 ); //  projectId, projectStatus, userId

				setProject ( data );

				// category
				setCategorySelected( data.categoryId );
				setCategoryDefault( data.categoryTitle );

				// title
				setSubject( data.title );
				
				// description
				setDescriptionValue( data.description );

				// ptoject type
				setTypeSelectedDefault( data.projectTypeTitle );
				setTypeSelected( data.projectTypeId );
				
				// budget
				setBudget( data.budget );
				
				// duration
				setLengthSelectedDefault( data.durationTitle );
				setLengthSelected( data.durationId );

				// Get project Invitations
				const getInvitationList = async () => {
					const invitations = await getProjectInvitations( getUser().userId, projectId );	
					const contactArr = await invitations.map( e => ( 
					{ 
						name: 	e.receiverName, 
						email: 	e.receiverEmail, 
						id: 	e.id,
						uid:	'edit_' + e.id, 
					} ) );

					setContacts( contactArr );
				}
				getInvitationList();

				// date
				const date 	= data.date;
				const today = data.today;
				const sendingDate = moment(today).isAfter( date ) ? today : date;
			
				setSendingDate( sendingDate );
				setDefaultDate( sendingDate );
				setToday( today );

				// files
				const projectFiles = data.files;
				const files = projectFiles.map ( ( file, key ) => ( {
					"uid": "rc-upload-" + projectId + "-" + key,
					"id": file.id,
					"lastModified": 1712629873826,
					"lastModifiedDate": file.dateCreated,
					"name": file.name,
					"size": file.size,
					"type": file.extension,
					"path": file.path,
					"percent": 100,
					"originFileObj": {
						"uid": "rc-upload-" + projectId + "-" + key,	// fake
					},
					"status": "done"
				} ) )
				
				setFileList( files );		// can change
				setProjectFiles( files ); 	// save
			}
			getProjectData();
		}
	}, [ projectId ] );

	// Display bulk contacts delete button
	useEffect(() => {
		if( contacts.length > 5 )
			setButtonDisplay( 'block' )
		else
			setButtonDisplay( 'none' )
	}, [ contact, contacts ] );

	return (
		<>

			<Header />
			<Sidebar />	
				
			<div className="content-body">
				<ModalAddContact />
				<ModalEditContact />
				<ModalSelectContact />
				<ModalSelectContactsList />
				<Breadcrumbs />
				
				<div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
					<h3>{ pageTitle }</h3>
					<br />
                        <div className="card">
                            <div className="card-body" style={{  paddingTop: '0px' }}>
                                <div className="email-right-box" style={{  marginLeft: '10px' }}>
                                    <div className="compose-content mt-5" style={{  marginTop: '0px' }}>
                                        <h6><b>1- The work</b></h6>
										<form action="#">
											<div className="form-group">
												<div className="btn-group show" role="group">
														<Select
																size 		 	= 'middle'
																defaultValue	= { CategoryDefault }
																value			= { categorySelected }
																onChange		= { handleChangeCategorySelected }
																style={{
																	width: 200,
																}}
																options = { BuildCategoriesOptions() }
														/>	
														<span className="btn-icon-right">
															<i className="fa fa-file"></i>
														</span>
												</div>
											</div>
                                            <div className="form-group">
                                                <input 
													type		= "text" 
													className	= "form-control bg-transparent" 
													placeholder	= "Title"
													value		= { subject }
													onChange	= { e => handleChangeSubject( e ) }
												/>
                                            </div>
                                            <div className="form-group">
												<TextArea 
													rows			= { 15 }
													defaultValue 	= { defaultDescription }
													value 			= { descriptionValue }
													onChange 		= { ( e ) => handleChangeDescription( e ) }
													type			= "text" 
													className		= "form-control" 
													id				= "description" 
													placeholder 	= "Job description"
												/>

                                            </div>
                                        </form>
										<h6 className="m-b-20"><i className="fa fa-paperclip m-r-5 f-s-18"></i> Attatchment</h6>
                                        <form action="#" className="dropzone">
                                            <div className="form-group">
                                                <div className="fallback">
                                                    <Dragger {...props}>
														<p className="ant-upload-drag-icon">
															<InboxOutlined />
														</p>
														<p className="ant-upload-text">Click or drag file to this area to upload</p>
														<p className="ant-upload-hint">
															Support for a single or bulk upload. Strictly prohibited from uploading company data or other
															banned files.
														</p>
													</Dragger>
                                                </div>
                                            </div>
                                        </form>
										<div className="form-group">
											<h6><b>2- The Project's Type</b></h6>
											<div className="btn-group show" role="group">
												<div className="btn-group show" role="group">
													<Select
														size 		 	= 'middle'
														defaultValue	= { typeSelectedDefault }
														value 			= { typeSelected }
														onChange		= { handleChangeTypeSelected }
														style			= {{
															width: 200,
														}}
														options = { BuildTypesOptions() }
													/>
												</div>	
												<span className="btn-icon-right">
												</span>
												&nbsp;Budget&nbsp;
												<div className="form-group" display="flex">
													<input 
														type		= "text" 
														className	= "form-control bg-transparent" 
														placeholder	= "Budget"
														value		= { budget }
														onChange	= { e => handleChangeBudget( e ) }
														style		= {{
															width: 80,
															height: 25,
															minHeight: 0
														}}
													/> 
												</div>
												&nbsp;USD
												<span className="btn-icon-right">
												</span>
												&nbsp;
												<div className="btn-group show" role="group">
													<Select
														size 		 	= 'middle'
														defaultValue	= { lengthSelectedDefault }
														value			= { lengthSelected }
														onChange		= { handleChangeLengthSelected }
														style={{
															width: 200,
														}}
														options = { BuildLengthOptions() }
													/>
												</div>	
											</div>
										</div>
										<div className="form-group">
											<h6><b>3- Invitations</b></h6>
											<button 
												type			= "button" 
												className		= "btn btn-ligth" 
												data-toggle		= "modal" 
												data-target		= "#contactAddModal"
												style			= {{ padding: '2px 18px' }}
											>
												Add a Contact
												<span className="btn-icon-right">
													<i className="fa fa-plus"></i>
													<i className="fa fa-user"></i>
												</span>
											</button>
											&nbsp;
											<button 
												type			= "button" 
												className		= "btn btn-ligth" 
												data-toggle		= "modal" 
												data-target		= "#contactSelectModal"
												style			= {{ padding: '2px 18px' }}
											>
												Select an Existing Contacts
												<span className="btn-icon-right">
													<i className="fa fa-circle"></i>
													<i className="fa fa-user"></i>
												</span>
											</button>
											&nbsp;
											<button 
												type			= "button" 
												className		= "btn btn-ligth" 
												data-toggle		= "modal" 
												data-target		= "#contactsListSelectModal"
												style			= {{ padding: '2px 18px' }}
											>
												Select a Contact List
												<span className="btn-icon-right">
													<i className="fa fa-list"></i>
													<i className="fa fa-user"></i>
												</span>
											</button>
											<span className="btn-icon-right">
											</span>
											&nbsp;
											<div><BuildContacts /></div>
											&nbsp;
											<Popconfirm
												title		= 'RemoveALl'
												description	= 'Do you really want to remove all contacts?'
												onConfirm	= { handleClickDeleteAll }
												okText		= 'Yes'
												cancelText	= 'No'
												
											>
												<button 
														type			= "button" 
														className		= "btn btn-danger" 
														style			= {{ padding: '2px 18px', display: buttonDisplay }}
												>
														Remove all contacts
														<span className="btn-icon-right">
															<i className="fa fa-trash"></i>
														</span>
												</button>
											</Popconfirm>
										</div>
                                    </div>
									<div className="row" style={{  marginTop: '10px' }}></div>
                                    <div className="text-left m-t-15">
										<h6><b>4- Send</b></h6>
										<div className="btn-group show" role="group" style={{ marginTop: '5px' }}>
											<Space direction="vertical">
												Sending Date
												<DatePicker 
													onChange = { ( date, dateString ) => onDateChange( date, dateString ) } 
													placeholder={ [ defaultDate ] }
												/>
											</Space>
											&nbsp;
											<Popconfirm
												title = "Delete the task"
												description = "Do you want to save your project and continue later with sending?"
												icon = {
													<QuestionCircleOutlined
														style = {{
															color: 'blue',
														}}
													/>
												}
												onConfirm = { e => sendProject( 'save' ) }
											>
  
												<button 
													className = "btn btn-info m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 m-r-10" 
													type	= "button"
												>
													<i className="fa fa-database m-r-5"></i> Save
												</button>
											</Popconfirm>
											&nbsp;
											<button 
												className = "btn btn-success m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 m-r-10" 
												type	= "button"
												onClick	= { e => sendProject( 'saveSend' ) }
											>
												<i className="fa fa-database m-r-5"></i><i className="fa fa-paper-plane m-r-5"></i> Save and Send
											</button>
											&nbsp;
										</div>
								   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			</div>
			<Footer />
		</>
	);
};
export default ProjectEdit;

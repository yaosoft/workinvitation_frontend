import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

import { ProjectContext } from '../../context/Project';
import { SiteContext } from '../../context/site';
import { AuthContext } from '../../context/AuthProvider';

import '../../sidebarOverrides.css';
import ModalAddContact from '../ModalAddContact';
import ModalEditContact from '../ModalEditContact';
import { Space, Spin, Button, notification, message, Popconfirm, Select, Radio, Flex, DatePicker } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

import { Upload } from "antd";

// text area
import { tinymce, Editor } from "@tinymce/tinymce-react";

import '../../sidebarOverrides.css';
import '../../tinymceOverrides.css';
const SentProjectEdit = ( params ) => {
	
	// get the project id in query params
	const [searchParams, setSearchParams] = useSearchParams();
	const projectId = searchParams.get( 'projectId' );

console.log( 'projectId', projectId );
	// get the project
	const [ project, setProject ] = useState( {} );

	const { getProject } = useContext( ProjectContext );

	// Get the user
	const { getUser } = useContext( AuthContext );

	// Get contact from ModalAddContact component
	const { contact, setContact } = useContext( SiteContext );
	const { contacts, setContacts } = useContext( SiteContext );

	// Select a Project Category
	const { getCategory, postProject } = useContext( ProjectContext );
	const [ categories, setCategories ]  = useState( [] ); 
	const [ categoryExpanded, setCategoryExpanded ] = useState( false );
	const categorySelectDefault = 'Select a Category';
	const [ categorySelected, setCategorySelected ] = useState( categorySelectDefault );
	const handleClickCategoryExpanded = ( event ) => {
		
		setCategoryExpanded( !categoryExpanded );
	}
	const handleChangeCategorySelected = ( value ) => {
		setCategorySelected( `${value}` );
	}

	// Project Subject
	const [ subject, setSubject ] = useState( project.title );
	const handleChangeSubject = ( event ) => {

		setSubject( event.target.value );
	}

	//  Project Description  ( tinymce textarea )
	const [value, setValue]  = useState("Ok");
	const [text, setText] 	 = useState("");
	const defaultDescription = 'Your Project details...';
	const onEditorInputChange = (newValue, editor) => {
		setValue(newValue);
		setText(editor.getContent({ format: "text" }));
	}

	// Select Project Type
	const { getType } 		= useContext( ProjectContext );
	const [ types, setTypes ] = useState( [] ); 
	const [ typeExpanded, setTypeExpanded ] = useState( false );
	const typeSelectedDefault = 'Select a Project Type'; 
	const [ typeSelected, setTypeSelected ] = useState( typeSelectedDefault );
	const handleChangeTypeSelected = ( type ) => {
		setTypeSelected( type );
	}

	// Project Length
	const lengthSelectedDefault = 'Estimate Length'; 
	const [ lengthSelected, setLengthSelected ] = useState( lengthSelectedDefault );
	const lengthOptions = [ { id: 1, title: 'One week' }, { id: 2, title: 'Two weeks' }, { id: 4, title: 'One month' }, { id: 5, title: 'Two months' }, { id: 6, title: 'Three months' }, { id: 7, title: 'More' } ];
	const handleChangeLengthSelected = ( length ) => {
		setLengthSelected( length );
	}

	// Select Project Workers
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

	// Select Contact List
	// const [ contactListExpanded, setContactListExpanded ] = useState( false );
	// const contactListDefault = 'Import Contacts from a List';
	// const [ contactListSelected, setContactListSelected ] = useState( contactListDefault );
	// const handleClickContactListExpanded = ( event ) => {
		
		// setContactListExpanded( !contactListExpanded );
	// }
	// const handleClickContactListSelected = ( event, contactList ) => {
		// setContactListExpanded( false );
		// setContactListSelected( contactList );
	// }


	// Contacts
	// const [ contacts, setContacts ] 		= useState( [] );
	const [ editContact, setEditContact ]	= useState( [] );

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

	// File upload
	const [fileList, setFileList] = useState([]);
	const [uploading, setUploading] = useState(false);
	
	const { Dragger } = Upload;
	const props = {
		multiple: true,
		onChange(info) {
			const { status } = 'success';
			
			if (status !== 'uploading') {
			  console.log(info.file, info.fileList);
			}
			if (status === 'done') {
			  message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
			  message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	// Invitation sending date
	const [ sendingDate, setSendingDate ] = useState('');
	const onDateChange = ( date, dateString ) => {
		setSendingDate( dateString );
		console.log(date, dateString);
	};

	// send 
	const sendProject = async() => {
		const postData = {}; 
		
		// Category 
		if( !categorySelected || categorySelected == categorySelectDefault ){
			message.error( 'Select a category' );
			return;
		}
		postData[ 'category' ] = categorySelected; 
		
		// Title
		if( !subject ){
			message.error( 'Type a title' );
			return;
		}
// setText( 'Test text' );
		// Description 
		if( !text || text == defaultDescription ){
			message.error( 'Type a description' );
			return;
		}
		
		// Project type
		if( !typeSelected || typeSelected == typeSelectedDefault ){
			message.error( 'Select  type' );
			return;
		}
		
		// Project Length
		if( !lengthSelected || lengthSelected == lengthSelectedDefault ){
			message.error( 'Select a project lenght' );
			return;
		}

		// Project Length
		if( !contacts.length ){
			message.error( 'Add some contacts' );
			return;
		}

		postData[ 'category' ] 		= categorySelected; 
		postData[ 'title' ] 		= subject; 
		postData[ 'description' ] 	= text; 
		postData[ 'type' ] 			= typeSelected;
		postData[ 'budget' ] 		= budget;	// true / false
		postData[ 'length' ] 		= lengthSelected;
		postData[ 'sendingDate' ] 	= sendingDate;
		postData[ 'invitations' ] 	= JSON.stringify(contacts);
		postData[ 'userId' ] 		= getUser().userId;
		

		// POST
		setUploading(true);
		setFileList([]);
		const rep = postProject( postData, fileList );
		if( !rep ){
			message.error( 'upload failed.' );
		}
		else{
			message.success( 'upload successfully.' );
		}
		setUploading(false)
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

	}, [] );

	// get the project
	useEffect( () => {
		
		const getProjectData = async () => {
			const data = await getProject( projectId );
console.log( 'getProject', data );
			setProject ( data );
		}
		getProjectData();
	}, [ projectId ] );


	return (
		<>

			<Header />
			<Sidebar />	
				
			<div className="content-body">
				<ModalAddContact />
				<ModalEditContact />
				<Breadcrumbs />
				
				<div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
					<h3>Edit / create a new Project</h3>
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
																defaultValue	= { categorySelectDefault }
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
                                                <Editor 
													className 	= "textarea_editor form-control bg-light" 
													rows		= "15" 
													// onChange	= { e => handleChangeDescription( e ) }
													apiKey		= 'yr2i0pu19xdsekckkz7snhi63ool3vsbgmbvoxxgxrr4kpp5' // your api
													
													onEditorChange	= {(newValue, editor) => onEditorInputChange(newValue, editor)}
													onInit			= {(evt, editor) => { setText(editor.getContent({ format: "html" })) } }
													value			= {value}
													initialValue	= { defaultDescription }
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
												Add a Guest
												<span className="btn-icon-right">
													<i className="fa fa-plus"></i>
													<i className="fa fa-user"></i>
												</span>
											</button>
											<span className="btn-icon-right">
											</span>
											&nbsp;
											<div className="btn-group show" role="group">
													<Space direction="vertical">
														<DatePicker 
															onChange = { ( date, dateString ) => onDateChange( date, dateString ) } 
															placeholder={["Send today"]}
														/>
													</Space>
												&nbsp;
											</div>
											<div><BuildContacts /></div>
										</div>
                                    </div>
									<div className="row" style={{  marginTop: '10px' }}></div>
                                    <div className="text-left m-t-15">
										<h6><b>4- Action</b></h6>
                                        <button 
											className = "btn btn-success m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 m-r-10" 
											type	= "button"
											onClick	= { sendProject }
										>
											<i className="fa fa-paper-plane m-r-5"></i> Save and Send
										</button>
										&nbsp;
										&nbsp;<button className="btn btn-danger m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 m-r-10" type="button"><i className="fa fa-trash m-r-5"></i> Clear</button>
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
export default SentProjectEdit;

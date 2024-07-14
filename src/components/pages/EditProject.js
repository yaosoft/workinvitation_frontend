import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import ModalAddContact from '../ModalAddContact';
import ModalEditContact from '../ModalEditContact';
import Breadcrumbs from '../Breadcrumbs';
import { ProjectContext } from '../../context/Project';
import { SiteContext } from '../../context/site';
import { Space, Spin, Button, notification, message, Popconfirm, Select, Radio, Flex } from 'antd';
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

const EditProject = ( params ) => {
	// tinymce textarea
	const [value, setValue] = useState("");
	const [text, setText] 	= useState("");
	const onEditorInputChange = (newValue, editor) => {
		setValue(newValue);
		setText(editor.getContent({ format: "text" }));
	}
// alert( text );
	// Get contact from ModalAddContact component
	const { contact, setContact } = useContext( SiteContext );
	const { contacts, setContacts } = useContext( SiteContext );

	// Select a Project Category
	const { getCategory } = useContext( ProjectContext );
	const [ categories, setCategories ]  = useState( [] ); 
	const [ categoryExpanded, setCategoryExpanded ] = useState( false );
	const categorySelectDefault = 'Select a Category';
	const [ categorySelected, setCategorySelected ] = useState( categorySelectDefault );
	const handleClickCategoryExpanded = ( event ) => {
		resetAllSelects();
		setCategoryExpanded( !categoryExpanded );
	}
	const handleChangeCategorySelected = ( value ) => {
		setCategorySelected( `${value}` );
	}

	// Project Subject
	const [ subject, setSubject ] = useState( '' );
	const handleChangeSubject = ( event ) => {
		resetAllSelects();

		setSubject( event.target.value );
	}

	// Project Description
	const [ description, setDescription ] = useState( '' );
	const handleChangeDescription = ( event ) => {
		resetAllSelects();

		setDescription( event.target.value );
	}

	// Select Project Type
	const { getType } 		= useContext( ProjectContext );
	const [ types, setTypes ] = useState( [] ); 
	const [ typeExpanded, setTypeExpanded ] = useState( false );
	const typeSelectedDefault = 'Select a Project Type'; 
	const [ typeSelected, setTypeSelected ] = useState( typeSelectedDefault );
	const handleClickTypeExpanded = ( event ) => {
		resetAllSelects();
		
		setTypeExpanded( !typeExpanded );
	}
	const handleChangeTypeSelected = ( event, type ) => {
		setTypeExpanded( false );
		setTypeSelected( type );
	}

	// Select Project Workers
	const [ workersExpanded, setWorkersExpanded ] = useState( false );
	const workersDefault = 'Single or Multiple Worker';
	const [ workersSelected, setWorkersSelected ] = useState( workersDefault );
	const onChangeMultiple = ( event ) => {
		resetAllSelects();
		
		setWorkersExpanded( !workersExpanded );
	}
	const handleClickWorkersSelected = ( event, workers ) => {
		setWorkersExpanded( false );
		setWorkersSelected( workers );
	}

	// Select Contact List
	const [ contactListExpanded, setContactListExpanded ] = useState( false );
	const contactListDefault = 'Import Contacts from a List';
	const [ contactListSelected, setContactListSelected ] = useState( contactListDefault );
	const handleClickContactListExpanded = ( event ) => {
		resetAllSelects();
		setContactListExpanded( !contactListExpanded );
	}
	const handleClickContactListSelected = ( event, contactList ) => {
		setContactListExpanded( false );
		setContactListSelected( contactList );
	}

	// Reset all selects
	const resetAllSelects = () => {
		setTypeExpanded( false );
		setCategoryExpanded( false );
		setWorkersExpanded( false );
		setContactListExpanded( false );
	}

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

	// File upload
	const [fileList, setFileList] = useState([]);
// console.log( 'fileList', fileList );
	const [uploading, setUploading] = useState(false);
	const handleUpload = () => {
		const formData = new FormData();
		fileList.forEach((file) => {
			formData.append('files[]', file);
		});
		setUploading(true);
		// You can use any AJAX library you like
		fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
			method: 'POST',
			body: formData,
		})
		.then((res) => res.json())
			.then(() => {
				setFileList([]);
				message.success('upload successfully.');
			})
			.catch(() => {
				message.error('upload failed.');
			})
			.finally(() => {
				setUploading(false);
			});
	};
	const { Dragger } = Upload;
	const props = {
		multiple: true,
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	useEffect( () => {

		if( !contact.email )
			return
		if( contacts.includes( contact ) )
			return
		
		const cont = contacts;

		cont.push( contact );
		setContacts( cont );

	}, [ contact ] );
	

	useEffect( () => {
		// get project's categories
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
                                        <h6><b>1- The work to do</b></h6>
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
													apiKey		= 'gpl' // your api keypromotion: true
													
													onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
													onInit={(evt, editor) => { setText(editor.getContent({ format: "text" })) } }
													value={value}
													initialValue={'Your Project details...'}
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
											<h6><b>2- Project type</b></h6>
											<div className="btn-group show" role="group">
												<div className="btn-group show" role="group">
													<Select
														size 		 	= 'middle'
														defaultValue	= { typeSelectedDefault }
														onChange		= { handleChangeTypeSelected }
														style={{
															width: 200,
														}}
														options = { BuildTypesOptions() }
													/>	
													<span className="btn-icon-right">
													</span>
													&nbsp;
												</div>
												<div className="btn-group show" role="group">
													<Flex vertical gap="middle">
														<Radio.Group 
															onChange		= { ( e ) => onChangeMultiple( e ) } 
															defaultValue	= "a" 
															buttonStyle		= "solid"
														>
															<Radio.Button value="a">Single worker</Radio.Button>
															<Radio.Button value="b">Multiple workers</Radio.Button>
														</Radio.Group>
													</Flex>
												</div>
											</div>
										</div>
										<div className="form-group">
											<h6><b>3- Invitions</b></h6>
											<button 
												type			= "button" 
												className		= "btn btn-ligth" 
												data-toggle		= "modal" 
												data-target		= "#contactAddModal"
											>
												Add a Guest 
												<span className="btn-icon-right">
													<i className="fa fa-user"></i>
												</span>
											</button>
											&nbsp;
											<div className="btn-group show" role="group">
												<button 
													workers		= "button" 
													className	= "btn mb-1 btn-ligth dropdown-toggle"
													onClick 	= { e => handleClickContactListExpanded( e ) }
												>
													{ contactListSelected }
													<span className="btn-icon-right">
														<i className="fa fa-list"></i>
													</span>
												</button>
												<div className = { 'dropdown-menu ' } style={{ display: contactListExpanded ? 'block' : 'none' }}>
													<Link 
														className 	= "dropdown-item" 
														onClick		= { e => handleClickContactListSelected( e, contactListDefault ) }
													>
														{ contactListDefault }
													</Link> 
												</div>
												&nbsp;
											</div>
											<div><BuildContacts /></div>
										</div>
                                    </div>
									<div className="row" style={{  marginTop: '10px' }}></div>
                                    <div className="text-left m-t-15">
										<h6><b>4- Action</b></h6>
                                        <button className="btn btn-success m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 m-r-10" type="button"><i className="fa fa-paper-plane m-r-5"></i> Save and Send Invitations</button>
										&nbsp;
										&nbsp;<button className="btn btn-danger m-b-30 m-t-15 f-s-14 p-l-20 p-r-20 m-r-10" type="button"><i className="fa fa-close m-r-5"></i> Cancel</button>
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

export default EditProject;

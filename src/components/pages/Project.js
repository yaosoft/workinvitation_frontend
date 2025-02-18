import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import ChatBox from '../ChatBox';
import ChatRoom from '../ChatRoom';
import Test from '../Test';
import Breadcrumbs from '../Breadcrumbs';
import { AuthContext } from '../../context/AuthProvider';
import { ChatContext } from '../../context/Chat';
import { ProjectContext } from '../../context/Project';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ModalViewProject from '../ModalViewProject';
import ModalResendInvitation from '../ModalResendInvitation';

const Project = ( params ) => {

	// Sets the moment instance to use.
	Moment.globalMoment = moment;
	// Set the locale for every react-moment instance to French.
	// Moment.globalLocale = 'fr';

	// Project id
	const [ searchParams, setSearchParams ] = useSearchParams();
	const id = searchParams.get( 'projectId' );
	const pageType = id ? 'new' : 'edit';	
	const [ projectId, setProjectId ] = useState( id );
	
	// Project status
	const status = searchParams.get( 'projectStatus' );
	const [ projectStatus, setProjectStatus ] = useState( status );

	// get the project obj
	const [ project, setProject ] = useState( {} );

	// invitation
	const [ invitationList, setInvitationList ] = useState( [] ); 
	const [ countInvitation, setCountInvitation ] = useState( 0 );
	const [ invitS, setInvitS ] = useState( '' );

	const [ projectInvitation, setProjectInvitation ] = useState( [] );
	const [ countProjectInvitation, setCountProjectInvitation ] = useState( 0 );
	const [ projectInvitS, setProjectInvitS ] = useState( '' );


	// check if user is owner
	const { getUser }	= useContext( AuthContext );
	const [ userId, setUserId ] = useState( getUser().userId );
	
	const { isOwner, getProject, getProjectStatus, getProjectInvitations }	= useContext( ProjectContext );
	const [ isProjectOwner, setIsProjectOwner ] = useState( '' );

	// project view
	const handleClickViewProject = () => {
		setOpenProjectModalView( true )
	}

	// get chat message
	const { getMessages } = useContext( ChatContext );
	
	// chat messages
	// const [ chatMessages, setChatMessages ] = useState( [] );

	// Modal
	const [ openProjectModalView, setOpenProjectModalView ] = useState(false);
	const onOpenProjectModalView  		= () => setOpenProjectModalView(true);
	const onCloseOpenProjectModalView 	= async () => {
		setOpenProjectModalView(false)
	};
	const [ openModalInvitationResent, setOpenModalInvitationResent ] = useState(false);
	const onOpenModalInvitationResent  	= () => setOpenModalInvitationResent(true);
	const onCloseModalInvitationResent 	= async () => {
		// await getProjectData( projectId );
		setOpenModalInvitationResent(false)
	};
	
	const [ receiverEmail, setReceiverEmail] = useState( '' );
	// handleClickResend
	const handleClickResend = ( receiverEmail ) => {
		setReceiverEmail( receiverEmail );
		setOpenModalInvitationResent( true );
	}

	// page title
	const BuildPageTitle = () => {
		return (
			<>
				<span>{ project.title }</span>&nbsp;
				<button onClick={ handleClickViewProject }>
					<i className='fa fa-eye'></i>
				</button>&nbsp;
				{
					isProjectOwner && 
					<Link 
						to	 	= { '/project/edit/?projectId=' + id }
						title 	= { 'Edit the project' }
					>
						<button>
							<i className='fa fa-pencil'></i>
						</button>
					</Link>
				}
			</>
		)
	}
	
	// build invitation 
	const BuildInvitationsLine  = () => {
		return( 
			projectInvitation.map (( invitation, index ) =>
				<tr key = { index }>
					<td>{ invitation.receiverEmail }</td>
					<td>{ invitation.receiverName ? invitation.receiverName : 'No name' }</td>
					<td><i className="fa fa-circle-o text-success  mr-2"></i></td>
					<td>
						<span className="m-0 pl-3">{ invitation.attempts }</span>
					</td>
					<td>
					<Link onClick={ e => handleClickResend( invitation.receiverEmail ) }><i className="fa fa-paper-plane-o text-success  mr-2"></i> resend</Link>
					</td>
				</tr>
			)
		)
	}



	// 
	useEffect( () => {
// alert( project.id );
		// get project data
		const a = async () => {
			const theProject = await getProject( projectId, projectStatus, userId );
			setProject ( theProject );
console.log( 'theProject', theProject );
		}
		if( project.id === undefined )
			a()
		else
			return
		
		// is owner
		const checkOwner = async () => {
			const isowner = await isOwner( userId, projectId );
			setIsProjectOwner ( isowner );
		}
		if( isProjectOwner == '' )
			checkOwner()

		// project's invitation
		const getProjectInvitation = async () => {
			const projectInvitation = await getProjectInvitations( userId, projectId );
			if( !projectInvitation.length ){
				console.log( 'No project Invitation' );
			}
			else{
				setProjectInvitation( projectInvitation );
				setCountProjectInvitation( projectInvitation.length );
			}
			if( projectInvitation.length )
				setProjectInvitS( 's' )
		}
		if( projectInvitation.length == 0 && isProjectOwner )
			getProjectInvitation()

		// const getAllMessages = async () => {
			// const rep = await getMessages( userId, id ); // this use a context to persist messages
		// }
		// getAllMessages();
	}, [] );


	// getProjectData( projectId );

	return (
		
		<>
			<Header />
			<Modal open={ openProjectModalView } onClose={ onCloseOpenProjectModalView } center>
				<ModalViewProject params =
					{{
						project: project,
						isOwner: isProjectOwner
					}}
				/>
			</Modal>
			<Modal open={ openModalInvitationResent } onClose={ onCloseModalInvitationResent } center>
				<ModalResendInvitation params =
					{{
						project: 		project,
						receiverEmail:  receiverEmail
					}}
				/>
			</Modal>
			
				
				<Sidebar />	
				        <div className="content-body">

				<Breadcrumbs />

            <div className="container-fluid mt-3">
				<h3><BuildPageTitle />&nbsp;</h3>
				<br />
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="card gradient-1">
                            <div className="card-body">
                                <h3 className="card-title text-white">{ isProjectOwner ? 'Project Category' : 'Project Owner' }</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white" style={{ fontSize: '18px' }}>{ isProjectOwner ? project.categoryTitle : project.owner }</h2>
                                    <p className="text-white mb-0">{ isProjectOwner ? project.categoryDescription : project.owner }</p>
                                </div>
                                <span className="float-right display-5 opacity-5">
									{ isProjectOwner ? <i className="fa fa-file" ></i> : <i className="fa fa-user"></i> }
								</span>
                            </div>
                        </div>
                    </div>
					<div className="col-lg-3 col-sm-6">
                        <div className="card gradient-3">
                            <div className="card-body">
                                <h3 className="card-title text-white">{ isProjectOwner ? 'Creation date' : 'Project type' }</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white" style={{ fontSize: '18px' }}>
										{ isProjectOwner ? <Moment format='ddd DD MMM' >{ project.date }</Moment> : project.projectTypeTitle }
									</h2>
                                    <p className="text-white mb-0">{ isProjectOwner ? <Moment format='YYYY' >{ project.date }</Moment> : project.projectTypeDescription }</p>
                                </div>
                                <span className="float-right display-5 opacity-5">{ isProjectOwner ? <i className="fa fa-calendar"></i> : <i className="fa fa-paperclip"></i> }</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card gradient-2">
                            <div className="card-body">
                                <h3 className="card-title text-white">{ isProjectOwner ? 'Invitation sent' : 'Budget' }</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white" style={{ fontSize: '18px' }}>{ isProjectOwner ? countProjectInvitation : project.budget }</h2>
                                    <p className="text-white mb-0">{ isProjectOwner ? 'invitation' + invitS : '$' }</p>
                                </div>
								<span className="float-right display-5 opacity-5">{ isProjectOwner ? <i className="fa fa-paper-plane"></i> : <i className="fa fa-money"></i> }</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card gradient-4">
                            <div className="card-body">
                                <h3 className="card-title text-white">Status</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white" style={{ fontSize: '18px' }}>{ isProjectOwner && projectStatus.length } user</h2>
                                    <p className="text-white mb-0">{ isProjectOwner ? 'Started the project' : 'Starting date' }</p>
                                </div>
                                <span className="float-right display-5 opacity-5"><i className="fa fa-tasks"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
				{ 
					project.id !== undefined &&
						isProjectOwner === false ?
							<ChatBox
								params={{
									project: 			project,
									isOwner: 			isProjectOwner,
									messageId:			'',
									messageReceiverId: 	project.ownerId,
									messageUserId: 		userId,
								}} 
							/>
						:
						isProjectOwner === true && project.id !== undefined &&
							<ChatRoom 
								params={{
									project: project,
									isOwner: isProjectOwner,
								}} 
							/>
							
				}
                { isProjectOwner &&
				<div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="active-member">
                                    <div className="table-responsive">
                                        <table className="table table-xs mb-0">
                                            <thead>
												<tr>  <h4 className="mb-1">Invitations sent</h4> </tr>
                                                { 
													countProjectInvitation ? 
														<tr>
															<th>Email</th>
															<th>Name</th>
															<th>Status</th>
															<th>Rensendings</th>
															<th>Action</th>
														</tr>
													:
														<tr>
															<th>No invitation sent. Edit the project</th>
														</tr>
												}
                                            </thead>
											<tbody>
												<BuildInvitationsLine />
											</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
				}
			</div>
        </div>
		<Footer />
		</>
	);
};

export default Project;

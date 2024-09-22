import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';
import { AuthContext } from '../../context/AuthProvider';
import { ProjectContext } from '../../context/Project';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ModalViewProject from '../ModalViewProject';

import '../../sidebarOverrides.css';
import '../../chatStyles.css';

const Project = ( params ) => {

	// Sets the moment instance to use.
	Moment.globalMoment = moment;
	// Set the locale for every react-moment instance to French.
	// Moment.globalLocale = 'fr';
	
	// get the project id
	const [ searchParams, setSearchParams ] = useSearchParams();
	const [ projectId, setProjectId ] = useState( '' );
	const pageType = projectId ? 'new' : 'edit';

	// get the project obj
	const [ project, setProject ] = useState( {} );

	// invitation
	const [ invitationList, setInvitationList ] = useState( [] ); 
	const [ countInvitation, setCountInvitation ] = useState( 0 );
	const [ invitS, setInvitS ] = useState( '' );

	const [ projectInvitation, setProjectInvitation ] = useState( [] );
	const [ countProjectInvitation, setCountProjectInvitation ] = useState( 0 );
	const [ projectInvitS, setProjectInvitS ] = useState( '' );

	// project user Status
	const [ projectStatus, setProjectStatus ] = useState( [] );

	// check if user is owner
	const { getUser }	= useContext( AuthContext );
	const [ userId, setUserId ] = useState( '' );

	const { isOwner, getProject, getSentInvitations, getProjectStatus, getProjectInvitations }	= useContext( ProjectContext );
	const [ isProjectOwner, setIsProjectOwner ] = useState( '' );

	// project view
	const handleClickViewProject = () => {
		setOpenProjectModalView( true )
	}

	// Modal
	const [ openProjectModalView, setOpenProjectModalView ] = useState(false);
	const onOpenProjectModalView  		= () => setOpenProjectModalView(true);
	const onCloseOpenProjectModalView 	= async () => {
		setOpenProjectModalView(false)
	};

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
						to	 	= { '/project/edit/?projectId=' + projectId }
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
			projectInvitation.map ( ( invitation, index ) =>
				<tr key = { index }>
					<td>{ invitation.receiverEmail }</td>
					<td>{ invitation.receiverName ? invitation.receiverName : 'No name' }</td>
					<td><i className="fa fa-circle-o text-success  mr-2"></i></td>
					<td>
						<span className="m-0 pl-3">{ invitation.attempts }</span>
					</td>
					<td>
						<Link><i className="fa fa-paper-plane-o text-success  mr-2"></i> resend</Link>
					</td>
				</tr>
		))
	}

	// projectId
	useEffect( () => {
		const getIdFromUrl = async () => {
			const id = await searchParams.get( 'projectId' );
			setProjectId( id );
		}
		getIdFromUrl();
	}, [] );

	// get project data
	useEffect( () => {
		if( !projectId )
			return
		
		const getProjectData = async () => {
			
			const user_id = await getUser().userId;
			
			setUserId( user_id );

			const isowner = await isOwner( user_id, projectId );

			setIsProjectOwner ( isowner );
			
			const projectStatus = await searchParams.get( 'projectStatus' );
			const userId = await searchParams.get( 'userId' );
			
			const theproject = await getProject( projectId, projectStatus, userId  );
			setProject ( theproject );
			
			const projectInvitation = await getProjectInvitations( user_id, projectId );
// console.log( 'projectInvitation', projectInvitation );
			setProjectInvitation( projectInvitation );
			setCountProjectInvitation( projectInvitation.length );
			if( projectInvitation.length )
				setProjectInvitS( 's' )
			
			const getStatus = async () => {
				const status = await getProjectStatus( projectId );
				setProjectStatus( status );			
			}
		}
		getProjectData();
	}, [ projectId ] );

	

	return (
		<>
			<Modal open={ openProjectModalView } onClose={ onCloseOpenProjectModalView } center>
				<ModalViewProject params =
					{{
						project: project,
					}}
				/>
			</Modal>
			
				<Header />
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
      <i className="fas fa-comment-alt"></i> Your conversation with <b>Foo Name</b> about the project Foo title
    </div>
    <div className="msger-header-options close">
      <span><i className="fas fa-cog"></i></span>
    </div>
  </header>

  <main className="msger-chat" id="msgerchat">
    <div className="msg left-msg">
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

  </main>
  
  <div id='chatMsgMenu' style={{ height: '70px', padding: '5px', borderTop: '0.5px solid silver', display: 'none' }}>
	<p id='chatMsgUserId'>Message sender</p> 
	<p><div id='chatMsgResponse' style={{ width: '95%', border: 'none', display: 'inline-block', float: 'left' }}></div><a title='close' id='responseFinishBtn' style={{ cursor: 'pointer' }}>X</a></p>
  </div>  
  <div title='close' id='chatFilesPreviewContainer' style={{ height: '50px', width: '100%', display: 'inline-block', display: 'none' }}>
  <div id='chatFilesPreview' style={{ padding: '5px', borderTop: '0.5px solid silver', width: '98%', float: 'left' }}>
  </div><div id='chatFilesPreviewFinishBtnDiv' style={{ width: '2%', float: 'left' }}><a title='close' id='chatFilesPreviewFinishBtn' style={{ cursor: 'pointer' }}>X</a></div></div>
  <form className="msger-inputarea" onsubmit="return false;">
	<label for="uploader" style={{ cursor: 'pointer', fontSize: '9px', height: '31px', width: '40px' }}>  
        <img title="Upload a file" id="profile_label" src="../../img/searchFile.png" alt="DP" style={{ position: 'relative', top: '-190%', left: '-109%' }} />
    </label>
    <input style={{ display: 'none' }} id="uploader" name="uploader" className="uploader" type="file" multiple />
    <textarea  className="msger-input" style={{ whiteSpace: 'pre-wrap' }} placeholder="Enter your message..."></textarea>
    <button className="msger-send-btn" id="sendBtn" >Send</button>
	
  </form>
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
				</div>
            </div>
			<Footer />
		</>
	);
};

export default Project;

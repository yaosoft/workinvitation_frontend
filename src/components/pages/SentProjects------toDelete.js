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

const SentProjects = ( params ) => {
	
	const { getUser } = useContext( AuthContext );
	const { getSentProjects, getSentInvitations } = useContext( ProjectContext );
	const userId = getUser().userId;
	
	// projectts
	const [ projectList, setProjectList ] = useState( [] );
	const [ countProject, setCountProject ] = useState( 0 );
	
	// projectts
	const [ invitationList, setInvitationList ] = useState( [] );
	const [ countInvitation, setCountInvitation ] = useState( 0 );

	// Build contacts
	const BuildProjectList = () => {
		return(
			projectList.map( ( project, key ) =>
				<div className="message">
                    <Link to={ "/project/view/?projectId=" + project.id }>
                        <div className="col-mail col-mail-1">
                            <div className="email-checkbox">
                                <input type="checkbox" id="chk21" />
                                <label className="toggle" for="chk21"></label>
                            </div><span className="star-toggle ti-star"></span>
                        </div>
                        <div className="col-mail col-mail-2">
                           
                            <div className="date">{ project.date }</div>
                        </div>
                    </Link>
				</div>
			)
		)
	}


	// get user's sent project
	useEffect( () => {
		// Get all projects user
		const getProjectList = async () => {
			const list = await getSentProjects( userId );
			setProjectList( list );
			setCountProject( list.length );
		}
		getProjectList( userId );

		// Get user's invitation
		const getInvitationList = async () => {
			const list = await getSentInvitations( userId );
console.log( 'list', list );			
			setInvitationList( list );
			setCountInvitation( list.length );
		}
		getInvitationList( userId );

	}, [] );




	return (
		<>
				<Header />
				<Sidebar />	
				        <div class="content-body">

				<Breadcrumbs />
				
				<div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
						<h3>Sent Projects ( {countProject} )</h3>
						<br />
                        <div className="card">
                            <div className="card-body">
                                <div className="email-left-box">
									
                                    <div className="mail-list mt-4">
									<a href="#" className="list-group-item border-0 p-r-0"><i className="fa fa-envelope font-18 align-middle mr-2"></i>Sent invitations <span className="badge badge-danger badge-sm float-right m-t-5">{ countInvitation }</span> </a>
									<a href="#" className="list-group-item border-0 p-r-0"><i className="fa fa-envelope font-18 align-middle mr-2"></i>Not replied <span className="badge badge-danger badge-sm float-right m-t-5">{ countInvitation }</span> </a>
										<a href="#" className="list-group-item border-0 p-r-0"><i className="fa fa-star-o font-18 align-middle mr-2"></i>Started projects <span className="badge badge-danger badge-sm float-right m-t-5">47</span> </a>
                                        
                                        <a href="#" className="list-group-item border-0 p-r-0"><i className="fa fa-trash font-18 align-middle mr-2"></i>Trash</a>
                                    </div>
                                    <h5 className="mt-5 m-b-10">Categories</h5>
                                    <div className="list-group mail-list"><a href="#" className="list-group-item border-0"><span className="fa fa-briefcase f-s-14 mr-2"></span>Work</a>  <a href="#" className="list-group-item border-0"><span className="fa fa-pencil f-s-14 mr-2"></span>Homework</a>  
                                    </div>
                                </div>
                                <div className="email-right-box">
                                    <div className="email-list m-t-15">
                                        <BuildProjectList />
                                    </div>
                                    <div className="row">
                                        <div className="col-7">
                                            <div className="text-left">1 - 20 of 568</div>
                                        </div>
                                        <div className="col-5">
                                            <div className="btn-group float-right">
                                                <button className="btn btn-gradient" type="button"><i className="fa fa-angle-left"></i>
                                                </button>
                                                <button className="btn btn-dark" type="button"><i className="fa fa-angle-right"></i>
                                                </button>
                                            </div>
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

export default SentProjects;

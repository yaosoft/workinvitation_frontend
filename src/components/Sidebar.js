import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';



const Sidebar = ( params ) => {
// console.log( params );
	return (
		<>
		<div className="nav-header" style={{ backgroundColor: '#F28432', height: '100%' }} >
					<div className="brand-logo">
						<Link to="/home">
							<b className="logo-abbr"><img src="./img/logo.png" alt="" /> </b>
							<span className="logo-compact"><img src="./img/logo10.png" alt="" /></span>
							<span className="brand-title">
								<img src="./img/logo10.png" alt="" />
							</span>
						</Link>
					</div>
				</div>
				<div className="nk-sidebar">           
					<div className="nk-nav-scroll">
						<ul className="metismenu" id="menu">
							<li className="nav-label"><span style={{ color: '#8072c9' }}>&nbsp;</span></li>
							<li>
								<a className="has-arrow" aria-expanded="false">
									<i className="icon-note menu-icon"></i> <span className="nav-text">Projects</span>
								</a>
								<ul aria-expanded="false">
									<li><Link to="/project/received">Received Projects</Link></li>
									<li><Link to="/project/sent">Sent Projects</Link></li>
									<li><Link to="/project/saved">Saved Projects</Link></li>
									<li><Link to="/project/edit/?projectId=0">Create a Project</Link></li>
								</ul>
							</li>
							<li>
								<a className="has-arrow" aria-expanded="false">
									<i className="fa fa-users"></i> <span className="nav-text">Contact list</span>
								</a>
								<ul aria-expanded="false">
									<li><Link to="/contacts-list/list" >Contacts list</Link></li>
									<li><Link to="/contacts-list/create" >Create a contacts list</Link></li>
								</ul>
							</li>
							<li className="nav-label"><span style={{ color: '#8072c9' }}>Profile info</span></li>
							<li>
								<a className="has-arrow" aria-expanded="false">
									<i className="fa fa-user"></i> <span className="nav-text">My Profile</span>
								</a>
								<ul aria-expanded="false">
									<li><Link to="/profile/edit">Update your Profile</Link></li>
									<li><Link to="/profile/password/change">Change Password</Link></li>
								</ul>
							</li>
							
							<li className="nav-label"><span style={{ color: '#8072c9' }}>Help center</span></li>
							<li>
								<a className="has-arrow" href="javascript:void()" aria-expanded="false">
									<i className="fa fa-question-circle"></i><span className="nav-text">Ask for assistance</span>
								</a>
								<ul aria-expanded="false">
									<li><Link >FAQ</Link></li>
									<li><Link >Write to us</Link></li>
									<li><Link >Blog</Link></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
		</>
	);
};

export default Sidebar;

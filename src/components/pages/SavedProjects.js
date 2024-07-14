import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

import '../../sidebarOverrides.css';

const SavedProjects = ( params ) => {
// console.log( params );
	return (
		<>
				<Header />
				<Sidebar />	
				        <div class="content-body">

				<Breadcrumbs />
				
				<div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
						<h3>Saved Projects</h3>
						<br />
                        <div className="card">
                            <div className="card-body">
                                <div className="email-right-box" style={{ marginLeft: '10px' }} >
                                    
                                    <div className="email-list m-t-15">
                                        <div className="message">
                                            
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk7" />
                                                        <label className="toggle" for="chk7"></label>
                                                    </div><Link to="/project/edit/1"><i className="fa fa-pencil"></i></Link>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject"><Link to="/project/edit/1">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</Link></div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk7" />
                                                        <label className="toggle" for="chk7"></label>
                                                    </div><Link to="/project/edit/1"><i className="fa fa-pencil"></i></Link>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject"><Link to="/project/edit/1">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</Link></div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk7" />
                                                        <label className="toggle" for="chk7"></label>
                                                    </div><Link to="/project/edit/1"><i className="fa fa-pencil"></i></Link>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject"><Link to="/project/edit/1">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</Link></div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
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

export default SavedProjects;

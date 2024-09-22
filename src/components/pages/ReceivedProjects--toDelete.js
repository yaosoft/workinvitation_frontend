import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

import '../../sidebarOverrides.css';

const ReceivedProjects = ( params ) => {
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
						<h3>Received Projects</h3>
						<br />
                        <div className="card">
                            <div className="card-body">
                                <div className="email-left-box">
									
                                    <div className="mail-list mt-4"><a href="email-inbox.html" className="list-group-item border-0 text-primary p-r-0"><i className="fa fa-inbox font-18 align-middle mr-2"></i> New <span className="badge badge-primary badge-sm float-right m-t-5">198</span> </a>
									<a href="#" className="list-group-item border-0 p-r-0"><i className="fa fa-eye font-18 align-middle mr-2"></i>Read <span className="badge badge-success badge-sm float-right m-t-5">47</span> </a>
                                        <a href="#" className="list-group-item border-0 p-r-0"><i className="fa fa-star-o font-18 align-middle mr-2"></i>Replied <span className="badge badge-danger badge-sm float-right m-t-5">47</span> </a>
                                        <a href="#" className="list-group-item border-0 p-r-0"><i className="fa fa-trash font-18 align-middle mr-2"></i>Trash</a>
                                    </div>
                                    <h5 className="mt-5 m-b-10">Categories</h5>
                                    <div className="list-group mail-list"><a href="#" className="list-group-item border-0"><span className="fa fa-briefcase f-s-14 mr-2"></span>Work</a>  <a href="#" className="list-group-item border-0"><span className="fa fa-pencil f-s-14 mr-2"></span>Homework</a>  
                                    </div>
                                </div>
                                <div className="email-right-box">
                                    
                                    <div className="email-list m-t-15">
                                        <div className="message">
                                            <Link to="/project/1">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk7" />
                                                        <label className="toggle" for="chk7"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk3" />
                                                        <label className="toggle" for="chk3"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk4" />
                                                        <label className="toggle" for="chk4"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk5" />
                                                        <label className="toggle" for="chk5"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <Link to="/project/1">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk6" />
                                                        <label className="toggle" for="chk6"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="message">
                                            <Link to="/project/1">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk7" />
                                                        <label className="toggle" for="chk7"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk8" />
                                                        <label className="toggle" for="chk8"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message unread">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk9" />
                                                        <label className="toggle" for="chk9"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message unread">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk10" />
                                                        <label className="toggle" for="chk10"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk11" />
                                                        <label className="toggle" for="chk11"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk12" />
                                                        <label className="toggle" for="chk12"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox" >
                                                        <input type="checkbox" id="chk13" />
                                                        <label className="toggle" for="chk13"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk14" />
                                                        <label className="toggle" for="chk14"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message unread">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk15" />
                                                        <label className="toggle" for="chk15"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk16" />
                                                        <label className="toggle" for="chk16"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk17" />
                                                        <label className="toggle" for="chk17"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk18" />
                                                        <label className="toggle" for="chk18"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk19" />
                                                        <label className="toggle" for="chk19"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message unread">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk20" />
                                                        <label className="toggle" for="chk20"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
                                                    <div className="date">11:49 am</div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="message">
                                            <a href="email-read.html">
                                                <div className="col-mail col-mail-1">
                                                    <div className="email-checkbox">
                                                        <input type="checkbox" id="chk21" />
                                                        <label className="toggle" for="chk21"></label>
                                                    </div><span className="star-toggle ti-star"></span>
                                                </div>
                                                <div className="col-mail col-mail-2">
                                                    <div className="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div>
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

export default ReceivedProjects;

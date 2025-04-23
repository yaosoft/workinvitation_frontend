import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';

import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Index = ( params ) => {
// console.log( params );
	return (
		<>
				<Header />
				<Sidebar />	

				<div className="content-body">

            <div className="container-fluid mt-3">
               
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-sm-6 col-xxl-6">

                        <div className="card">
                            <div className="chart-wrapper mb-4">
                                <div className="px-4 pt-4 d-flex justify-content-between">
                                    <div>
                                        <h4>Sales Activities</h4>
                                        <p>Last 6 Month</p>
                                    </div>
                                    <div>
                                        <span><i className="fa fa-caret-up text-success"></i></span>
                                        <h4 className="d-inline-block text-success">720</h4>
                                        <p className=" text-danger">+120.5(5.0%)</p>
                                    </div>
                                </div>
                                <div>
                                        <canvas id="chart_widget_3"></canvas>
                                </div>
                            </div>
                            <div className="card-body border-top pt-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ul>
                                            <li>5% Negative Feedback</li>
                                            <li>95% Positive Feedback</li>
                                        </ul>
                                        <div>
                                            <h5>Customer Feedback</h5>
                                            <h3>385749</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div id="chart_widget_3_1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-6 col-xxl-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Activity</h4>
                                <div id="activity">
                                    <div className="media border-bottom-1 pt-3 pb-3">
                                        <img width="35" src="./images/avatar/1.jpg" className="mr-3 rounded-circle"/>
                                        <div className="media-body">
                                            <h5>Received New Order</h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back,</p>
                                        </div><span className="text-muted ">April 24, 2018</span>
                                    </div>
                                    <div className="media border-bottom-1 pt-3 pb-3">
                                        <img width="35" src="./images/avatar/2.jpg" className="mr-3 rounded-circle" />
                                        <div className="media-body">
                                            <h5>iPhone develered</h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back,</p>
                                        </div><span className="text-muted ">April 24, 2018</span>
                                    </div>
                                    <div className="media border-bottom-1 pt-3 pb-3">
                                        <img width="35" src="./images/avatar/2.jpg" className="mr-3 rounded-circle" />
                                        <div className="media-body">
                                            <h5>3 Order Pending</h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back,</p>
                                        </div><span className="text-muted ">April 24, 2018</span>
                                    </div>
                                    <div className="media border-bottom-1 pt-3 pb-3">
                                        <img width="35" src="./images/avatar/2.jpg" className="mr-3 rounded-circle" />
                                        <div className="media-body">
                                            <h5>Join new Manager</h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back,</p>
                                        </div><span className="text-muted ">April 24, 2018</span>
                                    </div>
                                    <div className="media border-bottom-1 pt-3 pb-3">
                                        <img width="35" src="./images/avatar/2.jpg" className="mr-3 rounded-circle" />
                                        <div className="media-body">
                                            <h5>Branch open 5 min Late</h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back,</p>
                                        </div><span className="text-muted ">April 24, 2018</span>
                                    </div>
                                    <div className="media border-bottom-1 pt-3 pb-3">
                                        <img width="35" src="./images/avatar/2.jpg" className="mr-3 rounded-circle" />
                                        <div className="media-body">
                                            <h5>New support ticket received</h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back,</p>
                                        </div><span className="text-muted ">April 24, 2018</span>
                                    </div>
                                    <div className="media pt-3 pb-3">
                                        <img width="35" src="./images/avatar/3.jpg" className="mr-3 rounded-circle" />
                                        <div className="media-body">
                                            <h5>Facebook Post 30 Comments</h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back,</p>
                                        </div><span className="text-muted ">April 24, 2018</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-sm-12 col-xxl-12">
                        <div className="card">
                            <div className="card-body">
                                    <h4 className="card-title mb-0">Store Location</h4>
                                <div id="world-map" style={{ height: '470px' }}></div>
                            </div>        
                        </div>
                    </div>
                </div>

                

                <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="card">
                                <div className="social-graph-wrapper widget-facebook">
                                    <span className="s-icon"><i className="fa fa-facebook"></i></span>
                                </div>
                                <div className="row">
                                    <div className="col-6 border-right">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">89k</h4>
                                            <p className="m-0">Friends</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">119k</h4>
                                            <p className="m-0">Followers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="card">
                                <div className="social-graph-wrapper widget-linkedin">
                                    <span className="s-icon"><i className="fa fa-linkedin"></i></span>
                                </div>
                                <div className="row">
                                    <div className="col-6 border-right">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">89k</h4>
                                            <p className="m-0">Friends</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">119k</h4>
                                            <p className="m-0">Followers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="card">
                                <div className="social-graph-wrapper widget-googleplus">
                                    <span className="s-icon"><i className="fa fa-google-plus"></i></span>
                                </div>
                                <div className="row">
                                    <div className="col-6 border-right">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">89k</h4>
                                            <p className="m-0">Friends</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">119k</h4>
                                            <p className="m-0">Followers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="card">
                                <div className="social-graph-wrapper widget-twitter">
                                    <span className="s-icon"><i className="fa fa-twitter"></i></span>
                                </div>
                                <div className="row">
                                    <div className="col-6 border-right">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">89k</h4>
                                            <p className="m-0">Friends</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                            <h4 className="m-1">119k</h4>
                                            <p className="m-0">Followers</p>
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

export default Index;
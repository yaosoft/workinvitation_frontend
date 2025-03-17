import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

import { AuthContext } from "../../context/AuthProvider";
import { SiteContext } from "../../context/site";
import HeaderHome from '../HeaderHome';
import Footer from '../Footer';

const Home = ( params ) => {
	
	
	return (
		<>
		<HeaderHome />
		<div className="">

            <div className="container-fluid mt-3">

                <div className="row">
					<div className="col-xl-6 col-lg-12 col-sm-12 col-xxl-12">
                        <div className="card">
                            <div className="card-body">
                                <h3>Welcome to your project management tool</h3>
								<h6>You can write a project and invite some workers to do it. We help you to manage your projects securely.</h6>
                            </div>        
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-6 col-xxl-6">
                        <div className="card">
                            <div className="chart-wrapper mb-4" style={{ MarginBottom: 0 }}>
                                <div className="px-4 pt-4 d-flex justify-content-between">
                                    <div>
                                        <h4>Send a Project</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body border-top pt-4">
                                <div className="row">
                                    <div>
									Do you need someone to help you achieve a project. Use this tool to manahe all the steps until your project is done.
										<ul>
                                            <li>Use our simplified project writing form powered with project writing ai and transform your toughts to a sharable project.</li>
											<li>Invite one or many worker on your project with the project's sending feature.</li>
											<li>Dialog with your workers, manage and exchange files thru our project's chat</li>
										</ul>
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
                            <div className="chart-wrapper mb-4" style={{ MarginBottom: 0 }}>
                                <div className="px-4 pt-4 d-flex justify-content-between">
                                    <div>
                                        <h4>Your subscription</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body border-top pt-4">
                                <div className="row">
                                    <div>
									Once you've received an invitatin to work on a project, all you have to do is to click on the project's link in the mail. You will head the app's login page.
										<ul>
											<li>If you do not have an account, just fill the password fiels. You can update your profile at any moment.</li>
											<li>Read the project and attachements carefully before replying to the project owner.</li>
											<li>Dialog with the project owner and start working on the project. With the project chatbox, share ideas and files with the project owner.</li>
										</ul>
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
                            <div className="chart-wrapper mb-4" style={{ MarginBottom: 0 }}>
                                <div className="px-4 pt-4 d-flex justify-content-between">
                                    <div>
                                        <h4>Manage your contacts</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body border-top pt-4">
                                <div className="row">
                                    <div>
									Once you've received an invitatin to work on a project, all you have to do is to click on the project's link in the mail. You will head the app's login page.
										<ul>
											<li>If you do not have an account, just fill the password fiels. You'l ne able to update your profile at any moment.</li>
											<li>Read the project and attachements carefully before replying to the project owner.</li>
											<li>Dialog with the project owner and start working on the project. With the project chatbox, share ideas and files with the project owner.</li>
										</ul>
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
                            <div className="chart-wrapper mb-4" style={{ MarginBottom: 0 }}>
                                <div className="px-4 pt-4 d-flex justify-content-between">
                                    <div>
                                        <h4>Help center</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body border-top pt-4">
                                <div className="row">
                                    <div>
									Do you need someone to help you achieve a project. Use this tool to manahe all the steps until your project is done.
										<ul>
                                            <li>Use our simplified project writing form powered with project writing ai and transform your toughts to a sharable project.</li>
											<li>Invite one or many worker on your project with the project's sending feature.</li>
											<li>Dialog with your workers, manage and exchange files thru our project's chat</li>
										</ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <div id="chart_widget_3_1"></div>
                                    </div>
                                </div>
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
			<div>&nbsp;</div>
			<Footer />
		</>
	);
};

export default Home;
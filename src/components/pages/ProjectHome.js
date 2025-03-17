import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';

import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Datamap from "datamaps";
const ProjectHome = ( params ) => {
// console.log( params );

	useEffect(() => {
		var myMap = new Datamap({
		  element: document.getElementById("basic"),
		  scope: "world",
		  responsive: true,
		  fills: {
			defaultFill: "#bbb",
			haveWorker: "green",
		  },
		  geographyConfig: {
			popupOnHover: true,
			highlightOnHover: true,
			highlightFillColor: "#F28432",
			popupTemplate: function (geography, data) {
			  return (
				'<div class="" style="color:yellow, bgColor:white">' +
				geography.properties.name +
				" " + data.workerCount + " workers"
			  );
			}
		  },
		  data: {
			// Country Codes list https://countrycode.org/
			// USA: {
			//   fillKey: "firstWorld",
			//   workerCount: 1900
			// },
			GB: {
			  fillKey: "haveWorker",
			  workerCount: 5
			},
			CHN: {
			  fillKey: "haveWorker",
			  workerCount: 11
			},
			JPN: {
			  fillKey: "haveWorker",
			  workerCount: 1
			},
			AUS: {
			  fillKey: "haveWorker",
			  workerCount: 2
			},
			CMR: {
			  fillKey: "haveWorker",
			  workerCount: 10
			},
			EST: {
			  fillKey: "haveWorker",
			  workerCount: 7
			}
			// IND: {
			//   fillKey: "thirdWorld",
			//   workerCount: 1500
			// }
		  }
		});

		// Manage responsiveness
		window.addEventListener("resize", function () {
		  myMap.resize();
		});

		// configure bubbles
		myMap.bubbles(
		  [
			// {
			//   name: "Tourist Spot 1",
			//   radius: 5,
			//   centered: "IND",
			//   tourist: 3800,
			//   fillKey: "boringSpot"
			// },
		  ],
		  {
			popupTemplate: function (geo, data) {
			  return (
				'<div class="hoverinfo">' +
				data.name +
				"<br /> No of Tourists:" +
				data.tourist
			  );
			}
		  }
		);

		//load legend
		myMap.legend();
	}, []);

	return (
		<>
				<Header />
				<Sidebar />	

				<div className="content-body">
			 
            <div className="container-fluid mt-3">
                <div className="row">
					<div className="col-xl-6 col-lg-12 col-sm-12 col-xxl-12">
                        <div className="card">
                            <div className="card-body">
                                    <h4 className="card-title mb-0">Projects and workers</h4><br/>
									<h6>Discover latest projects and workers on the platform and add some workers contact to your contact lists.</h6>
                            </div>        
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-6 col-xxl-6">
                        <div className="card">
                            <div className="chart-wrapper mb-4" style={{ MarginBottom: 0 }}>
                                <div className="px-4 pt-4 d-flex justify-content-between">
                                    <div >
                                        <h4><img style={{ width: 40, height: 40 }} src='./img/user/1.png' />&nbsp;Alexander Holse </h4><p>Started: 6 Month, Status: open</p><span style={{fontSize: 12 }}><i className='fa fa-user-plus'/>&nbsp;Add to your contact list&nbsp;|&nbsp;<i className='fa fa-envelope'/>&nbsp;Invite on a project</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body border-top pt-4">
                                <div className="row">
                                    <div>
									<b>French to english translation</b><br/><br/>
									Once you've received an invitatin to work on a project, all you have to do is to click on the project's link in the mail. You will head the app's login page.
										<ul>
											<li>If you do not have an account, just fill the password fiels. You'l ne able to update your profile at any moment. <br/><br/><a href='#'>Open the project</a></li>
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
                                        <h4><img style={{ width: 40, height: 40 }} src='./img/user/1.png' />&nbsp;Alexander Holse </h4><p>Started: 6 Month, Status: open</p><span style={{fontSize: 12 }}>Add to your contact list&nbsp;|&nbsp;Invite on a project</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body border-top pt-4">
                                <div className="row">
                                    <div>
									<b>French to english translation</b><br/><br/>
									Once you've received an invitatin to work on a project, all you have to do is to click on the project's link in the mail. You will head the app's login page.
										<ul>
											<li>If you do not have an account, just fill the password fiels. You'l ne able to update your profile at any moment. <br/><br/><a href='#'>Open the project</a></li>
										</ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <div id="chart_widget_3_1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
					
                    <div className="col-xl-6 col-lg-12 col-sm-12 col-xxl-12">
                        <div className="card">
                            <div className="card-body">
								<h4 className="card-title mb-0">Workers by Location</h4>
                                <div 
									id="basic" 
									style={{ 
										position: 'relative', 
										width: 'auto%', 
										height: '470px',
										marginTop: '10px'
									}}
								/>
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

export default ProjectHome;
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';

import '../../sidebarOverrides.css';
import '../../chatStyles.css';

const Project = ( params ) => {
	let { id } = useParams();
// console.log( params );
	return (
		<>
				<Header />
				<Sidebar />	
				        <div className="content-body">

				<Breadcrumbs />

            <div className="container-fluid mt-3">
				<h3>Creation of prospective and predictive analysis algorithms</h3>
				<br />
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="card gradient-1">
                            <div className="card-body">
                                <h3 className="card-title text-white">Project Owner</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white">Paul</h2>
                                    <p className="text-white mb-0">Smith</p>
                                </div>
                                <span className="float-right display-5 opacity-5"><i className="fa fa-user"></i></span>
                            </div>
                        </div>
                    </div>
					<div className="col-lg-3 col-sm-6">
                        <div className="card gradient-3">
                            <div className="card-body">
                                <h3 className="card-title text-white">Project type</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white">Internal</h2>
                                    <p className="text-white mb-0">Company to employee</p>
                                </div>
                                <span className="float-right display-5 opacity-5"><i className="fa fa-paperclip"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card gradient-2">
                            <div className="card-body">
                                <h3 className="card-title text-white">Budget</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white">$ 0</h2>
                                    <p className="text-white mb-0">No budget</p>
                                </div>
                                <span className="float-right display-5 opacity-5"><i className="fa fa-money"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card gradient-4">
                            <div className="card-body">
                                <h3 className="card-title text-white">Status</h3>
                                <div className="d-inline-block">
                                    <h2 className="text-white">Started</h2>
                                    <p className="text-white mb-0">Jan - March 2019</p>
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
                                            <h4 className="mb-1">Project's Chat and files</h4>
                                            
											
											
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
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Activity</th>
													<th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>sarah@foo.com</td>
                                                    <td>Sarah Mancini</td>
                                                    <td><i className="fa fa-circle-o text-success  mr-2"></i> Started</td>
                                                    <td>
                                                        <span>Last Login</span>
                                                        <span className="m-0 pl-3">10 sec ago</span>
                                                    </td>
													<td><Link><i className="fa fa-comments-o text-success  mr-2"></i> chat</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Walter R.</td>
                                                    <td>Pixel 2</td>
                                                    <td><i className="fa fa-circle-o text-info  mr-2"></i> Read</td>
                                                    <td>
                                                        <span>Last Login</span>
                                                        <span className="m-0 pl-3">50 sec ago</span>
                                                    </td>
													<td><Link><i className="fa fa-comments-o text-success  mr-2"></i> chat</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Andrew D.</td>
                                                    <td>OnePlus</td>
                                                    <td><i className="fa fa-circle-o text-warning  mr-2"></i> Pending</td>
                                                    <td>
                                                        <span>Last Login</span>
                                                        <span className="m-0 pl-3">None</span>
                                                    </td>
													<td><Link><i className="fa fa-plane text-warning  mr-2"></i> re-invite</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Megan S.</td>
                                                    <td>Galaxy</td>
                                                    <td><i className="fa fa-circle-o text-success  mr-2"></i> Started</td>
                                                    <td>
                                                        <span>Last Login</span>
                                                        <span className="m-0 pl-3">10 sec ago</span>
                                                    </td>
													<td><Link><i className="fa fa-comments-o text-success  mr-2"></i> chat</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Doris R.</td>
                                                    <td>Moto Z2</td>
                                                    <td><i className="fa fa-circle-o text-success  mr-2"></i> Started</td>
                                                    <td>
                                                        <span>Last Login</span>
                                                        <span className="m-0 pl-3">10 sec ago</span>
                                                    </td>
													<td><Link><i className="fa fa-comments-o text-success  mr-2"></i> chat</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Elizabeth W.</td>
                                                    <td>Notebook Asus</td>
                                                    <td><i className="fa fa-circle-o text-warning  mr-2"></i> Pending</td>
                                                    <td>
                                                        <span>Last Login</span>
                                                        <span className="m-0 pl-3">None²</span>
                                                    </td>
													<td><Link><i className="fa fa-plane text-warning  mr-2"></i> re-invite </Link></td>
                                                </tr>
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

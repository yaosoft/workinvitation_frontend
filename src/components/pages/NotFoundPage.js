import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

import '../../sidebarOverrides.css';

const NotFoundPage = ( params ) => {
// console.log( params );
	return (
		<>
			<Header />
			<Sidebar />	
			<div class="content-body">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12">
							<h3>Page not found</h3>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default NotFoundPage;

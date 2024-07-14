import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';


const Footer = ( params ) => {
// console.log( params );
	return (
		<>

		<div className="footer">
						<div className="copyright">
							<p>Copyright &copy; Designed & Developed by <a href="https://themeforest.net/user/quixlab">Work Invitation</a> 2018</p>
						</div>
					</div>
		</>
	);
};

export default Footer;

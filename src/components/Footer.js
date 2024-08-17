import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';


const Footer = ( params ) => {
// console.log( params );
	return (
		<>

		<div className="footer">
						<div className="copyright">
							<p>Copyright &copy; Designed & Developed by <a href="https://diamta.com">Diamta - Work Invitation</a> 2024</p>
						</div>
					</div>
		</>
	);
};

export default Footer;

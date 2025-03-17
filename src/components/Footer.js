import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';


const Footer = ( params ) => {
// console.log( params );
	return (
		<>

		<div className="footer" style={{ 'paddinLeft': 0, marginTop: '30%' }}>
						<div className="copyright" style={{ textAlign: 'center' }}>
							Copyright &copy; Designed & Developed by <a href="https://diamta.com">Diamta - Work Invitation</a> 2024
						</div>
					</div>
		</>
	);
};

export default Footer;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Breadcrumbs';


import '../../sidebarOverrides.css';

const privacy = ( params ) => {
	
	const pageTitle = 'Privacy';
	
	return (
		<>
				<Header />
				<Sidebar />	
				        <div className="content-body">

				<Breadcrumbs />
				
				<div className="container-fluid" style={{ minHeigth: '600px' }}>
                <div className="row">
                    <div className="col-lg-12">
						<h3>{ pageTitle }</h3>
						<br />
                        
						<div className="card" style={{ padding: '2%' }}>
                            <p>We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they relate to the collection, use and disclosure of Personal Information.</p>
							<h6>1. Introduction</h6>
							<p>We are responsible for maintaining and protecting the Personal Information under our control. We have designated an individual or individuals who is/are responsible for compliance with our privacy policy.</p>
							<h6>2. Identifying Purposes</h6>
							<p>We collect, use and disclose Personal Information to provide you with the service you have requested and to offer you additional products and services we believe you might be interested in. The purposes for which we collect Personal Information will be identified before or at the time we collect the information. In certain circumstances, the purposes for which information is collected may be clear, and consent may be implied, such as where your name, address and payment information is provided as part of the order process.</p>
							<h6>3. Consent</h6>
							<p>Knowledge and consent are required for the collection, use or disclosure of Personal Information except where required or permitted by law. Providing us with your Personal Information is always your choice. However, your decision not to provide certain information may limit our ability to provide you with or services. We will not require you to consent to the collection, use, or disclosure of information as a condition to the supply of service, except as required to be able to supply the product or service.</p>
							<h6>4. Limiting Collection</h6>
							<p>The Personal Information collected will be limited to those details necessary for the purposes identified by us. With your consent, we may collect Personal Information from you in person, over the telephone or by corresponding with you via mail, facsimile, or the Internet.</p>
							<h6>5. Limiting Use, Disclosure and Retention</h6>
							<p>Personal Information may only be used or disclosed for the purpose for which it was collected unless you have otherwise consented, or when it is required or permitted by law. Personal Information will only be retained for the period of time required to fulfill the purpose for which we collected it or as may be required by law. </p>
							<h6>6. Accuracy</h6>
							<p>Personal Information will be maintained in as accurate, complete and up-to-date form as is necessary to fulfill the purposes for which it is to be used.</p>
							<h6>7. Safeguarding Customer Information</h6>
							<p>Personal Information will be protected by security safeguards that are appropriate to the sensitivity level of the information. We take all reasonable precautions to protect your Personal Information from any loss or unauthorized use, access or disclosure.</p>
							<h6>8. Openness</h6>
							<p>We will make information available to you about our policies and practices with respect to the management of your Personal Information.</p>
							<h6>9. Customer Access</h6>
							<p>Upon request, you will be informed of the existence, use and disclosure of your Personal Information, and will be given access to it. You may verify the accuracy and completeness of your Personal Information, and may request that it be amended, if appropriate. However, in certain circumstances permitted by law, we will not disclose certain information to you. For example, we may not disclose information relating to you if other individuals are referenced or if there are legal, security or commercial proprietary restrictions.</p>
							<h6>10. Handling Customer Complaints and Suggestions</h6>
							<p>You may direct any questions or enquiries with respect to our privacy policy or our practices by contacting: info@workinvitation.com</p>
							<p>&nbsp;</p>
							<h6>Additional Information</h6>
							<p>&nbsp;</p>
							<h6>Cookies</h6>
							<p>A cookie is a small computer file or piece of information that may be stored in your computer's hard drive when you visit our websites. We may use cookies to improve our website’s functionality and in some cases, to provide visitors with a customized online experience.<br/><br/>Cookies are widely used and most web browsers are configured initially to accept cookies automatically. You may change your Internet browser settings to prevent your computer from accepting cookies or to notify you when you receive a cookie so that you may decline its acceptance. Please note, however, if you disable cookies, you may not experience optimal performance of our website.</p>
							<h6>Other Websites</h6>
							<p>Our website may contain links to other third party sites that are not governed by this privacy policy. Although we endeavour to only link to sites with high privacy standards, our privacy policy will no longer apply once you leave our website. Additionally, we are not responsible for the privacy practices employed by third party websites. Therefore, we suggest that you examine the privacy statements of those sites to learn how your information may be collected, used, shared and disclosed.</p>
							<p></p>
						</div>
                    </div>
                </div>
				
            </div>
			 </div>
			<Footer />
		</>
	);
};

export default privacy;


import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';
import { ChatContext } from '../context/Chat';
import { SiteContext } from '../context/site';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';

import '../sidebarOverrides.css';
import '../antUpload.css';


import '../chatStyles.css';

import { Space, Spin, Button, notification, message, Popconfirm, Radio, Flex, DatePicker, Image, Upload } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined,
	InboxOutlined, 
	QuestionCircleOutlined
} from '@ant-design/icons';


const Test = ( ) => {
	console.log( 'params' );
	

	return (
		<>
			
		</>
	);
};
export default Test;
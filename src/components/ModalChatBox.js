import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { ProjectContext } from '../context/Project';
import '../modalOverrides.css';
import ChatBox from './ChatBox';

import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const ModalChatBox = ( params ) => {

	return (
		<>
			<ChatBox
				params={{
					messageId:			params.params.messageId,
					project: 			params.params.project,
					isOwner: 			params.params.isOwner,
					messageReceiverId: 	params.params.messageReceiverId,	
					messageUserId : 	params.params.messageUserId,
				}} 
			/>
		</>
	);
};

export default ModalChatBox;

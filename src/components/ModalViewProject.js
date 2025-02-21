import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { ProjectContext } from '../context/Project';
import '../modalOverrides.css';

import { Space, Spin, Button, notification, message, Popconfirm } from 'antd';
import {
	RadiusBottomleftOutlined,
	RadiusBottomrightOutlined,
	RadiusUpleftOutlined,
	RadiusUprightOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const ModalViewProject = ( params ) => {
	const { backendServer }	= useContext( ProjectContext );

	const project 	= params.params.project;
	const images 	= project.files;

	useEffect(() => {

	}, [] );

	const ProjectFiles = () => {
		return (
			images.map ( ( image, index ) => 
				<span key={ index }> 
					<a href= { backendServer + '/uploads/files/projects/' + image.path } download = { image.name } target="_blank"> { image.name } </a>
				</span>
			)
		)
	}

	return (
		<>
			<div class="bootstrap-modal">
					<div class="modal-dialog" role="document">
						<div class="modal-content" style={{width: '100%'}}>
							<div class="modal-header">
								<h5 class="modal-title" id="contactAddModalLabel">{ project.title }</h5>
							</div>
							<div class="modal-body">
								{ project.description }
							</div>
							<div class="modal-footer">
								{ images.length && 'Document:' }
								<br/>
								<ProjectFiles />
							</div>
						</div>
					</div>
				
			</div>
		</>
	);
};

export default ModalViewProject;

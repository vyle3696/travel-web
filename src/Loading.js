
import React from 'react';
import ReactDom from 'react-dom';
import './Loading.css';
import $ from 'jquery';
import axios, { post } from 'axios';

class Loading extends React.Component{
	render(){
		return(
				<div id="loader">
		    		<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="lading"></div>
				</div>
		);
	}
}

export default Loading;



import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import './Error.css';

class Login extends React.Component{
	constructor(props){
		super(props);
	}
	onClick(){
		window.location.assign(window.location.origin);
	}
	render(){
		return(
			<div className="error-contain">
			    <p className="text404">404</p>
				<p className="text-error">Category not found</p>
				<p>Please try one of following pages</p>
				<button onClick = {this.onClick} >HOME PAGE</button>
				<br/>
				<img className="img-error" src={require("./images/donkey-icon.png")} width="280px" height="280px"/>
			</div>
		);
	}



}
//

export default Login;
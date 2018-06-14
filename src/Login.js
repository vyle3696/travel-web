import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import './Login.css';

class Login extends React.Component{
	render(){
		return(
			<div>
			    <div className="head">
			    <div className="head-top">
			      <div className="head-logo">
			        
			      </div>
			    </div>
			    
			  </div>
			  <div className="login-form">
			    <img src={require("./images/logo.png")} alt="home-logo"/>
			      <div id="login-content" className="content">
			        <input id="user" type="text" name="user" placeholder="User"/><br/>
			        <input id="password" type="password" name="pass" placeholder="Password"/><br/>
			        <input id="submit" type="button" value="LogIn" onClick={this.props.onLoginClick}/>
			      </div>
			      <p id="notice"></p>
			    </div>
			  </div>
		);
	}
}
//

export default Login;

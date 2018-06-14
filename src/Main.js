import React from 'react';
import ReactDom from 'react-dom';

import Navbar from './Navbar.js';
import Login from'./Login.js';
import ErrorPage from'./Error.js';
import Home from './Home.js';
import Profile from './Profile.js';
import Post from './PostPage.js';
import $ from 'jquery';
import SimpleReactFileUpload from './Test.js';

var userID = "";
if(window.location.hash != ""){
	if(window.location.hash.indexOf("#/profile") > -1){
		userID = window.location.hash.replace("#/profile/","");
	}
}

var postID = "";
if(window.location.hash != ""){
	if(window.location.hash.indexOf("#/post") > -1){
		postID = window.location.hash.replace("#/post/","");
	}
}

class Main extends React.Component{

	constructor() {
	    super(...arguments);
	    this.state = {
	      	route: window.location.hash.substr(1),
	      	postID: postID,
	      	idUserProfile: userID
	    };
	    this.checkLogin = this.checkLogin.bind(this);
	    this.onLogout = this.onLogout.bind(this);
	    this.loginSuccess = this.loginSuccess.bind(this);
	}

	loginSuccess(data) {
		localStorage.travelNetToken = data.token;
		localStorage.travelNetIdUser = data.idUser;
		localStorage.travelNetNickName = data.nicName;
		localStorage.travelNetUrlUser = data.urlUser;
		window.location.assign(window.location.origin);
	}

	loginFailed() {
		$("#notice").text("Tên đăng nhập hoặc mật khẩu không đúng");
	}

	checkLogin() {
		var that = this;
		var userInfo = {usrName:"vyle3696", passWord:"123456"};
		var usr = $("#user").val();
		var pass = $("#password").val();

		var loginInfo = {
			user_Name : usr,
		 	password : pass
		};
      
      $.ajax({
		url:"http://localhost:8080/demo-1/user/login",
		type: "POST",
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(loginInfo),
		success:function(data){
			console.log(data);
			that.loginSuccess(data)
			},
		error:function(xhr,error){
			that.loginFailed();
		}
		});

		/*console.log(usr);
		console.log(userInfo.usrName);
		console.log(pass);
		console.log(userInfo.passWord);
		if((usr.localeCompare(userInfo.usrName) == 0)
			&& (pass.localeCompare(userInfo.passWord)) == 0) {
			this.loginSuccess();
		}
		else
		{
			this.loginFailed();
		}*/
	}

	onLogout() {
		localStorage.removeItem("travelNetToken");
		localStorage.removeItem("travelNetIdUser");
		localStorage.removeItem("travelNetUrlUser");
		localStorage.removeItem("travelNetNickName");
		this.setState({route: "/login"});
		window.location.assign(window.location.origin + "/#/login");
	}

	componentDidMount() {
	    window.addEventListener('hashchange', () => {
	      	this.setState({
	        	route: window.location.hash.substr(1)
	      	});
	    });

	    if(!localStorage.travelNetToken){
	    	
	    	window.location.assign(window.location.origin + "/#/login");
	    	this.setState({route: "/login"});
	    	
	    }


	}

	render(){
		var Content;
		switch(this.state.route) {
	      case ('/profile/' + this.state.idUserProfile): Content = <div><Navbar onLogout={this.onLogout}  rootPointer={this}/> <Profile idUser = {this.state.idUserProfile} rootPointer={this}/> </div> ; break; //
	      case ('/post/' + this.state.postID): Content = <div><Navbar onLogout={this.onLogout} rootPointer={this}/><Post rootPointer={this} rootPointer={this}/></div>; break;//
	      case '/login': Content = <Login onLoginClick={this.checkLogin} value = "hihi" rootPointer={this}/>; break;
	      case '/error': Content = <ErrorPage rootPointer={this}/>; break;
	      default:       Content = <div><Navbar onLogout={this.onLogout} rootPointer={this}/> <Home rootPointer={this}/></div>; break;//
	    }
		return(
			<div>
				{Content}
			</div>
		);
	}
}

//

export default Main;
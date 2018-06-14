import React from 'react';
import ReactDom from 'react-dom';
import './Home.css';
import $ from 'jquery';

class Navbar extends React.Component{
	constructor(props){
		super(props);
		this.onUserInfoClick = this.onUserInfoClick.bind(this);
	}
	onUserInfoClick(e) {
		e.stopPropagation();
	    this.props.rootPointer.setState({idUserProfile: localStorage.travelNetIdUser});
	    window.location.assign(window.location.origin + "#/profile/" + localStorage.travelNetIdUser);
	    this.props.rootPointer.setState({route: "/profile/" + localStorage.travelNetIdUser});

		if(window.location.hash.indexOf("#/profile") > -1){
			 window.location.reload();
		}
	}
	render(){
		return(
			<nav id="navbar">
			  <div className="container">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>                        
			      </button>
			      <img className="img-logo" src={require("./images/logo.png")}/>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      	<input id="search-bar" placeholder="Tìm kiếm mọi thứ..."/>
			      <ul className="nav navbar-nav navbar-right">
			        <li><a href="#" className="navbar-item"><span className="glyphicon glyphicon-home"></span> Trang chủ</a></li>
			        <li><a onClick={this.onUserInfoClick} className="navbar-item"><span className="glyphicon glyphicon-user"></span> Trang cá nhân</a></li>
			        <li><a href="#" className="navbar-item"><span className="glyphicon glyphicon-comment"></span></a></li>
			        <li><a href="#" className="navbar-item"><span className="glyphicon glyphicon-bell"></span></a></li>
			        <li><a onClick={this.props.onLogout} className="navbar-item"><span className="fa fa-sign-out"></span></a></li>
			      </ul>
			    </div>
			  </div>
			</nav>
		);
	}
}

export default Navbar;
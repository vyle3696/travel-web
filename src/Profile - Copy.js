import React from 'react';
import ReactDom from 'react-dom';
import './Home.css';
import Navbar from './Navbar.js';
import $ from 'jquery';
import './Profile.css';
import axios, { post } from 'axios';

var isInit = true;
class UserInfo extends React.Component{
	render(){
		return(
			<div className="row">
                <div className="col-md-6 col-lg-6 "> 
                  <div className="panel panel-info">
	            <div className="panel-heading">
	              <a id="edit-usr-info" type="button" className="btn btn-sm btn-warning" onClick={this.props.showUpdateUserInfoDialog}><i className="glyphicon glyphicon-edit" ></i></a>
	            </div>
	            <div className="panel-body">
	            	<table className="table table-user-information">
	                    <tbody>
	                      <tr>
	                        <td>Tên người dùng:</td>
	                        <td>{this.props.userInfo.nicName}</td>
	                      </tr>
	                      <tr>
	                        <td>Ngày sinh:</td>
	                        <td>{this.props.userInfo.birthday}</td>
	                      </tr>
	                      <tr>
	                        <td>Giới tính:</td>
	                        <td>{this.props.userInfo.gender}</td>
	                      </tr>
	                        <tr>
	                        <td>Đến từ</td>
	                        <td>{this.props.userInfo.address}</td>
	                      </tr>
	                      <tr>
	                        <td>Email</td>
	                        <td><a href="mailto:info@support.com">{this.props.userInfo.email}</a></td>
	                      </tr>
	                        <tr><td>Điện thoại</td>
	                        <td>{this.props.userInfo.sdt}</td>
	                      </tr>
	                     
	                    </tbody>
	                  </table>
	              
	            </div>
	          </div>
                </div>
                
              	<div className="col-md-6 col-lg-6 artictcle">
                	<img src="https://accesstrade.vn/wp-content/uploads/2016/08/banner-lazada-750x315.png"/>
                	<img src="https://accesstrade.vn/wp-content/uploads/2016/08/banner-lazada-750x315.png"/>
                	<img src="https://accesstrade.vn/wp-content/uploads/2016/08/banner-lazada-750x315.png"/>
                </div>
            </div>
		);
	}
}

class UpdateUserInfoDialog extends React.Component{
	constructor(props){
		super(props);
		this.updateHandle = this.updateHandle.bind(this);
		this.onSaveUserInfo = this.onSaveUserInfo.bind(this);
		
	}

	onSaveUserInfo(){
		var that = this;
		console.log("hihi info");
		this.updateHandle()
		.then((response)=>{
			that.props.getUserInfo();
			console.log("success");
		});
	}

	updateHandle(){
		var that = this;
		var profileUpdate = {
			id: this.props.userInfo.id,
			user_Name: this.props.userInfo.user_Name,
			password: this.props.userInfo.password,
			nicName: $("#updateUsrName").val(),
			gender: this.props.userInfo.gender,
			birthday: $("#updateBirthday").val(),
			sdt: $("#updatePhone").val(),
			address: $("#updateAddress").val(),
			email: $("#updateEmail").val()
		}

		var url = "http://localhost:8080/demo-1/user/updateUser";
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
	        }
	    }
	    return post(url,profileUpdate,config);
		
	}

	componentDidMount() {
	}

	render(){
		return(
			<div>
				<div id="update-usr-info" className="panel panel-info popup-edit-profile">
		            <div className="panel-heading">
	                    <a onClick={this.onSaveUserInfo} type="button" className="btn btn-sm btn-success"><i className="fa fa-check"></i></a><span>  </span>
	                    <a onClick={this.props.closeOvelay} type="button" className="btn btn-sm btn-danger"><i className="glyphicon glyphicon-remove"></i></a>
		            </div>
		            <div className="panel-body">
		              	<div className="row">
							<div className="col-md-12 ">
								<form className="form-horizontal">
									<div className="form-group">
										<label className="col-md-5 control-label">Tên hiển thị</label>  
										<div className="col-md-6">
											<div className="input-group">
												<div className="input-group-addon">
													<i className="fa fa-user"></i>
												</div>
												<input id="updateUsrName" name="Name (Full name)" type="text"  className="form-control input-md"/>
											</div>                  
										</div>
									</div>

									<div className="form-group">
										<label className="col-md-5 control-label">Ngày sinh</label>  
										<div className="col-md-6">
											<div className="input-group">
												<div className="input-group-addon">
												 	<i className="fa fa-birthday-cake"></i>	
												</div>
												<input id="updateBirthday" name="Date Of Birth" type="date" className="form-control input-md"/>
											</div>
										</div>
									</div>

									<div className="form-group">
										<label className="col-md-5 control-label col-xs-12">Địa chỉ</label>  
										<div className="col-md-6">
											<div className="input-group">
												<div className="input-group-addon">
													<i className="material-icons">map</i>
												</div>
												<input id="updateAddress" name="Permanent Address" type="text" className="form-control input-md "/>
											</div>
										</div>
									</div>

									<div className="form-group">
										<label className="col-md-5 control-label">Số điện thoại </label>  
										<div className="col-md-6">
											<div className="input-group">
												<div className="input-group-addon">
													<i className="fa fa-phone"></i>
												</div>
												<input id="updatePhone" name="Phone number " type="text"  className="form-control input-md"/>
											</div>
										</div>
									</div>

									<div className="form-group">
										<label className="col-md-5 control-label">Email Address</label>  
										<div className="col-md-6">
											<div className="input-group">
												<div className="input-group-addon">
											 		<i className="fa fa-envelope-o"></i>
												 </div>
												<input id="updateEmail" name="Email Address" type="text"  className="form-control input-md"/>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
		            </div>
		          </div>
			</div>
		);
	}
}
//

class Profile extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
    	idUser:"",
      error: null,
      isLoaded: false,
      userInfo: {},
      file:null,
      rigthContent: <div/>
    };

    

    this.getUserInfo = this.getUserInfo.bind(this);
    this.initUpdateUserInfoDialog = this.initUpdateUserInfoDialog.bind(this);
	this.closeOvelay = this.closeOvelay.bind(this);
	this.showUpdateUserInfoDialog = this.showUpdateUserInfoDialog.bind(this);
	this.onAvtChange = this.onAvtChange.bind(this); 
	this.saveAvtChange = this.saveAvtChange.bind(this);  
	this.hideButtonEdit = this.hideButtonEdit.bind(this); 

    this.fileUpload = this.fileUpload.bind(this);
    this.initPage = this.initPage.bind(this);
    this.getUserInfoMethod = this.getUserInfoMethod.bind(this);
//    this.setLeftNavEvent = this.setLeftNavEvent.bind(this);
  	}

  	initPage(){
  		this.getUserInfo();

  	}

  	setLeftNavEvent(){
  		var that = this;
  		if(isInit){
  			that.setState({rigthContent: <UserInfo userInfo = {this.state.userInfo} showUpdateUserInfoDialog = {this.showUpdateUserInfoDialog}/>});
  			isInit = false;
  		}
  		
  		/*$(document).ready(function(){
	      $(".menu-item").click(function(){
	        if(this.className == "menu-item active"){
	          return;
	        }
	        $(".menu-item").attr("class", "menu-item");
	        this.className = "menu-item active";

	        switch($(this).id){
	        	case "nav-info": this.setState({rigthContent: <UserInfo userInfo = {this.state.userInfo} showUpdateUserInfoDialog = {this.showUpdateUserInfoDialog}/>}); break;
	        	case "nav-post": this.setState({rigthContent: <div>haha<div/>}); break;
	        }
	      });

	    });*/

	    $(document).ready(function(){
	    	$(".menu-item").click(function(){
		        if(this.className == "menu-item active"){
		          return;
		        }
		        $(".menu-item").attr("class", "menu-item");
	        	this.className = "menu-item active";

	        	/*switch($(this).id){
		        	case "nav-info": this.setState({rigthContent: <UserInfo userInfo = {this.state.userInfo} showUpdateUserInfoDialog = {this.showUpdateUserInfoDialog}/>}); break;
		        	case "nav-post": this.setState({rigthContent: <div>haha<div/>}); break;
		        }*/

		    });
	    });
  	}

  	//

	getUserInfo(){
  		this.getUserInfoMethod()
  		.then((response)=>{
			console.log(response.data);
			this.setState({
	            isLoaded: true,
	            userInfo: response.data
	          });
			/*that.closeOvelay();
			that.hideButtonEdit();*/

  		})
  		.then(()=>{
  			
  			this.hideButtonEdit();
  			//this.initUpdateUserInfoDialog();
  			this.closeOvelay();
  			//this.setLeftNavEvent();

  		})
  		.catch(error => {
  			this.setState({
	            isLoaded: true,
	            error
	        });
  		});
	}

	getUserInfoMethod(){
		var that = this;
	 	this.state.idUser = window.location.hash.replace("#/profile/","");
		
		if(this.state.idUser == ""){
	    	alert("empty");
	    }

		var url = "http://localhost:8080/demo-1/user/" + this.state.idUser;
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
				"contentType": 'application/json; charset=utf-8',
	        }
	    }
	    return axios.get(url,config);
	}

  	initUpdateUserInfoDialog(){
		$("#updateBirthday").val(this.state.userInfo.birthday);
		$("#updateUsrName").val(this.state.userInfo.nicName);
		$("#updatePhone").val(this.state.userInfo.sdt);
		$("#updateAddress").val(this.state.userInfo.address);
		$("#updateEmail").val(this.state.userInfo.email);

		$(".usr-avt").attr('src',this.state.userInfo.url);
	}

	showUpdateUserInfoDialog(){
		$(".overlay").css("display", "initial");
		$("#update-usr-info").css("display", "initial");
	}

	closeOvelay(){
		$("#update-usr-info").css("display", "none");
		$(".overlay").css("display", "none");
		$("#save-mode").css("display", "none");
		$("#exit-mode").css("display", "none");
		this.initUpdateUserInfoDialog();
		//this.hideButtonEdit()
	}

	hideButtonEdit(){
		if(this.state.idUser != localStorage.travelNetIdUser){
			$("#edit-mode").css("display", "none");
			$("#edit-usr-info").css("display", "none");
			$("#nav-setting").css("display", "none");
		}
		else{
			$(".usr-group-btn").css("display", "none");
		}
	}


	onAvtChange(e) {
	    //this.setState({file:e.target.files[0]})
	    this.state.file = e.target.files[0];
	    this.showUpdateAvtButton();
	    var input = document.getElementById("new-avt");
	    if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('.usr-avt')
                        .attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
	}

	showUpdateAvtButton(){
		$(".overlay").css("display", "initial");
		$("#save-mode").css({"display":"initial", "z-index": "100"});
		$("#exit-mode").css({"display":"initial", "z-index": "100"});
		$("#edit-mode").css({"z-index": "100"});

		var newImg;
		if(!document.getElementById("usr-avt-temp")){
			newImg = $('<img id="usr-avt-temp" class="usr-avt" />');
			newImg.appendTo("#content");
			newImg.id = "usr-avt-temp";
		}
		else{
			newImg = $("#usr-avt-temp");
		}
		newImg.css("display": "initial");
		newImg.css({"position": "fixed", "z-index": "99", "top": $("#usr-avt").offset().top - 20 , "left":$("#usr-avt").offset().left - 20});
	}

	saveAvtChange() {
		this.closeOvelay();
		this.fileUpload(this.state.file).then((response)=>{
	      this.getUserInfo();
	    })
	}

	fileUpload(file){
	    const url = 'http://localhost:8080/demo-1/user/updateImage';
	    const formData = new FormData();
	    formData.append('file',file)
	    formData.append('id',localStorage.travelNetIdUser);
	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data',
	            'Authorization': localStorage.travelNetToken
	        }
	    }
	    return  post(url, formData,config)
	  }

	cancelAvtChange(){
		$(".usr-avt").attr('src',this.state.userInfo.url);
		$("#usr-avt-temp").css("display", "none");

	}

	componentWillMount() {
		this.initPage();
  	}

  	componentDidMount() {
  		
  	}

  render() {

    const { error, isLoaded, userInfo } = this.state;
    if (error) {
      	return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      	return <div>Loading...</div>;
    } else {
    	
		return(
			<div id="content">
				<div className="overlay" onClick={this.closeOvelay}></div>
				<div id="profile-content" className="container" >
					<div id="left-nav">
						<div className="usr-info">
							<div id="edit-mode" className="upload-options">
						      <label>
						        <input id="new-avt" type="file" className="image-upload" accept="image/*" onChange={this.onAvtChange}/>
						      </label>
						    </div>
						    <div id="save-mode" onClick={this.saveAvtChange} className="upload-options">
						      <label>
						        <input id="new-avt" className="image-upload" accept="image/*" onChange={this.onAvtChange}/>
						      </label>
						    </div>
						    <div id="exit-mode" onClick={this.closeOvelay} className="upload-options">
						      <label>
						        <input id="new-avt" className="image-upload" accept="image/*" onChange={this.onAvtChange}/>
						      </label>
						    </div>
							<img id="usr-avt"className="usr-avt" />
							<div className="usr-name">{this.state.userInfo.nicName}</div>
						</div>
						<div className="usr-group-btn">
							<button className="common-btn"><span className="fa fa-check-circle-o"></span> Bạn bè</button>
							<button className="common-btn"><span className="fa fa-send-o"></span> Nhắn tin</button>
						</div>
						<div className="lnav-menu">
							<div id="nav-info" className="menu-item active"><span className="glyphicon glyphicon-user"></span>Thông tin</div>
							<div id="nav-post" className="menu-item"><span className="glyphicon glyphicon-pencil"></span>Bài viết</div>
							<div id="nav-friend" className="menu-item"><span className="fa fa-address-book-o"></span>Bạn bè</div>
							<div id="nav-setting" className="menu-item"><span className="glyphicon glyphicon-cog"></span>Cài đặt</div>
						</div>
						
					</div>
					<div id="right-content">
						{this.state.rigthContent}
					</div>
				</div>
				
				<UpdateUserInfoDialog 
					userInfo = {this.state.userInfo} 
					getUserInfo = {this.getUserInfo} 
					initUpdateUserInfoDialog = {this.initUpdateUserInfoDialog} 
					closeOvelay = {this.closeOvelay}
				/>

			</div>
		);
	}

		
	}
	
}

export default Profile;
import React from 'react';
import ReactDom from 'react-dom';
import './Home.css';
import './AddNewPost.css';
import $ from 'jquery';
import axios, { post } from 'axios';

class AddNewPost extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    	idUser:"",
      error: null,
      isLoaded: false,
      userInfo: {},
      file:null,
    };

	this.onAvtChange = this.onAvtChange.bind(this); 
	this.onSaveNewPost = this.onSaveNewPost.bind(this); 
    this.fileUpload = this.fileUpload.bind(this);

  	}

  	onAvtChange(e) {
  		var newImg = this.addNewImg();
	    this.setState({file:e.target.files[0]})
	    //this.state.file = e.target.files[0];
	    var input = document.getElementById("newp-thumbnail");
	    if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    newImg.attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
                
        }
	}

	addNewImg(){
		var d = new Date();
    	var n = d.getTime();
		var newDiv = $("<div class='newp-thumbnail-box'><img class='newp-thumbnail'><span class='fa fa-times-circle x-icon'></span></div>");
		newDiv[0].id = n;
		$("#newp-thumbnail-list").append(newDiv);
		newDiv.children().last().click((e)=>{
			e.target.parentElement.remove();
		});
		return newDiv.children().first();

	}

	onSaveNewPost() {
		this.fileUpload(this.state.file).then((response)=>{
	      	$("#newp-thumbnail-list").empty();
	      	$("#new-post-content").val("");
	    })
	}

	fileUpload(file){
	    const url = 'http://localhost:8080/demo-1/post';
	    const formData = new FormData();
	    formData.append('file',file)
	    formData.append('id_user',localStorage.travelNetIdUser);
	    formData.append('location',"Hồ Chí Minh");
	    formData.append("content", $("#new-post-content").val());
	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data',
	            'Authorization': localStorage.travelNetToken
	        }
	    }
	    return  post(url, formData,config)
	  }
	render(){
		return(
			<div id="add-new-post">
			  	<div id="newp-caption">
				  	<label>Thêm bài viết mới</label><br/>
				  	<textarea id ="new-post-content" type="text" name="" placeholder="Thử viết về chuyến đi của bạn...">
			  		</textarea>
			  	</div>
			  	<div id="newp-tool">
			  		<div id="newp-thumbnail-list">
			  		</div>
			  		<div className="div-br"></div>
			  		<br/>
			  		<div className="tool-group">
			  			<div className="include-icon">
			  				<span className="glyphicon glyphicon-map-marker"></span>
			  			</div>
			  			<div className="include-icon">
			  				<span className="glyphicon glyphicon-picture">
			  					<label><input id="newp-thumbnail" type="file" accept="image/*" onChange={this.onAvtChange}></input></label>
			  				</span>
			  			</div>
			  			<div className="include-icon">
			  				<span className="glyphicon glyphicon-tag"></span>
			  			</div>
			  			<div className="include-icon">
			  				<span className="glyphicon glyphicon-paperclip"></span>
			  			</div>
				  	</div>
			  		<a id="newp-submit" onClick={this.onSaveNewPost} className="btn icon-btn btn-info" href="#"><span className="glyphicon btn-glyphicon glyphicon-share img-circle text-info"></span>Đăng</a>
			  	</div>
			  	<div className="clearfix"></div>
		  	</div>
		);
	}
}

export default AddNewPost;
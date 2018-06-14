import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import './Profile.css';

import axios, { post } from 'axios';

class EditPostDialog extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			valueEdit: this.props.parent.state.postContent.content,
			imgPost: this.props.parent.state.postContent.urlPost,
			file: null

		}
		this.onCloseDialog = this.onCloseDialog.bind(this);
	    this.onEditTextChange = this.onEditTextChange.bind(this);

	    this.onAvtChange = this.onAvtChange.bind(this);
	    this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
	    this.fileUpload = this.fileUpload.bind(this);
	    this.mainInfoUpLoad = this.mainInfoUpLoad.bind(this);

	    
	}

	

	onCloseDialog(){
		this.props.parent.setState({Dialog: <div/>});
	}

	onEditTextChange(event) {
	    this.setState({valueEdit: event.target.value});
	}

	onAvtChange(e) {
	    this.setState({file:e.target.files[0]})
	    //this.state.file = e.target.files[0];
	    var input = document.getElementById("newp-thumbnail");
	    if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $(".newp-thumbnail").attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
                
        }
	}

	onUpdateSubmit() {

		this.mainInfoUpLoad().then((response)=>{
			if(this.state.file == null){
			this.props.parent.setState({Dialog: <div/>});
			this.props.parent.getPostContent();
			return;
			}
			this.fileUpload(this.state.file).then((response)=>{
		      	this.props.parent.setState({Dialog: <div/>});
		      	this.props.parent.getPostContent();
		      	this.onCloseDialog();
		    })

		});
		
	}

	mainInfoUpLoad(){

		var that = this;
		var profileUpdate = {
			id: this.props.parent.state.postContent.idPost,
			id_user: this.props.parent.state.postContent.idPost,
			location: "Hồ Chí Minh",
			content: this.state.valueEdit
		};

		var url = "http://localhost:8080/demo-1/post/updateinformation";
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
	        }
	    };
	    return  post(url, profileUpdate,config);
	  
	}

	fileUpload(file){
	    const url = 'http://localhost:8080/demo-1/post/update';
	    const formData = new FormData();
	    formData.append('file',file)
	    formData.append('id',this.props.parent.state.postContent.idPost);
	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data',
	            'Authorization': localStorage.travelNetToken
	        }
	    }
	    return  post(url, formData,config)
	  }

	componentDidMount() {
	}

	render(){
		return(
			<div className="overlay">
				<div id="update-usr-info" className="panel panel-info popup-edit-profile">
		            <div className="panel-heading">
		            	<span className="panel-heading-text">Chỉnh sửa bài viết</span>
	                    <a onClick={this.onCloseDialog} type="button" className="btn btn-sm btn-danger"><i className="glyphicon glyphicon-remove"></i></a>
		            </div>
		            <div className="panel-body">
		              	<div id="add-new-post">
						  	<div id="newp-caption">
							  	<textarea id ="new-post-content" type="text" name="" rows="5"  value={this.state.valueEdit} onChange={this.onEditTextChange}>
						  		</textarea>
						  	</div>
						  	<div id="newp-tool">
						  		<div id="newp-thumbnail-list">
						  			<div className='newp-thumbnail-box'>
						  				<img className='newp-thumbnail' src={this.state.imgPost}/><span className='fa fa-times-circle x-icon'></span>
						  			</div>
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
						  		<a id="newp-submit" onClick={this.onUpdateSubmit} className="btn icon-btn btn-info"><span className="glyphicon btn-glyphicon glyphicon-ok img-circle text-info"></span>Lưu</a>
						  	</div>
						  	<div className="clearfix"></div>
					  	</div>
						
		            </div>
		          </div>
			</div>
		);
	}
}

export default EditPostDialog;

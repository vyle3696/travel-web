import React from 'react';
import ReactDom from 'react-dom';
import './Home.css';
import './PostPage.css';
import Loading from './Loading.js';
import $ from 'jquery';
import EditPostDialog from './EditPostDialog.js';
import axios, { post } from 'axios';

class Comment extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		    content: <p/>,
		    onEdit:false,
		    valueEdit: this.props.content.contentComment
	    };

	    this.onEditComment = this.onEditComment.bind(this);
	    this.onEditTextChange = this.onEditTextChange.bind(this);
	    this.handleEditCommentKeyPress = this.handleEditCommentKeyPress.bind(this);

	    this.onUpdateComment = this.onUpdateComment.bind(this);
	    this.UpdateComment = this.UpdateComment.bind(this);

	    this.onRemoveComment = this.onRemoveComment.bind(this);
	    this.removeComment = this.removeComment.bind(this);
	}

	onEditTextChange(event) {
	    this.setState({valueEdit: event.target.value});
	}

	onEditComment(){
		this.setState({onEdit:true});
	}

	handleEditCommentKeyPress(event){
	  	if(event.key == 'Enter'){
	    	this.setState({onEdit:false});
	    	this.onUpdateComment();
	 	}
	}

	onUpdateComment(){
		var that = this;
		this.UpdateComment()
		.then((response)=>{
			console.log(response);
			that.props.getPostContent();
		});
	}

	UpdateComment(){
		var that = this;
		var content = {
			idComment: this.props.content.idComment,
			content: this.state.valueEdit
			};

		var url = "http://localhost:8080/demo-1/comment/updatecomment";
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
	        }
	    }
	    return post(url,content,config);
		
	}

	onRemoveComment(){
		var that = this;
		this.removeComment()
		.then((response)=>{
			console.log(response);
			that.props.getPostContent();
			$("#new-comment").val("");
		});
	}

	removeComment(){
		var that = this;

		var url = "http://localhost:8080/demo-1/comment/deletecomment/" + this.props.content.idComment;
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
	        }
	    }
	    return axios.get(url,config);
		
	}

	componentDidMount(){
		if(this.props.content.idUserComment == localStorage.travelNetIdUser){
			this.setState({content: <div className="group-setting-icon" ><div className="include-icon icon-remove" onClick = {this.onRemoveComment}><span className="glyphicon glyphicon-trash"></span></div>
						<div className="include-icon icon-edit" onClick = {this.onEditComment}><span className="glyphicon glyphicon-pencil"></span></div></div>});
		}
	}
//
	componentWillMount(){
		
	}


//
	render(){
		if(!this.state.onEdit){
			return(
				<div className="comment-item">
					<img src={this.props.content.urlUserComment}/>
					<div className="item-content">
						<span className="item-name">{this.props.content.nicNameComment}</span>
						<span className="time-comment">{this.props.content.timeComment}</span>
						{this.state.content}
						<p className="item-body">{this.props.content.contentComment}</p>
					</div>
				</div>
			);//
		}else{
			return(
				<div className="comment-item">
					<img src={this.props.content.urlUserComment}/>
					<div className="item-content">
						<textarea id="new-edit-comment" className="comment" name="content" rows="3" value={this.state.valueEdit} onChange={this.onEditTextChange} onKeyPress = {this.handleEditCommentKeyPress}></textarea>
					</div>
				</div>
			);
		}
		
	}
}

//

class PostContent extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	idUser:"",
	      error: null,
	      isLoaded: false,
	      postContent: {},
	      file:null,
	      postSettingElement: <p/>,
	      Dialog: <div/>
	    };

	    this.initPage = this.initPage.bind(this);
	    this.getPostContent = this.getPostContent.bind(this);
	    this.getPostContentMethod = this.getPostContentMethod.bind(this);
	    this.onSubmitComment = this.onSubmitComment.bind(this);
	    this.handleNewCommentKeyPress = this.handleNewCommentKeyPress.bind(this);
	    this.onRemovePost = this.onRemovePost.bind(this);
	    this.RemovePost = this.RemovePost.bind(this);
	    this.onUpdatePost = this.onUpdatePost.bind(this);
	    //this.RemovePost = this.RemovePost.bind(this);
  	}

  	initPage(){
  		this.getPostContent();
  	}

  	
	getPostContent(){
	 	var that = this;
  		this.getPostContentMethod()
  		.then((response)=>{
			console.log(response.data);
			that.setState({
	            isLoaded: true,
	            postContent: response.data,
	          });
			/*that.closeOvelay();
			that.hideButtonEdit();*/
			console.log("post content");
			console.log(that.state.postContent);

  		})
  		.then((response)=>{
  			if(this.state.postContent.idUserPost == localStorage.travelNetIdUser){
				this.setState({postSettingElement: <div className="p-content-right dropdown">
					  			<span className="dropdown-toggle glyphicon glyphicon-option-vertical" type="button" data-toggle="dropdown" onClick={this.showDropdown}></span>
					  			<div className="dropdown-menu p-content-setting ">
						  			<div className="setting-item"onClick={this.onUpdatePost}>Sửa bài viết<span className="glyphicon glyphicon-cog pull-right"></span></div>
						  			<div className="setting-item" onClick={this.onRemovePost}>Xóa bài viết</div>
					  			</div>
					  		</div>});
			}
  		})
  		.catch(error => {
  			that.setState({
	            isLoaded: true,
	            error
	        });
	        window.location.assign(window.location.origin + "/#/error");
			that.props.rootPointer.setState({route: "/error"});
  		});
	}

	getPostContentMethod(){
		var that = this;
	 	this.state.postID = window.location.hash.replace("#/post/","");
		
		if(this.state.postID == ""){
	    	window.location.assign(window.location.origin + "#/error");
	    }

		var url = "http://localhost:8080/demo-1/post/detailPost/" + this.state.postID;
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
				"contentType": 'application/json; charset=utf-8',
	        }
	    }
	    return axios.get(url,config);
	}

	handleNewCommentKeyPress(event){
		if(event.key == 'Enter'){
	    	this.onSubmitComment();
	 	}
	}


	onSubmitComment(){
		var that = this;
		this.SubmitComment()
		.then((response)=>{
			console.log(response);
			this.getPostContent();
			$("#new-comment").val("");
		});
	}

	SubmitComment(){
		var that = this;
		var content = {
			id_post: this.state.postID,
			id_user: localStorage.travelNetIdUser,
			content: $("#new-comment").val()
			};

		var url = "http://localhost:8080/demo-1/comment/insertcomment";
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
	        }
	    }
	    return post(url,content,config);
		
	}

	onRemovePost(e){
		e.stopPropagation();
		var that = this;
		this.RemovePost()
		.then((response)=>{
			console.log(response);
			window.history.back();
		});
	}

	RemovePost(){
		var that = this;
		var url = "http://localhost:8080/demo-1/post/deletePost/" + this.state.postContent.idPost;
	    const config = {
	        headers: {
	            "Authorization": localStorage.travelNetToken,
	        }
	    }
	    return axios.get(url,config);
	}

	onUpdatePost(){
		this.setState({
			Dialog:<EditPostDialog parent={this}/>
		});
	}

  	componentDidMount() {
  		this.initPage();
  	}

  	render() {
	    const { error, isLoaded, posts } = this.state;
	    if (error) {
			return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      	return <Loading/>;
	    } else {
	      	return (
		        <div>

		          	<div id={this.state.postContent.id} className="post-box" onClick={this.showPostDetail}>
					  	<div className="p-content">
					  		<div className="p-content-left">
					  			<img className="author-avt" src={this.state.postContent.urlUserPost}/>
					  		</div>
					  		<div className="p-content-middle">
					  			<a onClick={this.onUserInfoClick} className="author-name">{this.state.postContent.nicNameUserPost}</a>
					  			<p className="post-time">{this.state.postContent.timePost}</p>
					  			<p className="destination">
					  				<span className="glyphicon glyphicon-map-marker"></span>{this.state.postContent.location}</p>
					  		</div>
					  		{this.state.postSettingElement}
					  		<img className="p-top" src={this.state.postContent.urlPost}/>
					  		<div className="p-content-caption">{this.state.postContent.content}</div>
					  	</div>

					  	<div className="p-bottom">
					  		<div className="p-bottom-left">
					  			<span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span>
					  			<span>12k</span>
					  		</div>
					  		<div className="p-bottom-right">
					  			<span className="glyphicon glyphicon-comment"></span>
					  			<span className="comment-count">{this.state.postContent.listComment.length}</span>
					  		</div>
					  	</div>

					  	<div className="ls-comment">
							<form className="frm-comment">
						        <img className="fn-useravatar" src={localStorage.travelNetUrlUser}/>
						        <div className="wrap-comment">
						            <textarea id="new-comment" className="comment" name="content" rows="3" onKeyPress = {this.handleNewCommentKeyPress}></textarea>        
						            <div className="clearfix"></div>
						        </div>
						    </form>
						    {this.state.postContent.listComment.map(comment =>(
						    	<Comment content = {comment} key={comment.idComment} getPostContent = {this.getPostContent}/>
						    ))}
					  	</div>
					</div>
					{this.state.Dialog}
		        </div>
	      	);
	    }
  	}

}

//

var sliderUrl = [
	"https://upload.wikimedia.org/wikipedia/commons/6/66/Square_Panorama_of_Aru_Valley%2C_Jammu_and_Kashmir%2C_India.jpg",
	"https://aqu52.files.wordpress.com/2014/09/enhanced-buzz-wide-3500-1368805476-5.jpg",
	"http://media1.trover.com/T/5822887b9984280d06001c8d/fixedw_large_4x.jpg",
	"http://media5.trover.com/T/54d1391ed6bdd464ae0056a9/fixedw_large_4x.jpg"
]; 

class SliderTop extends React.Component{
	render(){
		return(
		<div id="slider-top">
			<img className="slider-item" src={this.props.listUrl[0]}/>
			<img className="slider-item" src={this.props.listUrl[1]}/>
			<img className="slider-item" src={this.props.listUrl[2]}/>
			<img className="slider-item" src={this.props.listUrl[3]}/>
		</div>
		);
	}
}
//

class Post extends React.Component{
	
	
	render(){
		return(
			<div id="content">
				<SliderTop listUrl={sliderUrl}/>
				<div id="main-content" className="container" >
					<div className="p-detail-left">
						<PostContent rootPointer = {this.props.rootPointer}/>
					</div>
					
				</div>

			</div>
		);
	}



}
//

export default Post;
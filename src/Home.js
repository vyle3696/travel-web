import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import './Home.css';
import AddNewPost from './AddNewPost.js';
import Loading from './Loading.js';
import ErrorPage from'./Error.js';




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


class PostItem extends React.Component{
	constructor(props) {
	    super(props);

	    this.state = {
	    	postSettingElement: <p/>
	    }

	    this.showPostDetail = this.showPostDetail.bind(this);
	    this.onUserInfoClick = this.onUserInfoClick.bind(this);
	  }
	showPostDetail(e){
		window.location.assign(window.location.origin + "#/post/" + this.props.content.id);
		this.props.rootPointer.setState({postID: this.props.content.id});
		this.props.rootPointer.setState({route: "/post/" + this.props.content.id});
	}

	onUserInfoClick(e) {
		e.stopPropagation();
	    this.props.rootPointer.setState({idUserProfile: this.props.content.id_user});
	    window.location.assign(window.location.origin + "#/profile/" + this.props.content.id_user);
	    this.props.rootPointer.setState({route: "/profile/" + this.props.content.id_user});
	    
	}

	showDropdown(e) {
		e.stopPropagation();
	}

	componentDidMount(){
		if(this.props.content.idUserPost == localStorage.travelNetIdUser){
			this.setState({postSettingElement: <div className="p-content-right dropdown">
				  			<span className="dropdown-toggle glyphicon glyphicon-option-vertical" type="button" data-toggle="dropdown" onClick={this.showDropdown}></span>
				  			<div className="dropdown-menu p-content-setting ">
					  			<div className="setting-item">Sửa bài viết<span className="glyphicon glyphicon-cog pull-right"></span></div>
					  			<div className="setting-item">Xóa bài viết</div>
				  			</div>
				  		</div>});
		}
	}
//

	render(){
		return(
			<div className="post-item">
			  	<div id={this.props.content.id} className="post-box" onClick={this.showPostDetail}>
			  		<img className="p-top" src={this.props.content.urlPost}/>
				  	<div className="p-content">
				  		<div className="p-content-left">
				  			<img className="author-avt" src={this.props.content.avatar}/>
				  		</div>
				  		<div className="p-content-middle">
				  			<a onClick={this.onUserInfoClick} className="author-name">{this.props.content.nameUser}</a>
				  			<p className="post-time">{this.props.content.time}</p>
				  			<p className="destination">
				  				<span className="glyphicon glyphicon-map-marker"></span>{this.props.content.location}</p>
				  		</div>
				  		{this.state.postSettingElement}
				  		<div className="p-content-caption">{this.props.content.content}</div>
				  	</div>
				  	<div className="p-bottom">
				  		<div className="p-bottom-left">
				  			<span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span>
				  			<span>12k</span>
				  		</div>
				  		<div className="p-bottom-right">
				  			<span className="glyphicon glyphicon-comment"></span>
				  			<span className="comment-count">347k</span>
				  		</div>
				  	</div>
				</div>
		  	</div>
		);
	}
}

//
class PostList extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
  }

  //


componentWillMount() {
  	var url = "http://localhost:8080/demo-1/post/postHome/" + localStorage.travelNetIdUser;
  	var that = this;


  	$.ajax({
		url:url,
		type: 'GET',
	  	headers: {"Authorization": localStorage.travelNetToken},
		contentType: 'application/json; charset=utf-8',
		success:function(data){
			console.log(data);
			that.setState({
	            isLoaded: true,
	            posts: data
	          });
			},
		error:function(xhr,error){
			that.setState({
            isLoaded: true,
            error: error
          });

			window.location.assign(window.location.origin + "/#/error");
			that.props.rootPointer.setState({route: "/error"});
		}
	});

    /*fetch("http://localhost:8080/demo-1/post/postHome/5aca527df36accaa5090aa86")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posts: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )*/
  }

  render() {
    const { error, isLoaded, posts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loading/>;
    } else {
      return (
        <div id="post-list">
          {posts.map(post => (
          	<PostItem key={post.id} content = {post} userClick = {this.props.userClick} rootPointer = {this.props.rootPointer}/>
          ))}
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

class Home extends React.Component{
	render(){
		return(
			<div id="content">
				<SliderTop listUrl={sliderUrl}/>
				<div id="main-content" className="container" >
					<AddNewPost/>
					<PostList userClick = {this.props.userClick} rootPointer = {this.props.rootPointer}/>
					
				</div>
			</div>
		);
	}
}

export default Home;
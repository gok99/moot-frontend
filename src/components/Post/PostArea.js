import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';

import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';

class PostAreaBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      postarr: [],
      post: {
        posttitle: '',
        postcontent: '',
        uid: '',
        timestamp: '',
      },
      postNum: 0,
      leftDisabled: true,
      rightDisabled: false,
    }
  }

  componentDidMount() {
    const fb = this.props.firebase;
    fb.posts().once('value').then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Snapshotted!");
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .then((data) => this.setState({ posts: data }))
    .catch((error) => {
      console.error(error);
    });

    console.log(this.state.posts);
    const posts = Object.values(this.state.posts);
    if (posts.length === 0) {
      this.setState({ 
        post: {
          posttitle: "You have no more posts left to view!",
          postcontent: '',
          uid: '',
          timestamp: '',
        },
        rightDisabled: true,
      });
    } else {
      this.setState({
        postarr: posts,
        post: posts[0],
        rightDisabled: posts.length === 1 ? true : false,
      });
    }
  }

  onLeftClick = event => {
    if (this.state.postNum <= 2) {
      this.setState({
        leftDisabled: true,
      });
    } else {
      var num = this.state.postNum - 1;
      var newpost = this.state.postarr[num];
      this.setState({ 
        postNum: num,
        post: newpost,
      });
    }
  };

  onRightClick = event => {
    if (this.state.postNum === this.state.postarr.length - 1) {
      this.setState({
        rightDisabled: true,
      });
    } else {
      var num = this.state.postNum + 1;
      var newpost = this.state.postarr[num];
      this.setState({ 
        postNum: num,
        post: newpost,
        leftDisabled: false,
      });
    }
  };

  render() {
    return (
      <Row className="contentbox spacedbox postbox d-flex">
        <Col xs={1} className="postchangearea">
          <Button className="postchangebutton left" type="button" disabled={ this.state.leftDisabled } onClick={this.onLeftClick}>&#60;</Button>
        </Col>
        <Col xs={10} className="postcontentarea">
          <Row>
            <Col xs={2}>
              <img className="previewpic" src={logo_temp} alt="Profile" />
            </Col>
            <Col xs={6} className="d-flex align-items-center">
              <p className="postop">Anonymous user: { this.state.post.uid }</p>
            </Col>
            <Col xs={4} className="d-flex align-items-center">
              <p className="posttime">{ this.state.post.timestamp }</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <p className="posttitle">{ this.state.post.posttitle }</p>
          </Row>
          <br />
          <Row>
            <p className="postcontent">{ this.state.post.postcontent }</p>
          </Row>
          <hr />
          <Row>
            <Col xs={2}>
              <Button className="likebutton smallbutton" type="button" /* onClick= ... */>Like</Button>
            </Col>
            <Col xs={10}></Col>
          </Row>
        </Col>
        <Col xs={1} className="postchangearea">
          <Button className="postchangebutton right" type="button" disabled={ this.state.rightDisabled } onClick={this.onRightClick}>&#62;</Button>
        </Col>
      </Row>
    );
  }
}

const PostArea = compose(
  withFirebase,
)(PostAreaBase);

export default PostArea;
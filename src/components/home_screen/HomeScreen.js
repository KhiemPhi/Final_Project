import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect} from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import WireFrameLinks from "./WireFrameLinks";
import { getFirestore } from "redux-firestore";


class HomeScreen extends Component {
  state = {
    mostRecentList: null
  };

  handleNewList = () => {
    const fireStore = getFirestore();   

    fireStore
      .collection("WireFrames")
      .add({
        name: "New List",
        owner: this.props.profile.firstName + " " + this.props.profile.lastName ,
        items: [],
        createdAt: new Date()
      })
      .then(docRef => {       
        this.setState({ mostRecentList: docRef.id });
        let a = "/WireFrame/" + docRef.id;
        this.props.history.push(a);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div id="todo_home">
        <div className="home_your_lists_container">
          <h3 id="home_your_lists_heading">Your WireFrames</h3>
          <WireFrameLinks history = {this.props.history} profile = {this.props.profile}/>
        </div>

        <div id="home_banner_container">
          @WireFramer
          <br />
          Application
        </div>

        <div className="home_new_list_container">
          <button
            className="home_new_list_button grey lighten-3 "
            onClick={this.handleNewList}
          >
            Create a New WireFrame Diagram
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "WireFrames", orderBy: ["createdAt", "desc"] }
  ])
)(HomeScreen);

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink, Redirect, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import TodoListLinks from "./TodoListLinks";
import { getFirestore } from "redux-firestore";
import { createDeflate } from "zlib";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
import { emptyStatement } from "@babel/types";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "react-materialize";

class HomeScreen extends Component {
  state = {
    mostRecentList: null
  };

  handleNewList = () => {
    const fireStore = getFirestore();   

    fireStore
      .collection("todoLists")
      .add({
        name: "New List",
        owner: this.props.profile.firstName + " " + this.props.profile.lastName ,
        items: [],
        createdAt: new Date()
      })
      .then(docRef => {       
        this.setState({ mostRecentList: docRef.id });
        let a = "/todoList/" + docRef.id;
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
          <TodoListLinks />
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
    { collection: "todoLists", orderBy: ["createdAt", "desc"] }
  ])
)(HomeScreen);

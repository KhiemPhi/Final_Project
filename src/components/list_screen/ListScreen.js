import React, { Component, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon, TextInput } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link } from "react-router-dom"; 
import ControllerAdder from "./ControllerAdder.js";
import ControllerModifier from "./ControllerModifier.js";
import NewContainer from "./NewContainer.js";



class ListScreen extends Component {
  state = {
    name: "",
    owner: "",
    containerCounter: 0,
    containerCounterArray: [],
    defaultZoom: 1,
    focusedElement: null,
    elements: [],
    
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));

    const fireStore = getFirestore();

    fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .update({
        [target.id]: target.value
      });
  };

  componentWillUnmount = () => {
    const fireStore = getFirestore();
    if (this.props.todoList != null) {
      fireStore
        .collection("todoLists")
        .doc(this.props.todoList.id)
        .update({
          createdAt: new Date()
        });
    }
  };

  goHome = () => {
    this.props.history.push("/");
  };
 
  addContainer = () => {    
    var counter = this.state.containerCounter;
    counter = counter + 1; 
    var id = "new_container" + counter.toString();
          
    const { elements } = this.state;
    this.setState({ elements: elements.concat(id) });    
    this.setState({ containerCounter: counter });
  };

  setFocusedElement = (id) => {
    this.setState({focusedElement : id})
  }

  zoomIn = () => {
    console.log("zoom-in");
  };

  zoomOut = () => {
    console.log("zoom-out");
  };

  changeWireFrameHeight = value => {
    var edit_area = document.getElementById("edit_area");
    edit_area.style.height = value + "px";
  };

  changeWireFrameWidth = () => {};

  render() {
    const auth = this.props.auth;
    const todoList = this.props.todoList;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    if (!todoList) return <React.Fragment />;

    

    return (
      <div>
        <div className="input-field">
          <label htmlFor="email" className="active">
            Name
          </label>
          <input
            className="active"
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
            defaultValue={todoList.name}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password" className="active">
            Owner
          </label>
          <input
            className="active"
            type="text"
            name="owner"
            id="owner"
            onChange={this.handleChange}
            defaultValue={todoList.owner}
          />
        </div>
        <div className="row" style={{ display: "flex" }}>
          <ControllerAdder
            goHome={this.goHome.bind(this)}
            zoomIn={this.zoomIn.bind(this)}
            addContainer={this.addContainer.bind(this)}
            zoomOut={this.zoomOut.bind(this)}
            changeWireFrameHeight={this.changeWireFrameHeight.bind(this)}
            changeWireFrameWidth={this.changeWireFrameWidth.bind(this)}
          />
          <div
            className="white control_container_only_top_and_bottom col s8"
            id="edit_area"
            style={{ zIndex: "1" }}
          >
            
            {this.state.elements.map(x => (
              <NewContainer class={"new_container"} id={x} containerCounter = {this.state.containerCounter.toString()} setFocusedElement = {this.setFocusedElement.bind(this)}  />
            ))}
            {/* Add Map Components from Database here   */}  
          </div>
          <ControllerModifier />
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) todoList.id = id;
  return {
    todoList, // Mark Elements Here in The TodoList to Map Onto Edit Area Later
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ListScreen);

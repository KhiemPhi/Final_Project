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

  dragElement = elmnt => {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      //prevent further movement, out of bounds on canvas
      if (elmnt.offsetTop - pos2 > 220 && elmnt.offsetTop - pos2 < 855) {
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      }
      if (elmnt.offsetLeft - pos1 > 205 && elmnt.offsetLeft - pos1 < 892) {
        // set the element's new position:
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  checkFocus = () => {
    console.log("focus");
  };

  addContainer = () => {
    //var div = document.createElement("div");
    var counter = this.state.containerCounter;
    counter = counter + 1;
    var id = "new_container" + (counter - 1).toString();
    var className = "new_container";
    const { elements } = this.state;
    this.setState({ elements: elements.concat(className) });

    this.setState({ containerCounter: counter });
  };

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
            {" "}
            {this.state.elements.map(x => (
              <NewContainer class={x} containerCounter = {this.state.containerCounter.toString()}  />
            ))}
          </div>
          <ControllerModifier />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) todoList.id = id;
  return {
    todoList,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ListScreen);

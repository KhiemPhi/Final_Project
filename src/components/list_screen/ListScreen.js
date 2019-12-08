import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import ItemsList from "./ItemsList.js";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon, TextInput } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link } from "react-router-dom"; //
import ControllerAdder from "./ControllerAdder.js";
import ControllerModifier from "./ControllerModifier.js";

class ListScreen extends Component {
  state = {
    name: "",
    owner: "",
    containerCounter: 0,
    defaultZoom: 1
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

  focus = () => {
    console.log("focus")

  }

  focus1 = () => {
    console.log("focus1")
  }

  addContainer = () => {
    var div = document.createElement("div");
    var counter = this.state.containerCounter;
    counter = counter + 1;
    var id = "new_container" + counter.toString();
    // Setting The New ID For The New COntainer
    div.setAttribute("class", "new_container");
    div.setAttribute("id", id);

    // Adding Resizer CSS Elements
    var resizers = document.createElement("div")
    resizers.setAttribute("class", "resizers")

    var resizers1 = document.createElement("div")
    resizers1.setAttribute("class", "resizer top-left")

    var resizers2 = document.createElement("div")
    resizers2.setAttribute("class", "resizer top-right")

    var resizers3 = document.createElement("div")
    resizers3.setAttribute("class", "resizer bottom-left")

    var resizers4 = document.createElement("div")
    resizers4.setAttribute("class", "resizer bottom-right")



    resizers.appendChild(resizers1)
    resizers.appendChild(resizers2)
    resizers.appendChild(resizers3)
    resizers.appendChild(resizers4)
    div.appendChild(resizers)

    document.getElementById("edit_area").appendChild(div);
    
   

    
    this.dragElement(document.getElementById(id));
    div.setAttribute("onClick", this.focus )
    this.setState({ containerCounter: counter });
  };

  zoomIn = () => {
    
    console.log("zoom-in")
  }

  zoomOut = () => {
    
    console.log("zoom-out")
  }

  changeWireFrameHeight = (value) => {
    var edit_area = document.getElementById("edit_area");
    edit_area.style.height = value + "px"
  }

  changeWireFrameWidth = () => {
    
  }

  makeResizableDiv = (div) => {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    

  }

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
        <div className="row" style={{display:"flex"}}  >
          <ControllerAdder
            goHome={this.goHome.bind(this)}
            zoomIn = {this.zoomIn.bind(this)}
            addContainer={this.addContainer.bind(this)}
            zoomOut = {this.zoomOut.bind(this)}
            changeWireFrameHeight = {this.changeWireFrameHeight.bind(this)}
            changeWireFrameWidth = {this.changeWireFrameWidth.bind(this)}
          />
          <div
            className="white control_container_only_top_and_bottom col s8"
            id="edit_area"
            style={{ zIndex: "1"}}

          ></div>
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

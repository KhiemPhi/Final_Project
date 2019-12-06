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

class ListScreen extends Component {
  state = {
    name: "",
    owner: "",
    taskOrder: true,
    dateOrder: true,
    statusOrder: true,
    unSorted: true,
    currentEditItem: null,
    currentSortCriteria: null
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

  handleDelete = () => {
    const fireStore = getFirestore();
    fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .delete();
    this.props.history.push("/");
  };

  componentWillUnmount = () => {
    const fireStore = getFirestore();
    if (this.props.todoList != null) {
      fireStore
        .collection("todoLists")
        .doc(this.props.todoList.id)
        .update({
          createdAt: new Date(),
          currentSortingCriteria: this.state.currentSortCriteria
        });
    }
  };

  goHome = () => {
    this.props.history.push("/");
  };

  goEdit = () => {
    this.props.history.push("/edit/:id");
  };

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
        <div className="row" style={{display: "flex"}}> 
          <ControllerAdder/>    
          <div className="white control_container_only_top col s8"></div>   
          <div className="control_container col s2">
            <div style ={{paddingTop: "15%", marginLeft: "20%"}} > Properties </div>            
              <TextInput id = "text_input" />
              <div className = "row" style ={{paddingTop: "5%"}}>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Font Size:</div>
                <div className = "col s4">
                  <input id = "font_size_input"></input>
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Background:</div>
                <div className = "col s1">
                  <div className = "background_color"></div>
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Border Color:</div>
                <div className = "col s1">
                  <div className = "border_color"></div>
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px" }}>Text Color:</div>
                <div className = "col s1">
                  <div className = "text_color"></div>
                </div>
                <div className = "col s9" style={{marginTop: "25px", fontSize: "12px"}}>Border Thickness:</div>
                <div className = "col s3 ">
                  <input id = "border_thickness_input"></input>
                </div>
                <div className = "col s9" style={{marginTop: "25px", fontSize: "12px", paddingBottom: "100%"}}>Border Radius:</div>
                <div className = "col s3 ">
                  <input id = "border_radius_input"></input>
                </div>                
             </div>   
          </div>
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
  const currentEditItem = ownProps.currentEditItem;
  const currentSortCriteria = ownProps.currentSortCriteria;
  return {
    todoList,
    currentSortCriteria,
    currentEditItem,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ListScreen);

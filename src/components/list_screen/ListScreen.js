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
        <div className="row">
          <div className="control_container col s2">
            <div className="row control_container_only_bottom">
              <div className="col s1 pull-s1">
                <Button
                  flat
                  icon={<Icon children="zoom_in" />}
                  className="transparent"
                  large
                ></Button>
              </div>
              <div className="col s2">
                <Button
                  flat
                  icon={<Icon children="zoom_out" />}
                  className="transparent"
                  large
                ></Button>
              </div>
              <div className="col s3">
                <Button flat className="transparent" large>
                  Save
                </Button>
              </div>
              <div className="col s3">
                <Button flat className="transparent" large>
                  Close
                </Button>
              </div>
            </div>

            <Button
              flat
              className="white container_button"
              id="container_button"
              style={{
                border: "1px solid black",
                height: "70px",
                width: "70%",
                margin: " 0% 0% 0% 15%"
              }}
            ></Button>

            <div className="container_label">Container</div>

            <Button
              flat
              className="transparent label_component"
              id="label_button"
              style={{
                height: "30px",
                width: "100%",
                margin: " 0% 0% 0% 2%"
              }}
            >
              Prompt For Input:
            </Button>
            <div className="container_label">Label</div>

            <Button
              flat
              className="grey lighten-1 button_component"
              id="button_creator"
              style={{
                height: "30px",
                width: "80%",
                margin: " 0% 0% 0% 10%",
                border: "1px solid black"
              }}
            >
              Submit
            </Button>
            <div className="container_label">Button</div>

            <Button
              flat
              className="white button_component"
              id="label_button"
              style={{
                height: "30px",
                width: "100%",
                margin: " 0% 0% 0% 2%",
                border: "1px solid black",
                color: "gray",
                textAlign: "left"
              }}
            >
              Input
            </Button>
            <div className="container_label_padding">Textfield</div>
          </div>
          <div className="control_container_only_top white col s8">
            <div></div>
          </div>
          <div className="control_container col s2">
            <div style ={{paddingTop: "15%", marginLeft: "20%"}} > Properties </div>
            <div id="item_text">
              <TextInput id = "text_input" />
              <div className = "row" style ={{paddingTop: "5%"}}>
                <div className = "col s8" style={{marginTop: "25px"}}>Font Size</div>
                <div className = "col s4">
                  <input id = "font_size_input"></input>
                </div>
                <div className = "col s8" style={{marginTop: "25px"}}>Background</div>
                <div className = "col s1">
                  <div className = "background_color"></div>
                </div>
                <div className = "col s8" style={{marginTop: "25px"}}>Border Color</div>
                <div className = "col s1">
                  <div className = "border_color"></div>
                </div>
                <div className = "col s8" style={{marginTop: "25px"}}>Text Color</div>
                <div className = "col s1">
                  <div className = "text_color"></div>
                </div>
                <div className = "col s9" style={{marginTop: "25px", fontSize: "12px"}}>Border Thickness</div>
                <div className = "col s3 ">
                  <input id = "font_size_input"></input>
                </div>
                <div className = "col s9" style={{marginTop: "25px", fontSize: "12px", paddingBottom: "100%"}}>Border Radius</div>
                <div className = "col s3 ">
                  <input id = "font_size_input"></input>
                </div>
                
              </div>
            </div>
            <div className row>
              <div className="col s6"></div>
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

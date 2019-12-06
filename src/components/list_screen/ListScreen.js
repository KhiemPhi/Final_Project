import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import ItemsList from "./ItemsList.js";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon } from "react-materialize";
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
            <div className="row control_container_only_bottom" >
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

            <div>
            <Button
              flat
              className="white container_button"
              style={{
                border: "1px solid black",
                height: "70px",
                width: "70%",
                margin: " 0% 0% 0% 15%"
              }}
            ></Button>

            </div>        
            <div className="container_label">Container</div>
            <Button
              flat
              className="white container_button"
              style={{
                border: "1px solid black",
                height: "70px",
                width: "70%",
                margin: " 0% 0% 0% 15%"
              }}
            ></Button>



          </div>
          <div className=" control_container_only_top col s8">
            <div className="row">
              <div className="col s2">
                <Button
                  flat
                  icon={<Icon children="zoom_in" />}
                  className="transparent"
                  small
                ></Button>
              </div>
              <div className="col s2">
                <Button
                  flat
                  icon={<Icon children="zoom_in" />}
                  className="transparent"
                  small
                ></Button>
              </div>
              <div className="col s2">
                <Button flat className="transparent" small>
                  Save
                </Button>
              </div>
              <div className="col s2">
                <Button flat className="transparent" small>
                  Close
                </Button>
              </div>
            </div>
            <div>Second Screen</div>
          </div>
          <div className=" control_container col s2">
            <div className="row">
              <div className="col s2">
                <Button
                  flat
                  icon={<Icon children="zoom_in" />}
                  className="transparent"
                  small
                ></Button>
              </div>
              <div className="col s2">
                <Button
                  flat
                  icon={<Icon children="zoom_in" />}
                  className="transparent"
                  small
                ></Button>
              </div>
              <div className="col s2">
                <Button flat className="transparent" small>
                  Save
                </Button>
              </div>
              <div className="col s2">
                <Button flat className="transparent" small>
                  Close
                </Button>
              </div>
            </div>
            <div>Second Screen</div>
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

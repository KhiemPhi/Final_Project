import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Modal, Icon } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link, NavLink } from "react-router-dom";
import Checkbox from "react-materialize/lib/Checkbox";

export class ItemScreen extends Component {
  state = {
    description: null
  };

  goList = () => {
    let link = "/todoList/" + this.props.todoList.id;
    this.props.history.push(link);
  };

  submitChanges = e => {
    e.preventDefault();
    let itemIndex = Number(window.location.href.slice(-2));
    if (itemIndex === -1) {
      const fireStore = getFirestore();
      fireStore
        .collection("todoLists")
        .doc(this.props.todoList.id)
        .get()
        .then(doc => {
          let list = doc.data().items;
          let description = document.getElementById(
            "item_description_textfield"
          ).value;
          let due_date = document.getElementById("item_due_date_picker").value;
          let assigned_to = document.getElementById(
            "item_assigned_to_textfield"
          ).value;
          let completed = document.getElementById("checkbox").checked;

          list.push({
            key: this.props.todoList.items.length,
            description: description,
            due_date: due_date,
            assigned_to: assigned_to,
            completed: completed
          });
          if (this.props.todoList.currentSortingCriteria != null) {
            let criteriaArray = this.props.todoList.currentSortingCriteria
              .trim()
              .split(" ");
            let sortBoolean = criteriaArray[0] === "true";
            let sortCriteria = criteriaArray[1];
            if (sortBoolean) {
              if (sortCriteria === "due_date") {
                list.sort((itemA, itemB) => itemA.due_date < itemB.due_date);
              } else if (sortCriteria === "completed") {
                list.sort((itemA, itemB) => itemA.completed < itemB.completed);
              } else if (sortCriteria === "description") {
                list.sort(
                  (itemA, itemB) => itemA.description < itemB.description
                );
              }
            } else if (sortBoolean === false) {
              if (sortCriteria === "due_date") {
                list.sort((itemA, itemB) => itemA.due_date > itemB.due_date);
              } else if (sortCriteria === "completed") {
                list.sort((itemA, itemB) => itemA.completed > itemB.completed);
              } else if (sortCriteria === "description") {
                list.sort(
                  (itemA, itemB) => itemA.description > itemB.description
                );
              }
            }
          }

          fireStore
            .collection("todoLists")
            .doc(this.props.todoList.id)
            .update({
              items: list
            });
        })
        .then(() => {
          this.goList();
        });
    } else {
      const fireStore = getFirestore();
      itemIndex = Number(window.location.href.slice(-1));
      fireStore
        .collection("todoLists")
        .doc(this.props.todoList.id)
        .get()
        .then(doc => {
          let list = doc.data().items;
          list[itemIndex].description = document.getElementById(
            "item_description_textfield"
          ).value;
          list[itemIndex].assigned_to = document.getElementById(
            "item_assigned_to_textfield"
          ).value;
          list[itemIndex].due_date = document.getElementById(
            "item_due_date_picker"
          ).value;
          list[itemIndex].completed = document.getElementById(
            "checkbox"
          ).checked;

          if (this.props.todoList.currentSortingCriteria != null) {
            let criteriaArray = this.props.todoList.currentSortingCriteria
              .trim()
              .split(" ");
            let sortBoolean = criteriaArray[0] === "true";
            let sortCriteria = criteriaArray[1];

            if (sortBoolean) {
              if (sortCriteria === "due_date") {
                list.sort((itemA, itemB) => itemA.due_date < itemB.due_date);
              } else if (sortCriteria === "completed") {
                list.sort((itemA, itemB) => itemA.completed < itemB.completed);
              } else if (sortCriteria === "description") {
                list.sort(
                  (itemA, itemB) => itemA.description < itemB.description
                );
              }
            } else if (sortBoolean === false) {
              if (sortCriteria === "due_date") {
                list.sort((itemA, itemB) => itemA.due_date > itemB.due_date);
              } else if (sortCriteria === "completed") {
                list.sort((itemA, itemB) => itemA.completed > itemB.completed);
              } else if (sortCriteria === "description") {
                list.sort(
                  (itemA, itemB) => itemA.description > itemB.description
                );
              }
            }
          }

          fireStore
            .collection("todoLists")
            .doc(this.props.todoList.id)
            .update({
              items: list
            });
        })
        .then(() => {
          this.goList();
        });
    }
  };

  render() {
    const auth = this.props.auth;
    const todoList = this.props.todoList;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    if (!todoList) return <React.Fragment />;
    console.log(window.location.href);
    return (
      <div className="row">
        <h3 id="item_heading">Item</h3>
        <div className="row">
          <div className="col s3 item_prompt " id="item_description_prompt">
            Description:
          </div>
          <input
            name="description"
            id="item_description_textfield"
            className="col s9 item_input"
            type="input"
            defaultValue={
              Number(window.location.href.slice(-2)) === -1
                ? ""
                : this.props.todoList.items[
                    Number(window.location.href.slice(-1))
                  ].description
            }
          />
        </div>

        <div className="row">
          <div className="col s3 item_prompt">Assigned To:</div>
          <input
            name="assignedTo"
            id="item_assigned_to_textfield"
            className="col s9 item_input"
            type="input"
            defaultValue={
              Number(window.location.href.slice(-2)) === -1
                ? ""
                : this.props.todoList.items[
                    Number(window.location.href.slice(-1))
                  ].assigned_to
            }
          />
        </div>

        <div className="row">
          <div className="col s3 item_prompt">Due Date:</div>
          <input
            id="item_due_date_picker"
            className="col s9 item_input"
            type="date"
            name="dueDate"
            defaultValue={
              Number(window.location.href.slice(-2)) === -1
                ? ""
                : this.props.todoList.items[
                    Number(window.location.href.slice(-1))
                  ].due_date
            }
          />
        </div>

        <div className="row">
          <div className="col s3 item_prompt">Completed:</div>
          <div className="col s9">
            <Checkbox id="checkbox" value="Red" />
          </div>
        </div>

        <div className="row">
          <div className="col s3">
            <button
              id="item_form_submit_button"
              className="item_button"
              onClick={this.submitChanges}
            >
              Submit
            </button>
            <button
              id="item_form_cancel_button"
              className="item_button"
              onClick={this.goList}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const currentEditItem = ownProps.currentEditItem;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) todoList.id = id;

  return {
    todoList,
    currentEditItem,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ItemScreen);

import React, { Component } from "react";
import { Button, Icon } from "react-materialize";
import { getFirestore } from "redux-firestore";

export class DeleteButton extends Component {
    handleDelete = () => {
        const fireStore = getFirestore();
        fireStore
          .collection("todoLists")
          .doc(this.props.todoList.id)
          .delete();
        this.props.history.push("/");
      };
    
    
  render() {
    return (
      <div className = "col s6">       
        <Button
          floating
          icon={<Icon children="close" />}
          className=" red"
          onClick={this.handleDelete}
          small
          style={{ left: "70%", top: "5%" }}
        ></Button>
      </div>
    );
  }
}

export default DeleteButton;

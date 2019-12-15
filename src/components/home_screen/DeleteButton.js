import React, { Component } from "react";
import { Button, Icon } from "react-materialize";
import { getFirestore } from "redux-firestore";

export class DeleteButton extends Component {
    handleDelete = () => {
        const fireStore = getFirestore();
        fireStore
          .collection("WireFrames")
          .doc(this.props.WireFrame.id)
          .delete();
        this.props.history.push("/");
      };
    
    
  render() {
    return (
      <div className = "col s2 pull-s1">       
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

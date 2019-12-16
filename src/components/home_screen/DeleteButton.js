import React, { Component } from "react";
import { Button, Icon, Modal } from "react-materialize";
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
      <div className="col s2 pull-s1">
        <Modal actions=
          {[
            <Button flat modal = "close" node="button" waves="green" onClick= {this.handleDelete}>Yes</Button>,
            <Button flat modal="close" node="button" waves="green">
              No
            </Button>
           
          ]}
          trigger={ <Button
            floating
            icon={<Icon children="close" />}
            className=" red"            
            small
            style={{ left: "70%", top: "5%" }}
          ></Button>}>
          <p>
            Would you Like To Delete This WireFrame?
          </p>
        </Modal>
       
      </div>
    );
  }
}

export default DeleteButton;

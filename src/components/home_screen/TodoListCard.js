import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Button, Icon } from "react-materialize";
import { firestoreConnect } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import { compose } from "redux";

class TodoListCard extends React.Component {
  render() {
    const { WireFrame } = this.props;
    return (
      <div className = "col s10" >
        <div className="todo_list_link" >{WireFrame.name}</div>
       
      </div>
    );
  }
}
export default TodoListCard;

import React from "react";
import { Button, Modal, Icon } from "react-materialize";
import ListTrash from "./ListTrash";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ItemCard extends React.Component {

  itemSwap = (index1, index2) => {
    console.log("call");
    let temp = this.props.todoList.items[index1];
    this.props.todoList.items[index1] = this.props.todoList.items[index2];
    this.props.todoList.items[index2] = temp;
    
  };

  moveItemUp = e => {
    const { item } = this.props;   
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(item);
    if (0 < itemIndex && itemIndex < this.props.todoList.items.length) {
       this.itemSwap(itemIndex, itemIndex-1)
       
    }
    
  };

  render() {
    const { item } = this.props;
    return (
      <div
        className="card list_item_card transparent"
        //onClick={() => this.props.goEdit(item, false)}
      >
        <div className="list_item_card_description">{item.description}</div>
        <div className="list_item_card_assigned_to">
          Assigned To: <strong>{item.assigned_to}</strong>
        </div>
        <div className="list_item_card_due_date">{item.due_date}</div>
        <div
          className={
            item.completed
              ? "list_item_card_completed"
              : "list_item_card_not_completed"
          }
        >
          {item.completed ? "Completed" : "Pending"}
        </div>
        <div id="list_item_card_toolbar" className="list_item_card_toolbar">
          <Button floating fab={{ direction: "left" , hoverEnabled: false }} className="red" small>
            <Button
              floating
              icon={<Icon children="arrow_upward" />}
              className={
                this.props.todoList.items.indexOf(item) === 0 ? "grey" : "green"
              }
              small

              onClick={
                this.props.todoList.items.indexOf(item) === 0
                  ? this.stopMove
                  : this.moveItemUp
              }
            />
            <Button
              floating
              icon={<Icon children="arrow_downward" />}
              className={
                this.props.todoList.items.indexOf(item) ===
                this.props.todoList.items.length - 1
                  ? "grey"
                  : "green"
              }
              small
            />
            <Button
              floating
              icon={<Icon children="close" />}
              className="red"
              small
            />
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const todoList = ownProps.todoList;
  return {
      todoList,
      auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      { collection: 'todoLists' },
  ]),
)(ItemCard);

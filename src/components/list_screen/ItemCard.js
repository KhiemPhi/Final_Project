import React from "react";
import { Button,  Icon } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect} from "react-redux-firebase";
import { getFirestore } from "redux-firestore";


class ItemCard extends React.Component {

  itemSwap = (index1, index2, list) => {    
    let temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
  };

  moveItemUp = e => {
    const { item } = this.props;
    const fireStore = getFirestore();
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(item);
    if (0 < itemIndex && itemIndex < this.props.todoList.items.length) {      
      fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .get()
      .then(doc => {
        let list = doc.data().items;
        this.itemSwap(itemIndex, itemIndex-1, list)
        fireStore
          .collection("todoLists")
          .doc(this.props.todoList.id)
          .update({
            items: list
          });
      });

    }
  };

  moveItemDown = e => {
    const { item } = this.props;
    const fireStore = getFirestore();
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(item);
    if (0 <= itemIndex && itemIndex < this.props.todoList.items.length) {      
      fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .get()
      .then(doc => {
        let list = doc.data().items;
        this.itemSwap(itemIndex, itemIndex+1, list)
        fireStore
          .collection("todoLists")
          .doc(this.props.todoList.id)
          .update({
            items: list
          });
      });

    }
  };

  handleDeleteItem = e => {
    e.stopPropagation();
    const { item } = this.props;
    const fireStore = getFirestore();
    

    let index = this.props.todoList.items.indexOf(item);

    fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .get()
      .then(doc => {
        let list = doc.data().items;
        list.splice(index, 1);
        fireStore
          .collection("todoLists")
          .doc(this.props.todoList.id)
          .update({
            items: list
          });
      });
  };

  stopMove = e => {
    e.stopPropagation();
  };

  goEdit = () => {
    const { item } = this.props;
    
    let indexString = this.props.todoList.items.indexOf(item).toString()
    let link = "/edit/" + this.props.todoList.id + "/" + indexString
    
    this.props.history.push(link);
  };

  render() {
    const { item } = this.props;
    return (
      <div
        className="list_item_card"
        id = {this.props.todoList.items.indexOf(item).toString()}
        onClick={() => this.goEdit()}
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
          <Button
            floating
            fab={{ direction: "left", hoverEnabled: false }}
            onClick = {this.stopMove}
            className="red active"
            small
          >
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
              onClick={
                this.props.todoList.items.indexOf(item) === this.props.todoList.items.length - 1
                  ? this.stopMove
                  : this.moveItemDown
              }
              small
            />
            <Button
              floating
              icon={<Icon children="close" />}
              className="red"
              onClick={this.handleDeleteItem}
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
  const currentEditItem = ownProps.currentEditItem
  return {
    todoList,
    currentEditItem,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ItemCard);

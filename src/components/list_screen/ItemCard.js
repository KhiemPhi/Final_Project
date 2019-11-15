import React from "react";
import { Button, Modal, Icon } from "react-materialize";
import ListTrash from "./ListTrash";
import "materialize-css/dist/css/materialize.min.css";

class ItemCard extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div
        className="list_item_card"
        onClick={() => this.props.goEdit(item, false)}
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
          <Button floating fab={{ direction: "left" }} className="red" small>
            <Button floating icon={<Icon children = "arrow_upward" />} className={
              this.props.todoList.items.indexOf(item) === 0
                ? "grey"
                : "green"
            } small />
            <Button floating icon={<Icon children = "arrow_downward" />} className={
              this.props.todoList.items.indexOf(item) === this.props.todoList.items.length - 1
                ? "grey"
                : "green"
            } small />
            <Button floating icon={<Icon children = "close" />} className="red" small />
            
          </Button>
        </div>
      </div>
    );
  }
}
export default ItemCard;

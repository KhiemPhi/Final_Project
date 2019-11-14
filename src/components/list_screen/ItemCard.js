import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
        <div
        className="card list_item_card"
        onClick={() => this.props.goEdit(item, false)}
      >
        <div className="list_item_card_description">
          {item.description}
        </div>
        <div className="list_item_card_assigned_to">
          Assigned To: <strong>{item.assigned_to}</strong>
        </div>
        <div className="list_item_card_due_date">
          {item.due_date}
        </div>
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
          <span
            className={
              this.props.todoList.items.indexOf(item) === 0
                ? "list_item_card_button_disable"
                : "list_item_card_button"
            }
            onClick={
              this.props.todoList.items.indexOf(item) === 0
                ? this.stopMove
                : this.moveItemUp
            }
          >
            {" "}
            &#x21e7;{" "}
          </span>
          <span
            className={
              this.props.todoList.items.indexOf(item) ===
              this.props.todoList.items.length - 1
                ? "list_item_card_button_disable"
                : "list_item_card_button"
            }
            onClick={
              this.props.todoList.items.indexOf(item) ===
              this.props.todoList.items.length - 1
                ? this.stopMove
                : this.moveItemDown
            }
          >
            {" "}
            &#x21e9;{" "}
          </span>
          <span className="list_item_card_button" onClick={e=>{this.deleteItem(e)}}>
            {" "}
            &#10005;{" "}
          </span>
        </div>
      </div>
        );
    }
}
export default ItemCard;
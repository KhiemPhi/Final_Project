import React, { Component } from "react";
import PropTypes from "prop-types";


export class ItemScreen extends Component { 

  render() {
    return (
      <form id="todo_item">
        <h3 id="item_heading">Item</h3>
        <div id="item_form_container">
          <div id="item_description_prompt" className="item_prompt">
            Description:
          </div>
          <input
            name="description"
            id="item_description_textfield"
            className="item_input"
            type="input"
            defaultValue={this.props.currentEditItem.description}
          />
          <div id="item_assigned_to_prompt" className="item_prompt">
            Assigned To:
          </div>
          <input
            name="assignedTo"
            id="item_assigned_to_textfield"
            className="item_input"
            type="input"
            defaultValue={this.props.currentEditItem.assigned_to}
          />
          <div id="item_due_date_prompt" className="item_prompt">
            Due Date:
          </div>
          <input
            id="item_due_date_picker"
            className="item_input"
            type="date"
            name="dueDate"
            defaultValue={this.props.currentEditItem.due_date}
          />
          <div id="item_completed_prompt" className="item_prompt">
            Completed:
          </div>
          <input
            id="item_completed_checkbox"
            className="item_input"
            type="checkbox"
            name="completed"
            defaultChecked={this.props.currentEditItem.completed}
          />
        </div>
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
          onClick={this.props.goList}
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default ItemScreen;

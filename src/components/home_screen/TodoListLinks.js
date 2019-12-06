import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Icon } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import TodoListCard from "./TodoListCard";
import DeleteButton from "./DeleteButton";

class TodoListLinks extends React.Component {
  render() {
    const todoLists = this.props.todoLists;
    return (
      <div className="row todo-lists section">
        {todoLists &&
          todoLists.map(todoList => (
            <div className = "row" >
              <Link to={"/todoList/" + todoList.id} key={todoList.id}>
                <TodoListCard
                  todoList={todoList}
                  history={this.props.history}
                />
              </Link>
              <DeleteButton  todoList={todoList}
                  history={this.props.history}></DeleteButton>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoLists: state.firestore.ordered.todoLists,
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(TodoListLinks);

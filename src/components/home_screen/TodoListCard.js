import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <a 
            className='todo_list_link text'
           
        >
            {todoList.name} <br />
        </a>
           
        );
    }
}
export default TodoListCard;
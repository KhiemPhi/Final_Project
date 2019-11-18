import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
//import {Button,Icon} from "react-materialize";

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;     
        const history = this.props.history;   
        const currentEditItem = this.props.currentEditItem;
        const items = todoList.items;        
        return (
            <div className="todo-lists section">                
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} history = {history} currentEditItem = {item} />
                        
                        
                    );})
                }
        
           
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    const currentEditItem = ownProps.currentEditItem;
    return {
        todoList,
        currentEditItem,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);
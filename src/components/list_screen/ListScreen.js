import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import ItemCard from './ItemCard.js'; //

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!todoList)
            return <React.Fragment />


        return (
            <div className="container transparent">
                <div className = "row">

                </div>
                <h5 className="grey-text text-darken-3">Todo List</h5>
               
               
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>



                <div id="modal1" class="modal">

                    <div class="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>

                    <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>

                </div>
            
                
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active" >Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>

                <div id = "card list_item_container">
                    <div id = "list_item_header" className = "list_item_header_card">
                        <div
                            className = "list_item_task_header"
                         >
                        Task
                        </div>

                        <div
                            className = "list_item_due_date_header"
                         >
                        Due Date
                        </div>

                        <div
                            className = "list_item_status_header"
                         >
                        Status
                        </div>
                        
                        

                    </div>
                </div>          
                <ItemsList todoList={todoList} />

                <div
                className="list_item_add_card"                
          
                >
                    &#x2b;
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
	todoList.id = id;

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
)(ListScreen);
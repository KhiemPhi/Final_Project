import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'

class HomeScreen extends Component {

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div id="todo_home">
                
                   
                    <div className= "home_your_lists_container" >
                       
                            <h3 id="home_your_lists_heading" >Your Lists</h3>
                            <TodoListLinks  />
                        
                       
                    </div>

                    <div id="home_banner_container">
                            @todo<br />
                            List Maker
                    </div>

                    <div className= "home_new_list_container">
                        
                        
                        <button 
                             
                            className="home_new_list_button grey lighten-3 "
                            onClick = {this.handleNewList}>
                            Create a New To Do List
                        </button>
                      
                        
                    </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);
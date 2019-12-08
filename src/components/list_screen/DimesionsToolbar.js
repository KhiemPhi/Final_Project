import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link } from "react-router-dom"; //

class DimensionsToolbar extends Component {
  render() {   
    return (
          <div className="row control_container_only_top">
            <div className = "row">
                <div className = "col s12 push-s2" style={{marginTop: "25px"}}>Wireframe Dimesions</div>
                <div className = "col s8 push-s1" style={{marginTop: "25px"}}>Height:</div>
                <div className = "col s4 pull-s2">
                  <input id = "font_size_input"></input>
                </div>
                <div className = "col s8 push-s1" style={{marginTop: "25px"}}>Width:</div>
                <div className = "col s4 pull-s2">
                  <input id = "font_size_input"></input>
                </div>

            </div>
          </div>

         
      
    );
  }
}

export default compose(  
  firestoreConnect([{ collection: "todoLists" }])
)(DimensionsToolbar);

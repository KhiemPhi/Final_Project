import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link } from "react-router-dom"; //

class Toolbar extends Component {
  render() {   
    return (
          <div className="row control_container_only_bottom">
            <div className="col s3 pull-s1 ">
              <Button
                flat
                icon={<Icon children="zoom_in" />}
                className="transparent"
                large
                onClick = {this.props.zoomIn}
              ></Button>
            </div>
            <div className="col s3 pull-s1">
              <Button
                flat
                icon={<Icon children="zoom_out" />}
                className="transparent"
                large
                onClick = {this.props.zoomOut}
              ></Button>
            </div>
            <div className="col s3 pull-s2 ">
              <Button flat className="transparent" large onClick = {this.props.goHome}>
                Save
              </Button>
            </div>
            <div className="col s3 pull-s2">
              <Button flat className="transparent" onClick = {this.props.goHome} large>
                Close
              </Button>
            </div>
          </div>

         
      
    );
  }
}

export default compose(  
  firestoreConnect([{ collection: "todoLists" }])
)(Toolbar);

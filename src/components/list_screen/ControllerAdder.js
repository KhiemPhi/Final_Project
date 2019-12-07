import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link } from "react-router-dom"; //

class ControllerAdder extends Component {
  render() {   
    return (      
        <div className="control_container col s2">
          <div className="row control_container_only_bottom">
            <div className="col s3 pull-s1">
              <Button
                flat
                icon={<Icon children="zoom_in" />}
                className="transparent"
                large
              ></Button>
            </div>
            <div className="col s3 pull-s2">
              <Button
                flat
                icon={<Icon children="zoom_out" />}
                className="transparent"
                large
              ></Button>
            </div>
            <div className="col s3 pull-s3">
              <Button flat className="transparent" large>
                Save
              </Button>
            </div>
            <div className="col s3 pull-s3">
              <Button flat className="transparent" onClick = {this.props.goHome} large>
                Close
              </Button>
            </div>
          </div>

          <Button
            flat
            className="white container_button"
            id="container_button"
            style={{
              border: "1px solid black",
              height: "70px",
              width: "70%",
              margin: " 0% 0% 0% 15%",
            }}
            onClick = {this.props.addContainer}
          ></Button>

          <div className="container_label">Container</div>

          <Button
            flat
            className="transparent label_component"
            id="label_button"
            style={{
              height: "30px",
              width: "100%",
              margin: " 0% 0% 0% 2%",
              fontSize: "13px"
            }}
          >
            Prompt For Input:
          </Button>
          <div className="container_label">Label</div>

          <Button
            flat
            className="grey lighten-1 button_component"
            id="button_creator"
            style={{
              height: "30px",
              width: "80%",
              margin: " 0% 0% 0% 10%",
              border: "1px solid black"
            }}
          >
            Submit
          </Button>
          <div className="container_label">Button</div>

          <Button
            flat
            className="white button_component"
            id="label_button"
            style={{
              height: "30px",
              width: "100%",
              margin: " 0% 0% 0% 2%",
              border: "1px solid black",
              color: "gray",
              textAlign: "left"
            }}
          >
            Input
          </Button>
          <div className="container_label_padding">Textfield</div>
        </div>
      
    );
  }
}

export default compose(  
  firestoreConnect([{ collection: "todoLists" }])
)(ControllerAdder);

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar.js";
import DimesionsToolbar from "./DimesionsToolbar.js";

class ControllerAdder extends Component {
  render() {
    return (
      <div
        className={
          this.props.wireFrameWidth > 500
            ? this.props.wireFrameWidth > 1000 ? this.props.wireFrameWidth > 2000 ? "control_container col s12": "control_container col s5"  : "control_container col s3"
            : this.props.wireFrameWidth > 300
            ? "control_container col s4"
            : "control_container col s4 pull-s1"
        }
      >
        <Toolbar
          goHome={this.props.goHome}
          zoomIn={this.props.zoomIn}
          zoomOut={this.props.zoomOut}
        />
        <Button
          flat
          className="white container_button"
          id="container_button"
          style={{
            border: "1px solid black",
            height: "70px",
            width: "50%",
            margin: " 0% 0% 0% 25%"
          }}
          onClick={this.props.addContainer}
        ></Button>

        <div className="container_label">Container</div>

        <Button
          flat
          className="transparent label_component"
          id="label_button"
          onClick={this.props.addLabel}
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
          onClick = {this.props.addButton}
          style={{
            height: "30px",
            width: "50%",
            margin: " 0% 0% 0% 25%",
            border: "1px solid black"
          }}
        >
          Submit
        </Button>
        <div className="container_label">Button</div>

        <Button
          flat
          className="white button_component"
          id="textfield_button"
          onClick = {this.props.addTextField}
          style={{
            height: "30px",
            width: "80%",
            margin: " 0% 0% 0% 10%",
            border: "1px solid black",
            color: "gray",
            textAlign: "left"
          }}
        >
          Input
        </Button>
        <div className="container_label_padding">Textfield</div>
        <DimesionsToolbar
          changeWireFrameHeight={this.props.changeWireFrameHeight}
          changeWireFrameWidth={this.props.changeWireFrameWidth}
        />
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "todoLists" }]))(
  ControllerAdder
);

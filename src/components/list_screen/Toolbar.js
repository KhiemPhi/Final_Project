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
        <Button
          className="transparent col s2 "
          flat
          icon={<Icon children="zoom_in" />}
          large
          onClick={this.props.zoomIn}
        ></Button>

        <Button
          flat
          icon={<Icon children="zoom_out" />}
          className="col s2 transparent"
          large
          onClick={this.props.zoomOut}
        ></Button>

        <Button
          flat
          className=" col s4 transparent"
          large
          onClick={this.props.goHome}
        >
          Save
        </Button>

        <Button
          flat
          className="col s4 transparent"
          onClick={this.props.goHome}
          large
        >
          Close
        </Button>
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "todoLists" }]))(
  Toolbar
);

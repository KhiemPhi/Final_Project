import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";


class DimensionsToolbar extends Component {
  state = {
    width: "700px",
    height: "800px",
    disabled: true
  };

  setWireFrameHeight = value => {
    if (value !== "") {
      var height = Number(value);
      if (height > 1 && height <= 5000 && !isNaN(height)) {
        this.setState({ height: value + "px" });
      }
    }
  };

  setWireFrameWidth = value => {
    if (value !== "") {
      var width = Number(value);
      if (width > 1 && width <= 5000 && !isNaN(width)) {
        this.setState({ width: value + "px" });
      }
    }
  };

  enableButton = () => {
    this.setState({ disabled: false });
  };

  makeDimesionChanges = () => {
    this.props.changeWireFrameWidth(this.state.width);
    this.props.changeWireFrameHeight(this.state.height);
    this.setState({ disabled: true });
  };

  render() {
    return (
      <div className="row control_container_only_top">
        <div className="row">
          <div className="col s8 push-s1" style={{ marginTop: "25px" }}>
            Height:
          </div>
          <div className="col s4 pull-s2">
            <input
              id="font_size_input"
              onChange={e => this.setWireFrameHeight(e.target.value)}
              onClick={this.enableButton}
            ></input>
          </div>
          <div className="col s8 push-s1" style={{ marginTop: "25px" }}>
            Width:
          </div>
          <div className="col s4 pull-s2">
            <input
              id="font_size_input"
              onChange={e => this.setWireFrameWidth(e.target.value)}
              onClick={this.enableButton}
            ></input>
          </div>
          <Button
            className="teal button_component"
            style={{
              height: "30px",
              width: "50%",
              margin: " 5% 0% 0% 25%",
              border: "1px solid black"
            }}
            disabled={this.state.disabled}
            onClick={this.makeDimesionChanges}
          >
            Update
          </Button>
        </div>
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "WireFrames" }]))(
  DimensionsToolbar
);

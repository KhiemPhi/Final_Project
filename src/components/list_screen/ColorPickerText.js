import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import { ChromePicker } from 'react-color';

class ColorPickerText extends Component {
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (!this.node.contains(e.target)) {
     
        // Out of Focus
        this.props.toggleTextColorDiv()
      
    }
  };

  render() {
    // x = left , y = top value, width = widht, height = height
    return (
      <div
        ref={node => (this.node = node)}
        style={{ transform: "scale(" + this.props.scale + ")", color: "red" }}
      >
        <ChromePicker
          color={
            this.props.focusedElement !== null
              ? document.getElementById(this.props.focusedElement).style
                  .color
              : "#000000"
          }
          onChange={this.props.handleTextColorChange}
        />
        
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "WireFrames" }]))(
  ColorPickerText
);

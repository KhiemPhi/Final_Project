import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import { ChromePicker } from 'react-color';

class ColorPickerBorder extends Component {
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (!this.node.contains(e.target)) {
     
        // Out of Focus
        this.props.toggleBorderColorDiv()
      
    }
  };

  render() {
    // x = left , y = top value, width = widht, height = height
    return (
      <div
        ref={node => (this.node = node)}
        
      >
        <ChromePicker
          color={
            this.props.focusedElement !== null
              ? document.getElementById(this.props.focusedElement).style
                  .borderColor
              : "#000000"
          }
          onChange={this.props.handleBorderColorChange}
        />
        
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "WireFrames" }]))(
  ColorPickerBorder
);

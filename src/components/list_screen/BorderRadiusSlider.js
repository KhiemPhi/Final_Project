import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import {Range} from "react-materialize"


class BorderRadiusSlider extends Component {
  state = {
    value: 0
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (!this.node.contains(e.target)) {
     
        // Out of Focus
        this.props.toggleBorderRadiusSlider()
      
    }
  };

  render() {
    // x = left , y = top value, width = widht, height = height
    
    return (
      <div
        ref={node => (this.node = node)}
        
      >
        <Range id = "border_radius_input" onChange = {e => this.props.handleBorderRadiusChange(e.target.value)} ></Range>
        
        
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "WireFrames" }]))(
  BorderRadiusSlider
);

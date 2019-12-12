import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import { Rnd } from "react-rnd";


class NewButton extends Component {
  state = {
    hasFocus: false,
    disableDragging: false
   
  };

  setFocus = () => {
    console.log(this.props.id);
    this.props.setFocusedElement(this.props.id);
    this.setState({ hasFocus: true });
    document.getElementById("text_input").value = document.getElementById(
      this.props.id
    ).textContent;
    
    var div = this.props.createResizers()      
    document.getElementById(this.props.id).appendChild(div)
  };
  

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (!this.node.contains(e.target)) {
      var editing = document.getElementById("modifier_area");
      if (!editing.contains(e.target)) {
        // Out of Focus
        this.setState({ hasFocus: false });
        this.setState({myText: this.props.focusedElementText})
        document.getElementById("text_input").value = ""
      }     
      if (this.props.focusedElement !== null){
        var div = this.props.createResizers()   
        document.getElementById(this.props.focusedElement).appendChild(div)
      }   
      
    } 
  };

  render() {
    // x = left , y = top value, width = widht, height = height
    return (
      <div ref={node => (this.node = node)} style = {{transform: "scale(" + this.props.scale + ")"}} >        
        <Rnd
          className={
            this.state.hasFocus
              ? this.props.class
              : this.props.class + "_out_focus"
          }
          default={{
            x: 0,
            y: 0,
            width: 130,
            height: 30
          }}
          id={this.props.id}          
          onClick={this.setFocus}
          disableDragging = {!this.state.hasFocus}
          bounds={"body"}          
          style = {{transform: "scale(" + this.props.scale + ")"}}
  >{this.props.myText}</Rnd>
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "todoLists" }]))(
  NewButton
);

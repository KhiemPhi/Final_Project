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
import { Rnd } from "react-rnd";
import Divider from "react-materialize/lib/Divider";

class NewContainer extends Component {
  state = {
      hasFocus: false,
      disableDragging: false
  }

  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    
    var container = document.getElementById("modifier_area")    
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && !container.contains(event.target) ) {
          this.setState({ hasFocus: false });           
          this.props.setFocusedElement(null); //No More Focused Element
          //this.props.setFocusedElementText(null);
    }
  }

  setFocus = () => {
    this.setState({ hasFocus: true });
    this.props.setFocusedElement(this.props.id);
    
    
    
    //Changing Colors
    
    // div.style.backgroundColor = "red";
    // Getting x and y coordinates to save into database
    //console.log(div.style.transform)
    this.setState({disableDragging : false})
    
  }

  disableDragging = () => {
    var div = document.getElementById(this.props.id)
    this.setState({disableDragging : true})
    
  }

  render() {
    // x = left , y = top value, width = widht, height = height
    return (
      
      <div ref={this.setWrapperRef} > 
        <Rnd
          className={this.state.hasFocus ? this.props.class : this.props.class + "_out_focus"}
          default={{
            x: 0,  
            y: 0, 
            width: 120,
            height: 80
          }} 
          disableDragging = {this.state.disableDragging}
          id={this.props.id}
          onClick= {this.setFocus}
          onMouseEnter =  {this.disableDragging}
          bounds = {"body"}
        >
          {this.state.hasFocus && (
            <div className="resizers">
              <div className="resizer top-left"></div>
              <div className="resizer top-right"></div>
              <div className="resizer bottom-left"></div>
              <div className="resizer bottom-right"></div>
            </div>
          )}
  {this.props.focusedElementText}</Rnd>
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "todoLists" }]))(
  NewContainer
);

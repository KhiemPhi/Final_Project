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

class NewContainer extends Component {
  state = {
      hasFocus: true
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
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({ hasFocus: false });
    }
  }

  setFocus = () => {
    this.setState({ hasFocus: true });
    
  }

  render() {
    return (
      <div ref={this.setWrapperRef} id={this.props.id}>
        <Rnd
          className={this.state.hasFocus ? this.props.class : this.props.class + "_out_focus"}
          default={{
            x: 0,
            y: 0,
            width: 120,
            height: 80
          }} 
               
          onClick= {this.setFocus}
        >
          {this.state.hasFocus && (
            <div className="resizers">
              <div className="resizer top-left"></div>
              <div className="resizer top-right"></div>
              <div className="resizer bottom-left"></div>
              <div className="resizer bottom-right"></div>
            </div>
          )}
        </Rnd>
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "todoLists" }]))(
  NewContainer
);

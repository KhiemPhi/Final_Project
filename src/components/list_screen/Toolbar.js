import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon, Modal } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";

class Toolbar extends Component {
  state = {
    saved : false
  }

  goSave = () => {
    this.setState({saved: true})
    this.props.saveWork()
  }

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
          onClick={this.props.saveWork}
        >
          Save
        </Button>

        {this.state.saved &&  <Button
            flat
            className=" col s4 transparent"
            large
            onClick = {this.props.goHome}
          >
            Close
          </Button>}

        {!this.state.saved && <Modal actions=
          {[
            <Button flat modal = "close" node="button" waves="green" onClick= {this.goSave}>Yes</Button>,
            <Button flat modal="close" node="button" waves="green" onClick = {this.props.goHome}>
              No
            </Button>
           
          ]}
          trigger={ <Button
            flat
            className=" col s4 transparent"
            large
            
          >
            Close
          </Button>}>
          <p>
            Would you Like To Save This WireFrame?
          </p>
        </Modal>}
      </div>
    );
  }
}

export default compose(firestoreConnect([{ collection: "todoLists" }]))(
  Toolbar
);

import React, { Component, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon, TextInput } from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import { Link } from "react-router-dom";
import ControllerAdder from "./ControllerAdder.js";
import ControllerModifier from "./ControllerModifier.js";
import NewContainer from "./NewContainer.js";
import NewLabel from "./NewLabel.js";
import NewButton from "./NewButton.js";
import NewTextField from "./NewTextField.js";

class ListScreen extends Component {
  state = {
    name: "",
    owner: "",
    containerCounter: 0,
    labelCounter: 0,
    buttonCounter: 0,
    textfieldCounter: 0,
    defaultZoom: 1,
    focusedElement: null,
    containers: [],
    labels: [],
    buttons: [],
    textfields: [],
    ContainerTextArray: [],
    LabelTextArray: [],
    ButtonTextArray: [],
    TextFieldTextArray: [],
    wireFrameWidth: "700px",
    wireFrameHeight: "800px",
    scale: "1"
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));

    const fireStore = getFirestore();

    fireStore
      .collection("todoLists")
      .doc(this.props.todoList.id)
      .update({
        [target.id]: target.value
      });
  };

  goHome = () => {
    this.props.history.push("/");
  };

  addContainer = () => {
    var counter = this.state.containerCounter;
    counter = counter + 1;
    var id = "new_container" + counter.toString();
    const { containers } = this.state;
    this.setState({ containers: containers.concat(id) });
    this.setState({ containerCounter: counter });
  };

  addLabel = () => {
    var counter = this.state.labelCounter;
    counter = counter + 1;
    var id = "new_label" + counter.toString();
    var defaultText = "Prompt For Input";
    const { labels } = this.state;
    const { LabelTextArray } = this.state;
    this.setState({
      LabelTextArray: LabelTextArray.concat(defaultText)
    });
    this.setState({ labels: labels.concat(id) });
    this.setState({ labelCounter: counter });
  };

  addTextField = () => {
    console.log("fire")
    var counter = this.state.textfieldCounter;
    counter = counter + 1;
    var id = "new_textfield" + counter.toString();
    var defaultText = "INPUT";
    const { textfields } = this.state;
    const { TextFieldTextArray } = this.state;
    this.setState({
      TextFieldTextArray: TextFieldTextArray.concat(defaultText)
    });
    this.setState({ textfields: textfields.concat(id) });
    this.setState({ textfieldCounter: counter });
  };

  addButton = () => {
    var counter = this.state.buttonCounter;
    counter = counter + 1;
    var id = "new_button" + counter.toString();
    var defaultText = "SUBMIT";
    const { buttons } = this.state;
    const { ButtonTextArray } = this.state;
    this.setState({
      ButtonTextArray: ButtonTextArray.concat(defaultText)
    });
    this.setState({ buttons: buttons.concat(id) });
    this.setState({ buttonCounter: counter });
  };

  setFocusedElement = id => {
    this.setState({ focusedElement: id });
  };

  changeWireFrameHeight = value => {
    this.setState({ wireFrameHeight: value });
  };

  changeWireFrameWidth = value => {
    this.setState({ wireFrameWidth: value });
  };

  createResizers = () => {
    var div = document.createElement("div");
    var top_left = document.createElement("div");
    var top_right = document.createElement("div");
    var bottom_left = document.createElement("div");
    var bottom_right = document.createElement("div");
    top_left.className = "resizer top-left";
    top_right.className = "resizer top-right";
    bottom_left.className = "resizer bottom-left";
    bottom_right.className = "resizer bottom-right";
    div.className = "resizers";
    div.appendChild(top_left);
    div.appendChild(top_right);
    div.appendChild(bottom_left);
    div.appendChild(bottom_right);
    return div;
  };

  editText = value => {
    var index = this.state.focusedElement.slice(-1) - 1;
    var newTextArray = [];
    //perform Check To see what element is being focused
    if (this.state.focusedElement.includes("container")) {
      newTextArray = this.state.ContainerTextArray;
      newTextArray[index] = value;
      this.setState({ ContainerTextArray: newTextArray });
    } else if (this.state.focusedElement.includes("label")) {
      newTextArray = this.state.LabelTextArray;
      newTextArray[index] = value;
      this.setState({ LabelTextArray: newTextArray });
    } else if (this.state.focusedElement.includes("button")) {
      newTextArray = this.state.ButtonTextArray;
      newTextArray[index] = value;
      this.setState({ ButtonTextArray: newTextArray });
    } else if (this.state.focusedElement.includes("textfield")) {
      newTextArray = this.state.TextFieldTextArray;
      newTextArray[index] = value;
      this.setState({ TextFieldTextArray: newTextArray });
    }
  };

  zoomIn = () => {
    var zoom = this.state.scale;
    var zoomValue = (Number(zoom) * 2).toString();
    this.setState({ scale: zoomValue });
  };

  zoomOut = () => {
    var zoom = this.state.scale;
    var zoomValue = (Number(zoom) / 2).toString();
    this.setState({ scale: zoomValue });
  };

  deleteAndCopyDetect = event => {
    if (event.key === "d" && event.ctrlKey) {
      console.log("Cltr+d Pressed");
    } else if (event.key === "Delete") {
      if (this.state.focusedElement !== null) {
        var indexToBeDelete = Number(this.state.focusedElement.slice(-1) - 1);
        if (this.state.focusedElement.includes("container")) {
          const { containers } = this.state;
          var tempContainer = containers;
          delete tempContainer[indexToBeDelete];
          this.setState({ containers: tempContainer });
          this.setState({ focusedElement: null });
        } else if (this.state.focusedElement.includes("label")) {
          const { labels } = this.state;
          var tempLabels = labels;
          delete tempLabels[indexToBeDelete];
          this.setState({ labels: tempLabels });
          this.setState({ focusedElement: null });
        } else if (this.state.focusedElement.includes("button")) {
          const { buttons } = this.state;
          var tempButtons = buttons;
          delete tempButtons[indexToBeDelete];
          this.setState({ buttons: tempButtons });
          this.setState({ focusedElement: null });
        }
      }
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.deleteAndCopyDetect, false);
  };

  componentWillUnmount = () => {
    const fireStore = getFirestore();
    if (this.props.todoList != null) {
      fireStore
        .collection("todoLists")
        .doc(this.props.todoList.id)
        .update({
          createdAt: new Date()
        });
    }
    document.removeEventListener("keydown", this.unDoAndRedoDetect, false);
  };

  render() {
    const auth = this.props.auth;
    const todoList = this.props.todoList;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    if (!todoList) return <React.Fragment />;

    return (
      <div>
        <div className="input-field">
          <label htmlFor="email" className="active">
            Name
          </label>
          <input
            className="active"
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
            defaultValue={todoList.name}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password" className="active">
            Owner
          </label>
          <input
            className="active"
            type="text"
            name="owner"
            id="owner"
            onChange={this.handleChange}
            defaultValue={todoList.owner}
          />
        </div>
        <div className="row" style={{ display: "flex" }}>
          <ControllerAdder
            goHome={this.goHome.bind(this)}
            zoomIn={this.zoomIn.bind(this)}
            zoomOut={this.zoomOut.bind(this)}
            addContainer={this.addContainer.bind(this)}
            addLabel={this.addLabel.bind(this)}
            addButton={this.addButton.bind(this)}
            addTextField = {this.addTextField.bind(this)}
            changeWireFrameHeight={this.changeWireFrameHeight.bind(this)}
            changeWireFrameWidth={this.changeWireFrameWidth.bind(this)}
            wireFrameWidth={Number(
              this.state.wireFrameWidth.substring(
                0,
                this.state.wireFrameWidth.length - 2
              )
            )}
            scale={this.state.scale}
          />

          <div
            className="white control_container_only_top_and_bottom col s8"
            id="edit_area"
            style={{
              zIndex: "1",
              width: this.state.wireFrameWidth,
              height: this.state.wireFrameHeight,
              transform: "scale(" + this.state.scale + ")"
            }}
          >
            {this.state.containers.map(x => (
              <NewContainer
                class={"new_container"}
                id={x}
                containerCounter={this.state.containerCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                myText={this.state.ContainerTextArray[Number(x.slice(-1)) - 1]}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.labels.map(x => (
              <NewLabel
                class={"new_label"}
                id={x}
                labelCounter={this.state.labelCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                myText={this.state.LabelTextArray[Number(x.slice(-1)) - 1]}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.buttons.map(x => (
              <NewButton
                class={"new_button"}
                id={x}
                buttonCounter={this.state.buttonCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                myText={this.state.ButtonTextArray[Number(x.slice(-1)) - 1]}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.textfields.map(x => (
              <NewTextField
                class={"new_textfield"}
                id={x}
                textfieldCounter={this.state.textfieldCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                myText={this.state.TextFieldTextArray[Number(x.slice(-1)) - 1]}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {/* Add Map Components from Database here   */}
          </div>
          <ControllerModifier
            editText={this.editText.bind(this)}
            focusedElement={this.state.focusedElement}
            focusedElementText={this.state.focusedElementText}
            wireFrameWidth={Number(
              this.state.wireFrameWidth.substring(
                0,
                this.state.wireFrameWidth.length - 2
              )
            )}
            scale={this.state.scale}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) todoList.id = id;
  return {
    todoList, // Mark Elements Here in The TodoList to Map Onto Edit Area Later
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "todoLists" }])
)(ListScreen);

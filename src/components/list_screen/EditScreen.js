import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "materialize-css/dist/css/materialize.min.css";
import { getFirestore } from "redux-firestore";
import ControllerAdder from "./ControllerAdder.js";
import ControllerModifier from "./ControllerModifier.js";
import NewContainer from "./NewContainer.js";
import NewLabel from "./NewLabel.js";
import NewButton from "./NewButton.js";
import NewTextField from "./NewTextField.js";
import {addContainer,addLabel,addTextField, addButton} from "./AddMethods.js"
import {editText, editFontSize} from "./EditTextMethods.js"
import {handleBorderRadiusChange, handleBorderThicknessChange, handleBorderColorChange} from "./BorderMethods.js"
import {handleTextColorChange, handleBackGroundColorChange} from "./ColorChangeMethods.js"
import {updateWidthAndHeightFocusedElement, updateXAndYCoordinatesFocusedElement} from "./DynamicUpdateMethods.js"

class EditScreen extends Component {
  state = {
    name: "",
    owner: "",
    containerCounter: 0,
    labelCounter: 0,
    buttonCounter: 0,
    textfieldCounter: 0,
    defaultZoom: 1,
    focusedElement: "edit_area",
    containers: [],
    labels: [],
    buttons: [],
    textfields: [],
    wireFrameWidth: "700px",
    wireFrameHeight: "900px",
    scale: "1",
    loaded: false
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));

    const fireStore = getFirestore();

    fireStore
      .collection("WireFrames")
      .doc(this.props.WireFrame.id)
      .update({
        [target.id]: target.value
      });
  };

  saveWork = () => {
    const fireStore = getFirestore();
    fireStore
      .collection("WireFrames")
      .doc(this.props.WireFrame.id)
      .get()
      .then(doc => {
        let newContainers = this.state.containers.filter( container => container !== undefined)
        let newButtons = this.state.buttons.filter( button => button !== undefined)
        let newLabels = this.state.labels.filter( label => label !== undefined)
        let newTextFields = this.state.textfields.filter(textfield => textfield !== undefined)
        fireStore
          .collection("WireFrames")
          .doc(this.props.WireFrame.id)
          .update({
            containers: newContainers,
            buttons: newButtons,
            labels: newLabels,
            textfields: newTextFields
          });
      });
  };

  goHome = () => {
    this.props.history.push("/");
  };

  addContainer = () => {   
    addContainer(this)   
  };

  addLabel = () => {
    addLabel(this)
  };

  addTextField = () => {
    addTextField(this)
  };

  addButton = () => {
    addButton(this)
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
    editText(value, this)
  };

  editFontSize = value => {
    editFontSize(value,this)
  };

  handleBorderRadiusChange = value => {    
    handleBorderRadiusChange(value, this)
  };

  handleBorderThicknessChange = value => {
    handleBorderThicknessChange(value,this)
  };

  handleBorderColorChange = (color, event) => {
   handleBorderColorChange(color,this)
  };

  handleBackGroundColorChange = (color, event) => {
    handleBackGroundColorChange(color, this)
  };

  handleTextColorChange = (color, event) => {
    handleTextColorChange(color, this)
  };

  updateXAndYCoordinatesFocusedElement = (x, y) => {
    updateXAndYCoordinatesFocusedElement(x,y,this)
  };

  updateWidthAndHeightFocusedElement = (width, height) => {
    updateWidthAndHeightFocusedElement(width, height, this)
  };

  zoomIn = () => {
    var zoom = this.state.scale;
    var zoomValue = (Number(zoom) * 2).toString();
    this.setState({ scale: zoomValue });
    this.setState({loaded: true})
  };

  zoomOut = () => {
    var zoom = this.state.scale;
    var zoomValue = (Number(zoom) / 2).toString();
    this.setState({ scale: zoomValue });
    this.setState({loaded: true})
  };

  duplicateElement = id => {
    var index = Number(id.slice(-1)) - 1;
    var counter = 0;
    var newId = "";
    if (id.includes("container")) {
      const { containers } = this.state;
      var containerToBeDuplicate = containers[index];
      counter = this.state.containerCounter;
      counter = counter + 1;
      newId = "new_container" + counter.toString();
      var newContainer = {
        id: newId,
        textColor: containerToBeDuplicate.textColor,
        backgroundColor: containerToBeDuplicate.backgroundColor,
        text: containerToBeDuplicate.text,
        fontSize: containerToBeDuplicate.fontSize,
        xCoordinate: containerToBeDuplicate.xCoordinate + 100,
        yCoordinate: containerToBeDuplicate.yCoordinate + 100,
        width: containerToBeDuplicate.width,
        height: containerToBeDuplicate.height,
        borderRadius: containerToBeDuplicate.borderRadius
      };
      this.setState({ containers: containers.concat(newContainer) });
      this.setState({ containerCounter: counter });
    } else if (id.includes("label")) {
      const { labels } = this.state;
      var labelToBeDuplicate = labels[index];
      counter = this.state.labelCounter;
      counter = counter + 1;
      newId = "new_label" + counter.toString();
      var newLabel = {
        id: newId,
        textColor: labelToBeDuplicate.textColor,
        backgroundColor: labelToBeDuplicate.backgroundColor,
        text: labelToBeDuplicate.text,
        fontSize: labelToBeDuplicate.fontSize,
        xCoordinate: labelToBeDuplicate.xCoordinate + 100,
        yCoordinate: labelToBeDuplicate.yCoordinate + 100,
        width: labelToBeDuplicate.width,
        height: labelToBeDuplicate.height,
        borderRadius: labelToBeDuplicate.borderRadius
      };
      this.setState({ labels: labels.concat(newLabel) });
      this.setState({ labelCounter: counter });
    } else if (id.includes("button")) {
      const { buttons } = this.state;
      var buttonToBeDuplicate = buttons[index];
      counter = this.state.buttonCounter;
      counter = counter + 1;
      newId = "new_button" + counter.toString();
      var newButton = {
        id: newId,
        textColor: buttonToBeDuplicate.textColor,
        backgroundColor: buttonToBeDuplicate.backgroundColor,
        text: buttonToBeDuplicate.text,
        fontSize: buttonToBeDuplicate.fontSize,
        xCoordinate: buttonToBeDuplicate.xCoordinate + 100,
        yCoordinate: buttonToBeDuplicate.yCoordinate + 100,
        width: buttonToBeDuplicate.width,
        height: buttonToBeDuplicate.height,
        borderRadius: buttonToBeDuplicate.borderRadius
      };
      this.setState({ buttons: buttons.concat(newButton) });
      this.setState({ buttonCounter: counter });
    } else if (id.includes("textfield")) {
      const { textfields } = this.state;
      var textfieldToBeDuplicate = textfields[index];
      counter = this.state.textfieldCounter;
      counter = counter + 1;
      newId = "new_textfield" + counter.toString();
      var newTextField = {
        id: newId,
        textColor: textfieldToBeDuplicate.textColor,
        backgroundColor: textfieldToBeDuplicate.backgroundColor,
        text: textfieldToBeDuplicate.text,
        fontSize: textfieldToBeDuplicate.fontSize,
        xCoordinate: textfieldToBeDuplicate.xCoordinate + 100,
        yCoordinate: textfieldToBeDuplicate.yCoordinate + 100,
        width: textfieldToBeDuplicate.width,
        height: textfieldToBeDuplicate.height,
        borderRadius: textfieldToBeDuplicate.borderRadius
      };
      this.setState({ textfields: textfields.concat(newTextField) });
      this.setState({ textfieldCounter: counter });
    }
    this.setState({loaded: true})
  };

  deleteAndCopyDetect = event => {
    if (event.key === "d" && event.ctrlKey) {
      event.preventDefault();
      if (this.state.focusedElement !== null) {
        var elementToDuplicate = this.state.focusedElement;
        this.duplicateElement(elementToDuplicate);
      }
    } else if (event.key === "Delete") {
      var counter = 0
      if (this.state.focusedElement !== null) {        
        if (this.state.focusedElement.includes("container")) {          
          const { containers } = this.state;
          var tempContainer = containers.filter(container => container.id !== this.state.focusedElement)  
          counter = this.state.containerCounter 
          counter = counter - 1
          this.setState({containerCounter: counter})       
          this.setState({ containers: tempContainer });
          this.setState({ focusedElement: "edit_area" });
        } else if (this.state.focusedElement.includes("label")) {
          const { labels } = this.state;
          var tempLabels = labels.filter(label => label.id !== this.state.focusedElement);  
          counter = this.state.labelCounter 
          counter = counter - 1
          this.setState({labelCounter: counter})        
          this.setState({ labels: tempLabels });
          this.setState({ focusedElement: "edit_area" });
        } else if (this.state.focusedElement.includes("button")) {
          const { buttons } = this.state;
          var tempButtons = buttons.filter(button => button.id !== this.state.focusedElement)
          counter = this.state.buttonCounter 
          counter = counter - 1
          this.setState({buttonCounter: counter})           
          this.setState({ buttons: tempButtons });
          this.setState({ focusedElement: "edit_area" });
        } else if (this.state.focusedElement.includes("textfield")) {
          const { textfields } = this.state;
          var tempTextFields = textfields.filter(textfield => textfield.id !== this.state.focusedElement)
          counter = counter - 1
          this.setState( {textfieldCounter: counter})           
          this.setState({ textfields: tempTextFields});                   
          this.setState({ textfields: tempTextFields });
          this.setState({ focusedElement: "edit_area" });
        }
      }
    }
    this.setState({loaded: true})
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.deleteAndCopyDetect, false);
  };

  componentWillUnmount = () => {
    const fireStore = getFirestore();
    if (this.props.WireFrame != null) {
      fireStore
        .collection("WireFrames")
        .doc(this.props.WireFrame.id)
        .update({
          createdAt: new Date()
        });
    }
    document.removeEventListener("keydown", this.unDoAndRedoDetect, false);
  };

  static getDerivedStateFromProps(nextProps, prevState) {      
      if (prevState.loaded === false){        
        return {
          buttons: nextProps.buttons,
          containers: nextProps.containers,
          labels: nextProps.labels,
          textfields: nextProps.textfields,
          containerCounter: nextProps.containerCounter,
          labelCounter: nextProps.labelCounter,
          textfieldCounter: nextProps.textfieldCounter,
          buttonCounter: nextProps.buttonCounter,          
        };
      }else{
        return null
      }   
     
  }

  render() {
    const auth = this.props.auth;
    const WireFrame = this.props.WireFrame;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    if (!WireFrame) return <React.Fragment />;

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
            defaultValue={WireFrame.name}
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
            defaultValue={WireFrame.owner}
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
            addTextField={this.addTextField.bind(this)}
            changeWireFrameHeight={this.changeWireFrameHeight.bind(this)}
            changeWireFrameWidth={this.changeWireFrameWidth.bind(this)}
            wireFrameWidth={Number(
              this.state.wireFrameWidth.substring(
                0,
                this.state.wireFrameWidth.length - 2
              )
            )}
            scale={this.state.scale}
            saveWork={this.saveWork.bind(this)}
          />

          <div
            className="edit_area white control_container_only_top_and_bottom col s8 l4"
            id="edit_area"
            style={{
              zIndex: "1",
              width: this.state.wireFrameWidth,
              height: this.state.wireFrameHeight,
              zoom: "200%",
              transform: "scale(" + this.state.scale + ")",
              transformOrigin: "0 0",
              maxWidth: "5000px",
              maxHeight: "5000px",
              overflow : "scroll"
            }}
            
          >
            {this.state.containers.map(x => (
              <NewContainer
                class={"new_container"}
                id={x.id}
                containerCounter={this.state.containerCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}                
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.labels.map(x => (
              <NewLabel
                class={"new_label"}
                id={x.id}
                labelCounter={this.state.labelCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}
                myText={x.text}
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.buttons.map(x => (
              <NewButton
                class={"new_button"}
                id={x.id}
                buttonCounter={this.state.buttonCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}
                myText={x.text}
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}

            {this.state.textfields.map(x => (
              <NewTextField
                class={"new_textfield"}
                id={x.id}
                textfieldCounter={this.state.textfieldCounter.toString()}
                setFocusedElement={this.setFocusedElement.bind(this)}
                updateXAndYCoordinatesFocusedElement={this.updateXAndYCoordinatesFocusedElement.bind(
                  this
                )}
                updateWidthAndHeightFocusedElement={this.updateWidthAndHeightFocusedElement.bind(
                  this
                )}
                myText={x.text}
                textColor={x.textColor}
                backgroundColor={x.backgroundColor}
                fontSize={x.fontSize}
                xCoordinate={x.xCoordinate}
                yCoordinate={x.yCoordinate}
                width={x.width}
                height={x.height}
                borderRadius={x.borderRadius}
                borderColor={x.borderColor}
                borderThickness={x.borderThickness}
                focusedElement={this.state.focusedElement}
                createResizers={this.createResizers.bind(this)}
                scale={this.state.scale}
              />
            ))}
          </div>
          <ControllerModifier
            editText={this.editText.bind(this)}
            editFontSize={this.editFontSize.bind(this)}
            focusedElement={this.state.focusedElement}
            focusedElementText={this.state.focusedElementText}
            wireFrameWidth={Number(
              this.state.wireFrameWidth.substring(
                0,
                this.state.wireFrameWidth.length - 2
              )
            )}
            handleBackGroundColorChange={this.handleBackGroundColorChange.bind(
              this
            )}
            handleTextColorChange={this.handleTextColorChange.bind(this)}
            handleBorderRadiusChange={this.handleBorderRadiusChange.bind(this)}
            handleBorderThicknessChange={this.handleBorderThicknessChange.bind(
              this
            )}
            handleBorderColorChange={this.handleBorderColorChange.bind(this)}
            scale={this.state.scale}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { WireFrames } = state.firestore.data;
  const WireFrame = WireFrames ? WireFrames[id] : null;

  if (WireFrame) WireFrame.id = id;
  if (WireFrame) {
    var containers = WireFrame.containers;
    var buttons = WireFrame.buttons;
    var labels = WireFrame.labels;
    var textfields = WireFrame.textfields;
    var containerCounter = WireFrame.containers.length
    var buttonCounter = WireFrame.buttons.length
    var labelCounter = WireFrame.labels.length
    var textfieldCounter = WireFrame.textfields.length
    
  }

  return {
    WireFrame, 
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    containers,
    buttons,
    labels,
    textfields,
    containerCounter,
    buttonCounter,
    labelCounter,
    textfieldCounter,    
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "WireFrames" }])
)(EditScreen);

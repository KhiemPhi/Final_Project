import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { TextInput, Range} from "react-materialize";
import "materialize-css/dist/css/materialize.min.css";
import ColorPickerBackground from "./ColorPickerBackground";
import ColorPickerText from "./ColorPickerText"
import ColorPickerBorder from "./ColorPickerBorder"
import BorderRadiusSlider from "./BorderRadiusSlider"
import Slider from 'react-rangeslider';
import BorderThicknessSlider from "./BorderThicknessSlider";
import Button from "react-materialize/lib/Button";

class ControllerModifier extends Component {  
  state = {
    showColorPickerBackgroundColor: true,
    showColorPickerBorderColor: true,
    showColorPickerTextColor: true,
    showBorderRadiusSlider: false,
    showBorderThicknessSlider: false,
    borderRadiusValue: 0,
    borderThicknessValue: 0,
  }

  toggleBackGroundColorDiv = () => {    
    const {showColorPickerBackgroundColor} = this.state
    this.setState({showColorPickerBackgroundColor : !showColorPickerBackgroundColor})
  }
  
  toggleTextColorDiv = () => {    
    const {showColorPickerTextColor} = this.state
    this.setState({showColorPickerTextColor : !showColorPickerTextColor})
  }

  toggleBorderColorDiv = () => {
    const {showColorPickerBorderColor} = this.state
    this.setState({showColorPickerBorderColor : !showColorPickerBorderColor})
  }

  toggleBorderRadiusSlider = () => {  
    const {showBorderRadiusSlider} = this.state
    this.setState({showBorderRadiusSlider : !showBorderRadiusSlider})
  }

  toggleBorderThicknessSlider = () => {
    const {showBorderThicknessSlider} = this.state
    this.setState({showBorderThicknessSlider : !showBorderThicknessSlider})
  }

  render() {   
    return (            
        <div className= {this.props.wireFrameWidth > 1000 ? this.props.wireFrameWidth >= 3000 ? "control_container col s12" : "control_container col s5" : "control_container col s3"} id = "modifier_area"  >
            <div style ={{paddingTop: "15%", marginLeft: "20%"}} > Properties </div>
              
              <TextInput id = "text_input" onChange = {e => this.props.editText(e.target.value)}   />                     
              
              <div className = "row" style ={{paddingTop: "5%"}}>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Font Size:</div>
                <div className = "col s4">
                  <TextInput id = "fontSize_input" onChange = {e => this.props.editFontSize(e.target.value)} ></TextInput>
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Background:</div>
                <div className = "col s1">
                  {this.state.showColorPickerBackgroundColor && <Button className = "background_color" id = "background_color_input" onClick= {this.toggleBackGroundColorDiv} style={this.props.focusedElement !== "edit_area" ? {backgroundColor: document.getElementById(this.props.focusedElement).style.backgroundColor} : {backgroundColor: "#000000"}} ></Button>}
                  {!this.state.showColorPickerBackgroundColor && <ColorPickerBackground focusedElement = {this.props.focusedElement} toggleBackGroundColorDiv = {this.toggleBackGroundColorDiv.bind(this)} handleBackGroundColorChange = {this.props.handleBackGroundColorChange} ></ColorPickerBackground>}
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px"}}>Text Color:</div>
                <div className = "col s1">
                  {this.state.showColorPickerTextColor && <Button className = "text_color" id = "text_color_input" onClick= {this.toggleTextColorDiv} style={this.props.focusedElement !== "edit_area" ? {backgroundColor: document.getElementById(this.props.focusedElement).style.color} : {backgroundColor: "#000000"}} ></Button>}
                  {!this.state.showColorPickerTextColor && <ColorPickerText focusedElement = {this.props.focusedElement} toggleTextColorDiv = {this.toggleTextColorDiv.bind(this)} handleTextColorChange = {this.props.handleTextColorChange}></ColorPickerText>}
                </div>
                <div className = "col s8" style={{marginTop: "25px", fontSize: "12px" }}>Border Color:</div>
                <div className = "col s1">
                  {this.state.showColorPickerBorderColor && <Button className = "border_color" id = "border_color_input" onClick= {this.toggleBorderColorDiv} style={this.props.focusedElement !== "edit_area" ? {backgroundColor: document.getElementById(this.props.focusedElement).style.borderColor} : {backgroundColor: "#000000"}} ></Button>}
                  {!this.state.showColorPickerBorderColor  && <ColorPickerBorder focusedElement = {this.props.focusedElement} toggleBorderColorDiv = {this.toggleBorderColorDiv.bind(this)} handleBorderColorChange = {this.props.handleBorderColorChange}></ColorPickerBorder>}
                </div>
                <div className = "col s7" style={{marginTop: "25px", fontSize: "12px"}}>Border Thickness:</div>
                <div className = "col s5">
                  {!this.state.showBorderThicknessSlider && <input  id = "border_thickness_input" onClick= {this.toggleBorderThicknessSlider}  ></input>}
                  {this.state.showBorderThicknessSlider && <BorderThicknessSlider focusedElement = {this.props.focusedElement} toggleBorderThicknessSlider= {this.toggleBorderThicknessSlider.bind(this) } handleBorderThicknessChange = {this.props.handleBorderThicknessChange} ></BorderThicknessSlider>}
                </div>
                <div className = "col s7" style={{marginTop: "25px", fontSize: "12px"}}>Border Radius:</div>
                <div className = "col s5 ">
                  {!this.state.showBorderRadiusSlider && <input id = "border_radius_input" onClick= {this.toggleBorderRadiusSlider}  ></input>}
                  {this.state.showBorderRadiusSlider && <BorderRadiusSlider focusedElement = {this.props.focusedElement} toggleBorderRadiusSlider= {this.toggleBorderRadiusSlider.bind(this)  }  handleBorderRadiusChange = {this.props.handleBorderRadiusChange} ></BorderRadiusSlider>}                  
                </div>                
             </div>   
          </div>
      
    );
  }
}

export default compose(  
  firestoreConnect([{ collection: "WireFrames" }])
)(ControllerModifier);

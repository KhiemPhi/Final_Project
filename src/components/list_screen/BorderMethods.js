export const handleBorderRadiusChange = (value, parent) => {    
    var index = parent.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (parent.state.focusedElement.includes("container")) {
      newArray = parent.state.containers;
      newArray[index].borderRadius = value.toString() + "px";
      parent.setState({ containers: newArray });
    } else if (parent.state.focusedElement.includes("label")) {
      newArray = parent.state.labels;
      newArray[index].borderRadius = value.toString() + "px";
      parent.setState({ labels: newArray });
    } else if (parent.state.focusedElement.includes("button")) {
      newArray = parent.state.buttons;
      newArray[index].borderRadius = value.toString() + "px";
      parent.setState({ buttons: newArray });
    } else if (parent.state.focusedElement.includes("textfield")) {
      newArray = parent.state.textfields;
      newArray[index].borderRadius = value.toString() + "px";
      parent.setState({ textfields: newArray });
    }
    parent.setState({loaded: true})
  };

 export const handleBorderThicknessChange = (value, parent) => {
    var index = parent.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (parent.state.focusedElement.includes("container")) {
      newArray = parent.state.containers;
      newArray[index].borderThickness = value.toString() + "px";
      parent.setState({ containers: newArray });
    } else if (parent.state.focusedElement.includes("label")) {
      newArray = parent.state.labels;
      newArray[index].borderThickness = value.toString() + "px";
      parent.setState({ labels: newArray });
    } else if (parent.state.focusedElement.includes("button")) {
      newArray = parent.state.buttons;
      newArray[index].borderThickness = value.toString() + "px";
      parent.setState({ buttons: newArray });
    } else if (parent.state.focusedElement.includes("textfield")) {
      newArray = parent.state.textfields;
      newArray[index].borderThickness = value.toString() + "px";
      parent.setState({ textfields: newArray });
    }
    parent.setState({loaded: true})
  };

  export const handleBorderColorChange = (color,parent) => {
    var index = parent.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    if (parent.state.focusedElement.includes("container")) {
      newArray = parent.state.containers;
      newArray[index].borderColor = color.hex;
      parent.setState({ containers: newArray });
    } else if (parent.state.focusedElement.includes("label")) {
      newArray = parent.state.labels;
      newArray[index].borderColor = color.hex;
      parent.setState({ labels: newArray });
    } else if (parent.state.focusedElement.includes("button")) {
      newArray = parent.state.buttons;
      newArray[index].borderColor = color.hex;
      parent.setState({ buttons: newArray });
    } else if (parent.state.focusedElement.includes("textfield")) {
      newArray = parent.state.textfields;
      newArray[index].borderColor = color.hex;
      parent.setState({ textfields: newArray });
    }
    parent.setState({loaded: true})
  };
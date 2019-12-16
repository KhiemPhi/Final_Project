export const handleBackGroundColorChange = (color, parent) => {
    if (parent.state.focusedElement.includes("container")) {
      var containers = parent.state.containers;
      var containerToBeEdit = containers.filter(
        container => container.id === parent.state.focusedElement
      )[0];
      containerToBeEdit.backgroundColor = color.hex;
      var indexContainer = Number(containerToBeEdit.id.slice(-1)) - 1;
      containers[indexContainer] = containerToBeEdit;
      parent.setState({ containers: containers }); //Confirmed Edit Into Object
    } else if (parent.state.focusedElement.includes("label")) {
      var labels = parent.state.labels;
      var labelToBeEdit = labels.filter(
        label => label.id === parent.state.focusedElement
      )[0];
      labelToBeEdit.backgroundColor = color.hex;
      var indexLabel = Number(labelToBeEdit.id.slice(-1)) - 1;
      labels[indexLabel] = labelToBeEdit;
      parent.setState({ labels: labels }); //Confirmed Edit Into Object
    } else if (parent.state.focusedElement.includes("button")) {
      var buttons = parent.state.buttons;
      var buttonToBeEdit = buttons.filter(
        button => button.id === parent.state.focusedElement
      )[0];
      buttonToBeEdit.backgroundColor = color.hex;
      var indexButton = Number(buttonToBeEdit.id.slice(-1)) - 1;
      buttons[indexButton] = buttonToBeEdit;
      parent.setState({ buttons: buttons }); //Confirmed Edit Into Object
    } else if (parent.state.focusedElement.includes("textfield")) {
      var textfields = parent.state.textfields;
      var textfieldToBeEdit = textfields.filter(
        textfield => textfield.id === parent.state.focusedElement
      )[0];
      textfieldToBeEdit.backgroundColor = color.hex;
      var indexTextField = Number(textfieldToBeEdit.id.slice(-1)) - 1;
      textfields[indexTextField] = textfieldToBeEdit;
      parent.setState({ textfields: textfields }); //Confirmed Edit Into Object
    }
    parent.setState({loaded: true})
  };

export const handleTextColorChange = (color, parent) => {
    if (
      parent.state.focusedElement.includes("container") &&
      parent.state.containers
    ) {
      var containers = parent.state.containers;
      var containerToBeEdit = containers.filter(
        container => container.id === parent.state.focusedElement
      )[0];
      containerToBeEdit.textColor = color.hex;
      var indexContainer = Number(containerToBeEdit.id.slice(-1)) - 1;
      containers[indexContainer] = containerToBeEdit;
      parent.setState({ containers: containers }); //Confirmed Edit Into Object
    } else if (parent.state.focusedElement.includes("label")) {
      var labels = parent.state.labels;
      var labelToBeEdit = labels.filter(
        label => label.id === parent.state.focusedElement
      )[0];
      labelToBeEdit.textColor = color.hex;
      var indexLabel = Number(labelToBeEdit.id.slice(-1)) - 1;
      labels[indexLabel] = labelToBeEdit;
      parent.setState({ labels: labels }); //Confirmed Edit Into Object
    } else if (parent.state.focusedElement.includes("button")) {
      var buttons = parent.state.buttons;
      var buttonToBeEdit = buttons.filter(
        button => button.id === parent.state.focusedElement
      )[0];
      buttonToBeEdit.textColor = color.hex;
      var indexButton = Number(buttonToBeEdit.id.slice(-1)) - 1;
      buttons[indexButton] = buttonToBeEdit;
      parent.setState({ buttons: buttons }); //Confirmed Edit Into Object
    } else if (parent.state.focusedElement.includes("textfield")) {
      var textfields = parent.state.textfields;
      var textfieldToBeEdit = textfields.filter(
        textfield => textfield.id === parent.state.focusedElement
      )[0];
      textfieldToBeEdit.textColor = color.hex;
      var indexTextField = Number(textfieldToBeEdit.id.slice(-1)) - 1;
      textfields[indexTextField] = textfieldToBeEdit;
      parent.setState({ textfields: textfields }); //Confirmed Edit Into Object
    }
    parent.setState({loaded: true})
  };
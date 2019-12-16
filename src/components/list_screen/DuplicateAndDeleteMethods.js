export const duplicateElement = (id, parent) => {
    var index = Number(id.slice(-1)) - 1;
    var counter = 0;
    var newId = "";
    if (id.includes("container")) {
      const { containers } = parent.state;
      var containerToBeDuplicate = containers[index];
      counter = parent.state.containerCounter;
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
        borderRadius: containerToBeDuplicate.borderRadius,
        borderThickness: containerToBeDuplicate.borderThickness,
        borderColor: containerToBeDuplicate.borderColor
      };
      parent.setState({ containers: containers.concat(newContainer) });
      parent.setState({ containerCounter: counter });
    } else if (id.includes("label")) {
      const { labels } = parent.state;
      var labelToBeDuplicate = labels[index];
      counter = parent.state.labelCounter;
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
        borderRadius: labelToBeDuplicate.borderRadius,
        borderThickness: labelToBeDuplicate.borderThickness,
        borderColor: labelToBeDuplicate.borderColor

      };
      parent.setState({ labels: labels.concat(newLabel) });
      parent.setState({ labelCounter: counter });
    } else if (id.includes("button")) {
      const { buttons } = parent.state;
      var buttonToBeDuplicate = buttons[index];
      counter = parent.state.buttonCounter;
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
        borderRadius: buttonToBeDuplicate.borderRadius,
        borderThickness: buttonToBeDuplicate.borderThickness,
        borderColor: buttonToBeDuplicate.borderColor
      };
      parent.setState({ buttons: buttons.concat(newButton) });
      parent.setState({ buttonCounter: counter });
    } else if (id.includes("textfield")) {
      const { textfields } = parent.state;
      var textfieldToBeDuplicate = textfields[index];
      counter = parent.state.textfieldCounter;
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
        borderRadius: textfieldToBeDuplicate.borderRadius,
        borderThickness: textfieldToBeDuplicate.borderThickness,
        borderColor: textfieldToBeDuplicate.borderColor
      };
      parent.setState({ textfields: textfields.concat(newTextField) });
      parent.setState({ textfieldCounter: counter });
    }
    parent.setState({loaded: true})
  };

  export const deleteElement = (counter, parent) => {
    if (parent.state.focusedElement.includes("container")) {          
        const { containers } = parent.state;
        var tempContainer = containers.filter(container => container.id !== parent.state.focusedElement)  
        counter = parent.state.containerCounter 
        counter = counter - 1
        parent.setState({containerCounter: counter})       
        parent.setState({ containers: tempContainer });
        parent.setState({ focusedElement: "edit_area" });
      } else if (parent.state.focusedElement.includes("label")) {
        const { labels } = parent.state;
        var tempLabels = labels.filter(label => label.id !== parent.state.focusedElement);  
        counter = parent.state.labelCounter 
        counter = counter - 1
        parent.setState({labelCounter: counter})        
        parent.setState({ labels: tempLabels });
        parent.setState({ focusedElement: "edit_area" });
      } else if (parent.state.focusedElement.includes("button")) {
        const { buttons } = parent.state;
        var tempButtons = buttons.filter(button => button.id !== parent.state.focusedElement)
        counter = parent.state.buttonCounter 
        counter = counter - 1
        parent.setState({buttonCounter: counter})           
        parent.setState({ buttons: tempButtons });
        parent.setState({ focusedElement: "edit_area" });
      } else if (parent.state.focusedElement.includes("textfield")) {
        const { textfields } = parent.state;
        var tempTextFields = textfields.filter(textfield => textfield.id !== parent.state.focusedElement)
        counter = counter - 1
        parent.setState( {textfieldCounter: counter})           
        parent.setState({ textfields: tempTextFields});                   
        parent.setState({ textfields: tempTextFields });
        parent.setState({ focusedElement: "edit_area" });
      }
  }
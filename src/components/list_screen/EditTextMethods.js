export const editText = (value, parent) => {
    var index = parent.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (parent.state.focusedElement.includes("label")) {
      newArray = parent.state.labels;
      newArray[index].text = value;
      parent.setState({ labels: newArray });
    } else if (parent.state.focusedElement.includes("button")) {
      newArray = parent.state.buttons;
      newArray[index].text = value;
      parent.setState({ buttons: newArray });
    } else if (parent.state.focusedElement.includes("textfield")) {
      newArray = parent.state.textfields;
      newArray[index].text = value;
      parent.setState({ textfields: newArray });
    }
    parent.setState({loaded: true})
  };

  export const editFontSize = (value, parent) => {
    var index = parent.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (parent.state.focusedElement.includes("label")) {
      newArray = parent.state.labels;
      newArray[index].fontSize = value.toString() + "px";
      parent.setState({ labels: newArray });
    } else if (parent.state.focusedElement.includes("button")) {
      newArray = parent.state.buttons;
      newArray[index].fontSize = value.toString() + "px";
      parent.setState({ buttons: newArray });
    } else if (parent.state.focusedElement.includes("textfield")) {
      newArray = parent.state.textfields;
      newArray[index].fontSize = value.toString() + "px";
      parent.setState({ textfields: newArray });
    }
    parent.setState({loaded: true})
  };
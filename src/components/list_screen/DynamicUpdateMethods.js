export const updateXAndYCoordinatesFocusedElement = (x, y, parent) => {
    var index = parent.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (parent.state.focusedElement.includes("container")) {
      newArray = parent.state.containers;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      parent.setState({ containers: newArray });
    } else if (parent.state.focusedElement.includes("label")) {
      newArray = parent.state.labels;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      parent.setState({ labels: newArray });
    } else if (parent.state.focusedElement.includes("button")) {
      newArray = parent.state.buttons;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      parent.setState({ buttons: newArray });
    } else if (parent.state.focusedElement.includes("textfield")) {
      newArray = parent.state.textfields;
      newArray[index].xCoordinate = x;
      newArray[index].yCoordinate = y;
      parent.setState({ textfields: newArray });
    }
    parent.setState({loaded: true})
  };

export const updateWidthAndHeightFocusedElement = (width, height, parent) => {
    var index = parent.state.focusedElement.slice(-1) - 1;
    var newArray = [];
    //perform Check To see what element is being focused
    if (parent.state.focusedElement.includes("container")) {
      newArray = parent.state.containers;
      newArray[index].width = width;
      newArray[index].height = height;
      parent.setState({ containers: newArray });
    } else if (parent.state.focusedElement.includes("label")) {
      newArray = parent.state.labels;
      newArray[index].width = width;
      newArray[index].height = height;
      parent.setState({ labels: newArray });
    } else if (parent.state.focusedElement.includes("button")) {
      newArray = parent.state.buttons;
      newArray[index].width = width;
      newArray[index].height = height;
      parent.setState({ buttons: newArray });
    } else if (parent.state.focusedElement.includes("textfield")) {
      newArray = parent.state.textfields;
      newArray[index].width = width;
      newArray[index].height = height;
      parent.setState({ textfields: newArray });
    }
    parent.setState({loaded: true})
};
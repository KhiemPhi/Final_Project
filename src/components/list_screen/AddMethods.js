export const addContainer = (parent) => {    
    var counter = parent.state.containerCounter;
    counter = counter + 1;
    var id = "new_container" + counter.toString();
    var newContainer = {
      id: id,
      textColor: "#000000",
      backgroundColor: "#ffffff",
      text: "",
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 120,
      height: 80,
      borderRadius: "1px",
      borderColor: "#000000",
      borderThickness: "2px"
    };
    const { containers } = parent.state;    
    parent.setState({ containers: containers.concat(newContainer) });
    parent.setState({ containerCounter: counter });
    parent.setState({loaded: true})
  };

export const addLabel = (parent) => {
    var counter = parent.state.labelCounter;
    counter = counter + 1;
    var id = "new_label" + counter.toString();
    var defaultText = "Prompt For Input";
    var newLabel = {
      id: id,
      textColor: "#000000",
      backgroundColor: "#ffffff",
      text: defaultText,
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 300,
      height: 45,
      borderRadius: "1px",
      borderColor: "#ffffff",
      borderThickness: "0px"
    };
    const { labels } = parent.state;
    parent.setState({ labels: labels.concat(newLabel) });
    parent.setState({ labelCounter: counter });
    parent.setState({loaded: true})
  };

export const addTextField = (parent) => {
    var counter = parent.state.textfieldCounter;
    counter = counter + 1;
    var id = "new_textfield" + counter.toString();
    var defaultText = "INPUT";
    var newTextField = {
      id: id,
      textColor: "#808080",
      backgroundColor: "#ffffff",
      text: defaultText,
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 210,
      height: 30,
      borderRadius: "1px",
      borderColor: "#000000",
      borderThickness: "1px"
    };
    const { textfields } = parent.state;
    parent.setState({ textfields: textfields.concat(newTextField) });
    parent.setState({ textfieldCounter: counter });
    parent.setState({loaded: true})
  };

export const addButton = (parent) => {
    var counter = parent.state.buttonCounter;
    counter = counter + 1;
    var id = "new_button" + counter.toString();
    var defaultText = "SUBMIT";
    var newButton = {
      id: id,
      textColor: "#000000",
      backgroundColor: "#bdbdbd",
      text: defaultText,
      fontSize: "16px",
      xCoordinate: 0,
      yCoordinate: 0,
      width: 130,
      height: 30,
      borderRadius: "1px",
      borderColor: "#000000",
      borderThickness: "1px"
    };
    const { buttons } = parent.state;
    parent.setState({ buttons: buttons.concat(newButton) });
    parent.setState({ buttonCounter: counter });
    parent.setState({loaded: true})
  };
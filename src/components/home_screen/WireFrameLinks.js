import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import "materialize-css/dist/css/materialize.min.css";
import WireFrameCard from "./WireFrameCard";
import DeleteButton from "./DeleteButton";

class WireFrameLinks extends React.Component {
  

  render() {
    const WireFrames = this.props.WireFrames;
    const owner = this.props.profile.firstName + " " + this.props.profile.lastName
    return (
      <div className="row todo-lists section">
        {WireFrames &&
          WireFrames.filter(element => element.owner === owner).map(WireFrame => (
            <div className = "row" >
              <Link to={"/WireFrame/" + WireFrame.id} key={WireFrame.id}>
                <WireFrameCard
                  WireFrame={WireFrame}
                  history={this.props.history}
                />
              </Link>
              <DeleteButton  WireFrame={WireFrame}
                  history={this.props.history}></DeleteButton>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    WireFrames: state.firestore.ordered.WireFrames,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(connect(mapStateToProps))(WireFrameLinks);

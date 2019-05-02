import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserData } from "../../actions/mapActions";
import NavBar from "./NavBar";

class ParentNav extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    // this.props.getUserData(1);
  }

  handlePusher = () => {
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  onLogout = () => {
    localStorage.clear("SAMUserID");
    document.location.reload(true);
  };

  render() {
    const { visible } = this.state;

    return (
      <NavBar
        onPusherClick={this.handlePusher}
        onToggle={this.handleToggle}
        visible={visible}
        getUserData={this.props.getUserData}
        onLogout={this.onLogout}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.getUserDataReducer.userData,
    userCountryData: state.getUserDataReducer.userCountryData,
    loading: state.getUserDataReducer.loading
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getUserData }
  )(ParentNav)
);

import React, { Component } from "react";
import NavBar from "./NavBar";

class ParentNav extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;

    return (
        <NavBar
          onPusherClick={this.handlePusher}
          onToggle={this.handleToggle}
          visible={visible}
        />
    );
  }
}

export default ParentNav;

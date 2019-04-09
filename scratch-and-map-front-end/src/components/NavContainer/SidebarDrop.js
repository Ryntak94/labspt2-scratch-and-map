import React, { Component } from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";

class SidebarDrop extends Component {
  state = {
    options: []
  };

  async componentDidMount() {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then(res => {
        console.log("Side Bar Users", res);
        this.setState({
          options: res.data.users
        });
      });
  }

  handleChange = (e, data) => {
    console.log("ONCHANGE", data);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let optionItems = this.state.options.map(item => (
      <option key={item.id} value={item.id} text={item.username}>
        {item.username}
      </option>
    ));

    return (
      <Dropdown
        onClick={this.handleChange}
        placeholder="Select Friend"
        fluid
        search
        selection
        options={optionItems}
      />
    );
  }
}
export default SidebarDrop;

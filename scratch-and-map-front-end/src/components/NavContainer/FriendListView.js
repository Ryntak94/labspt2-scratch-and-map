import React, { Component } from "react";
import { Menu, Button, Segment, Image, Search } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

class FriendListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      filteredFriends: [],
      query: ""
    };
  }

  async componentDidMount() {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then(res => {
        console.log("Side Bar Users", res);
        this.setState({
          friends: res.data.users,
          filteredFriends: res.data.users
        });
      });
  }

  onChangeHandler = ({ target }) => {
    const res = this.state.friends.filter(friend => {
      const name = friend.first_name + " " + friend.last_name;
      return name.includes(target.value);
    });
    this.setState({
      filteredFriends: res,
      query: target.value
    });
  };

  render() {
    return (
      <div className="friend-view-wrapper">
        <input
          className="search-bar"
          placeholder="Search Friends        &#x1f50d; &nbsp;"
          onChange={this.onChangeHandler}
          value={this.state.query}
        />
        <Menu
          inverted
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            height: 400
          }}
          className="friend-card-list"
        >
          {this.state.filteredFriends.map(friend => {
            return (
              <Menu.Item as="a" className="friend-card" key={friend.id}>
                <Image
                  style={{ fontSize: 27 }}
                  src="http://placekitten.com/200/200"
                  avatar
                />

                <Menu.Header style={{ fontSize: 16 }}>
                  {friend.first_name} {friend.last_name}
                </Menu.Header>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  }
}

export default FriendListView;

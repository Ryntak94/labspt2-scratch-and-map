import React, { Component } from "react";
import ParentNav from "./components/NavContainer/ParentNav";
import "./index.scss";
require("dotenv").config();

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }
  componentDidMount() {
    //grab FbAcessToken from local storage
    axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/api/users/fb`, {
        accessToken: window.localStorage.getItem("FbAccessToken"),
        fb_user_id: window.localStorage.getItem("SAMUserID")
      })
      .then(res => {
        this.setState(state => ({
          isLoggedIn: res.data.isLoggedIn
        }));
      });
  }
  render() {
    return (
      <div className="App">
        <ParentNav />
      </div>
    );
  }
}

export default App;

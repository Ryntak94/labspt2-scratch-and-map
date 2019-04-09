import React, { Component } from "react";
import ParentNav from "./components/NavContainer/ParentNav";
import "./index.scss";
require("dotenv").config();

class App extends Component {
  componentDidMount() {
    //grab FbAcessToken from local storage
    // axios.post(`http://${process.env.REACT_APP_BACKEND_URL}/api/users/fb`);
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
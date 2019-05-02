import React, { Component } from "react";
import FbLogin from "./FbLogin";
import axios from "axios";
import { Button, Modal } from "semantic-ui-react";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      username: "",
      password: "",
      email: ""
    };
  }

  clearState = () => {
    this.setState({ username: "", password: "", email: "" });
  };

  showLogin = e => {
    this.clearState();
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  };

  showRegister = e => {
    this.clearState();
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    const action = this.state.isLoginOpen ? "login" : "signup";
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/${action}`, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        this.props.history.push("/map"); //Not currently redirecting
      });
  };

  render() {
    return (
      <div className="landing">
        <div className="Nav">
          <Modal
            size="mini"
            trigger={
              <Button className="navbutton" inverted>
                SIGN UP
              </Button>
            }
            closeIcon
          >
            <Modal.Content>
              <div className="box-wrapper">
                {this.state.isLoginOpen && (
                  <FbLogin
                    inputChange={this.handleInputChange}
                    submit={this.onSubmitHandler}
                  />
                )}
              </div>
            </Modal.Content>
          </Modal>

          <Modal
            size="mini"
            trigger={
              <Button className="navbutton" inverted>
                LOG IN
              </Button>
            }
            closeIcon
          >
            <Modal.Content image>
              <div className="box-wrapper">
                {this.state.isLoginOpen && (
                  <FbLogin
                    inputChange={this.handleInputChange}
                    submit={this.onSubmitHandler}
                  />
                )}
              </div>
            </Modal.Content>
          </Modal>

          {/* <div className="auth-wrapper">
        <div className="auth-controller">
          <div
            className={
              "controller" +
              (this.state.isRegisterOpen ? "selected-controller" : "")
            }
            onClick={this.showRegister}
          >
            Sign Up
          </div>
          <div
            className={
              "login-controller" +
              (this.state.isLoginOpen ? "selected-controller" : "")
            }
            onClick={this.showLogin}
          >
            Log In
          </div>
        </div>
      </div> */}
        </div>
      </div>
    );
  }
}

export default Auth;

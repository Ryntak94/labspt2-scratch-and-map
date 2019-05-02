import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserData } from "../../actions/mapActions";
require("dotenv").config();

class FbLogin extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userID: "",
      name: "",
      email: "",
      picture: ""
    };
  }

  responseFacebook = response => {
    console.log("FACEBOOK RESPONSE", response);
    this.setState(
      {
        username: response.email,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      },

      () => {
        console.log("THIS STATE", this.state);

        const name = response.name.split(" ");
        const first = name[0];
        const last = name[1];
        const user = {
          username: response.email,
          password: response.accessToken,
          email: response.email,
          first_name: first,
          last_name: last,
          age: 24,
          nationality: "Russian",
          role: "user",
          auto_scratch: "true",
          home_country: "RUS",
          fb_user_id: response.userID,
          fb_access_token: response.accessToken,
          picture_url: "http://placekitten.com/200/200"
        };

        //Checks DB If FB User Exist
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/fb/${
              response.userID
            }`
          )
          .then(res => {
            console.log("DATA I HOPE", res.data);
            if (!res.data.fb_user_id) {
              //signup second phase component here
              const url = `${process.env.REACT_APP_BACKEND_URL}/api/signup`;
              const proxyurl = "https://cors-anywhere.herokuapp.com/";
              axios
                .post(url, user)

                .then(res => {
                  window.localStorage.setItem(
                    "FbAccessToken",
                    response.accessToken
                  );
                  window.localStorage.setItem("SAMUserID", response.userID);
                  // this.props.getUserData(
                  //   window.localStorage.getItem("SAMUserID") ***Will add back in later - BM
                  // );
                  return console.log(res);
                }); //need a message when user already exist.
            } else {
              console.log("ELSE", res);
              let new_user = res.data;
              new_user.fb_access_token = response.accessToken;
              axios
                .put(
                  `${process.env.REACT_APP_BACKEND_URL}/api/login/fb/${
                    response.id
                  }`,
                  new_user
                )
                .then(res => {
                  window.localStorage.setItem(
                    "FbAccessToken",
                    response.accessToken
                  );
                  window.localStorage.setItem("SAMUserID", response.userID);
                  // this.props.getUserData(
                  //   window.localStorage.getItem("SAMUserID")***Will add back in later - BM
                  // );
                  return console.log("LOGIN RES", res);
                });
            }
          })
          .then(res => {
            document.location.reload(true);
          });
      }
    );
  };
  componentClicked = () => console.log("clicked");

  componentDidUpdate() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: process.env.REACT_APP_FB_APP_ID,
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5" // use version 2.1
      });

      window.FB.getLoginStatus(response => {
        console.log(response);
        if (response.status === "connected") {
          // axios login call
          console.log("init", response);
        }
      }); //end getLoginStatus
    }; //end fbAsyncInit
  } //end component did update

  handleClose = () => {
    document.getElementById("fbContent").style.display = "none";
  };

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "100%",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name} </h2>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId={process.env.REACT_APP_FB_APP_ID}
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    userData: state.getUserDataReducer.userData,
    userCountryData: state.getUserDataReducer.userCountryData,
    loading: state.getUserDataReducer.loading,
    DBUserID: state.getUserDataReducer.id
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getUserData }
  )(FbLogin)
);

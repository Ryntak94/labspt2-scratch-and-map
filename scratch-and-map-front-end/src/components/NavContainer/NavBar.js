import React from "react";
import { Route, Link } from "react-router-dom";
import {
  Menu,
  Sidebar,
  Button,
  Segment,
  Icon,
  Modal,
  Header
} from "semantic-ui-react";
import logo from "../../img/logowhite.png";
import Auth from "../AuthContainer/Auth";
import Landing from "../Landing";
import FriendListView from "../NavContainer/FriendListView";
import MapContainer from "../MapContainer/MapContainer";
import DevCard from "./DevCard";
import CheckoutForm from "../CheckoutForm";

const NavBar = ({
  onToggle,
  visible,
  onPusherClick,
  getUserData,
  onLogout
}) => (
  <div>
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        className="sidebar"
        inverted
        vertical
        visible={visible}
        width="wide"
      >
        <Button.Group className="closebutton">
          <Button onClick={onToggle} icon="close" inverted />
        </Button.Group>
        <Menu.Item as={Link} to="/">
          <img src={logo} alt="" />
        </Menu.Item>
        {window.localStorage.getItem("SAMUserID") ? (
          <Link
            to={{
              pathname: "/map",
              state: {
                user: window.localStorage.getItem("SAMUserID")
              }
            }}
          >
            <Menu.Item
            // onClick={() =>
            //   getUserData(window.localStorage.getItem("SAMUserID"))
            // }
            >
              <Icon name="map" inverted />
              My Map
            </Menu.Item>{" "}
          </Link>
        ) : (
          <Modal
            trigger={
              <Menu.Item>
                {/* onClick={onClick} */}
                <Icon name="map" inverted />
                My Map
              </Menu.Item>
            }
            basic
            size="large"
            closeIcon
          >
            <Modal.Content>
              <p style={{ textAlign: "center" }}>Please Log In to Access Map</p>
            </Modal.Content>
          </Modal>
        )}

        <FriendListView />
      </Sidebar>
      <div className="Menu">
        <div className="leftNav">
          <Button className="navbutton" inverted onClick={onToggle}>
            MENU
          </Button>
        </div>
        <div className="rightNav">
          <Modal
            trigger={
              <Button inverted className="premium">
                <Icon name="gem" />
                PREMIUM
              </Button>
            }
            basic
            size="small"
            closeIcon
          >
            <Header icon="gem" content="Premium Sign Up" />
            <Modal.Content>
              <CheckoutForm />
            </Modal.Content>
          </Modal>
          )
          <div className="AuthButtons">
            {window.localStorage.getItem("SAMUserID") ? (
              <Button className="premium" inverted onClick={onLogout}>
                LOG OUT
              </Button>
            ) : (
              <Auth />
            )}
          </div>
        </div>
      </div>

      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Segment basic>
          <Route path="/" exact render={props => <Landing />} />
          <Route path="/map" exact render={props => <MapContainer />} />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>

    <div className="footer" id="footer">
      <Modal
        trigger={
          <div className="contact">
            <p> ABOUT THE TEAM </p>
          </div>
        }
        basic
        size="small"
        closeIcon
      >
        <Header
          content={
            <div style={{ display: "flex" }}>
              <p className="teamtext">THE TEAM</p>
            </div>
          }
        />
        <Modal.Content>
          <DevCard />
        </Modal.Content>
      </Modal>
    </div>
  </div>
);

export default NavBar;

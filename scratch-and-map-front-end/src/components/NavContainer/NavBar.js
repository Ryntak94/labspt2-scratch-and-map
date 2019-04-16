import React from "react";
import { Route, Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { Menu, Sidebar, Button, Segment, Icon, Modal, Header } from "semantic-ui-react";
import logo from '../../img/logowhite.png'
import Auth from "../AuthContainer/Auth";
import SidebarDrop from "./SidebarDrop";
import Landing from '../Landing'
import FriendListView from "../NavContainer/FriendListView";
import MapContainer from '../MapContainer/MapContainer'
import { getUserData } from "../../actions/mapActions";
import DevCard from './DevCard'


const NavBar = ({ onToggle, visible, onPusherClick, onClick }) => (
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
      <Menu.Item as="a" as={Link} to="/" onClick={() => refreshMap()}>
        <img src={logo} />
      </Menu.Item>
      <Menu.Item as="a" as={Link} to="/map">
        {/* onClick={onClick} */}
        <Icon name="map" inverted />
        My Map
      </Menu.Item>
      <Menu.Item as="a">
        {/* onClick={onClick} */}
        <Icon name="users" inverted /> View Friend Maps
      </Menu.Item>

      <Menu.Item as="a" as={Link} to="/map">
        <Icon name="map" inverted />
      </Menu.Item>

      <SidebarDrop />
      <FriendListView visible={visible} />
    </Sidebar>
    <div className="Menu">
      <div className="MenuButton">
        <Button className="navbutton" inverted onClick={onToggle}>
          Menu
        </Button>
      </div>

      <div className="AuthButtons">
        <Auth />
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
  <Route path="/friends" exact render={props => <FriendListView />} />    
  </Segment>
            </Sidebar.Pusher>
    </Sidebar.Pushable>
      <div className="footer" id='footer'>
      <Modal trigger={
      <Button color='black' inverted size='tiny' compact >
      <div className="contact"><img src={logo} style={{height: '30px', margin: '5px'}}/><p>DEV TEAM</p></div>
      </Button>} 
      basic size='small' closeIcon>
    <Header content={<div style={{display: 'flex'}}><img src={logo} style={{height: '50px', margin: '5px'}}/><p style={{fontSize: '30px', marginTop: '13px'}}>DEV TEAM</p></div>} />
    <Modal.Content>
        <DevCard />
    </Modal.Content>
  </Modal>
      </div>
    </div>

);

export default NavBar;

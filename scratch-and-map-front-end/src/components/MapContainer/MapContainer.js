import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import countrydata from "./countries.geo.json";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserData } from "../../actions/mapActions";
import styled from "styled-components";
import { returnCode, returnId } from "../helper";
import { getUserDataReducer } from "../../reducers/mapReducer.js";
import Card from "./Card";
import Legend from "./Legend";
import Loading from "../Loading";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const colorCodes = {
  0: "lightgrey",
  1: "#CD5D01",
  2: "#8FC201",
  3: "#9B016D",
  4: "#017B7B"
};

function countryColorMatcher(userData, geoJsonCountry) {
  let colorCode = 0;
  userData.map(country => {
    if (
      JSON.stringify(returnCode(country.country_id)) ===
      JSON.stringify(geoJsonCountry)
    ) {
      colorCode = country.status;
    }
  });
  return colorCode;
}

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isOpen: false,
      clickedCountry: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }

  toggleModal() {
    this.setState({ isOpen: false });
  }

  componentDidMount() {
    this.props.getUserData(1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading) {
      function style(feature) {
        return {
          fillColor:
            colorCodes[
              countryColorMatcher(
                nextProps.userCountryData,
                feature.properties.SOV_A3
              )
            ] || "pink",
          weight: 1,
          opacity: 1,
          color: "lightgrey",
          fillOpacity: 0.7
        };
      }
      this.map = L.map("map", {
        center: [30, 0],
        zoom: 3,
        zoomControl: false,
        maxZoom: 20,
        minZoom: 2.5,
        maxBounds: [[-90, -180], [90, 180]],
        maxBoundsViscosity: 1
      });
      L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 3,
          noWrap: true
        }
      ).addTo(this.map);
      L.geoJson(countrydata, {
        onEachFeature: (feature, layer) => {
          layer.bindPopup("<h3>" + feature.properties.ADMIN + "</h3>", {
            closeButton: false,
            offset: L.point(0, -20)
          });
          layer.on("mouseover", e => {
            let popup = e.target.getPopup();
            popup.setLatLng(e.latlng).openOn(this.map);
          });
          layer.on("mouseout", e => {
            e.target.closePopup();
          });
          layer.on("click", () => {
            this.setState({
              clickedCountry: feature.properties.SOV_A3,
              isOpen: true
            });
          });
        },
        style: style,
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
        }
      }).addTo(this.map);
    }
  }

  componentWillUnmount() {
    this.map.off();
    this.map.remove();
  }
  render() {
    return (
      <div className="mapview">
        {this.state.isOpen ? (
          <Card
            open={this.state.isOpen}
            onClose={this.toggleModal}
            key={returnId(this.state.clickedCountry)}
            country_code={this.state.clickedCountry}
          />
        ) : null}

        {this.props.loading ? <Loading /> : null}

        {this.props.loading ? <Loading /> : <Legend />}

        <Wrapper id="map" />
        {/*}
        <Legend /> */}
      </div>
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
  )(MapContainer)
);

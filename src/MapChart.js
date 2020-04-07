import React, { useState } from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import countryData from "./countries";
import CountryInfo from "./CountryInfo";

const dictionary = countryData[4];

const MapChart = ({ covidData }) => {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (countryData) => {
    let country = fetchCountry(countryData);
    if (country) {
      setCountry(country);
      setShow(true);
    }
  };

  const fetchCountry = (pointData) => {
    const data = pointData.points[0];
    const index = data.pointIndex;
    const location = pointData.points[0].data.locations[index];
    return location;
  };

  var data = [];
  if (covidData.data) {
    let countryNames = [];
    let confirmedList = [];
    covidData.data.result.map((country) => {
      let countryName = Object.keys(country)[0];
      countryNames.push(countryName);
      confirmedList.push(country[countryName].confirmed);
    });
    let scaledData = confirmedList.map((num) => Math.pow(num, 0.3));
    data = [
      {
        type: "scattergeo",
        mode: "markers",
        locations: countryNames,
        hoverinfo: "text, label",
        text: confirmedList,
        marker: {
          size: scaledData,
          color: "rgba(255,0,0,0.75)",
          sizeref: 1,
          line: {
            color: "black",
          },
        },
        name: "europe data",
      },
    ];
  }
  if (!covidData.data) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title id="contained-modal-title-vcenter w-100">
              {dictionary[country]}
            </Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <CountryInfo country={country} />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </div>

      <Plot
        data={data}
        layout={{
          modebar: {
            bgcolor: "rgba(255,255,255,0)",
          },
          geo: {
            scope: "World",
            resolution: "200",
            showland: true,
            landcolor: "#161616",
            showframe: false,
            bgcolor: "#161616",
            showcountries: true,
            showocean: true,
            // projection: {
            //   type: "mercator",
            // },
            // lonaxis: {
            //   range: [-160, 65],
            // },
            // lataxis: {
            //   range: [-40, 90],
            // },

            oceancolor: "#030217",
          },

          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
          autosize: true,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        onClick={(data) => handleShow(data)}
        config={{
          modeBarButtonsToRemove: [
            "toggleSpikelines",
            "autoScale2d",
            "hoverClosestCartesian",
            "hoverCompareCartesian",
            "select2d",
            "lasso2d",
            "hoverClosestGeo",
            "zoomInGeo",
            "zoomOutGeo",
          ],
          displaylogo: false,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    covidData: state.data,
  };
};

export default connect(mapStateToProps)(MapChart);

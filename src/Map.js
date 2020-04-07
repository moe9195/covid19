import React, { useState } from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import countryData from "./countries";
import CountryInfo from "./CountryInfo";

const dictionary = countryData[4];

const Map = ({ covidData }) => {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (countryData) => {
    setShow(true);
    let country = fetchCountry(countryData);
    if (country) {
      setCountry(country);
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
    let scaledData = confirmedList.map((num) => Math.pow(num, 0.4));
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

          colorscale: "Greens",
          colorbar: {
            title: "Some rate",
            ticksuffix: "%",
            showticksuffix: "last",
          },
          line: {
            color: "black",
          },
        },
        name: "europe data",
      },
    ];
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
          geo: {
            scope: "World",
            resolution: "100",
            showland: true,
            landcolor: "#161616",
            showcountries: true,
            showocean: true,
            lonaxis: {
              range: [-20, 65],
            },
            lataxis: {
              range: [8, 40],
            },

            oceancolor: "#030217",
          },

          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
          autosize: true,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        onClick={(data) => handleShow(data)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    covidData: state.data,
  };
};

export default connect(mapStateToProps)(Map);

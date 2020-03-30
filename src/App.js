import React, { Component } from "react";
import axios from "axios";
import PieChart from "./PieChart";
import { fetchCountryData } from "./redux/actions";
import { connect } from "react-redux";
import TimeGraph from "./TimeGraph";
import "./App.css";
import "./index.css";

const countries = [
  "DZA",
  "KWT",
  "BHR",
  "EGY",
  "IRQ",
  "JOR",
  "LBN",
  "LBY",
  "MAR",
  "OMN",
  "QAT",
  "SAU",
  "SYR",
  "TUN",
  "ARE",
  "YEM",
  "SDN"
];

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/"
});

class App extends Component {
  state = {
    countriesData: []
  };

  fetchCountriesData = async countries => {
    try {
      let dict = {};
      for (let i = 0; i < countries.length; i++) {
        let response = await instance.get(`country/${countries[i]}`);
        let countryData = response.data.result;

        dict[countries[i]] = countryData;
      }
      this.setState({ countriesData: dict });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    this.fetchCountriesData(countries);
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid text-center">
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-6">
              <div className="card-transparent border">
                <PieChart />
              </div>
            </div>

            <div className="col-6">
              <div className="card-transparent border">
                {" "}
                <TimeGraph />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    countryData: state.dataState.countryData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountryData: country => dispatch(fetchCountryData(country))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

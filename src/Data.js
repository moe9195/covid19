import React, { Component } from "react";
import axios from "axios";

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

class Data extends Component {
  state = {
    data: []
  };

  fetchData = async countries => {
    try {
      let dict = {};
      for (let i = 0; i < countries.length; i++) {
        let response = await instance.get(`country/${countries[i]}`);
        let countryData = response.data.result;

        dict[countries[i]] = countryData;
      }
      this.setState({ data: dict });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    this.fetchData(countries);
  };

  render() {
    return <div>{countries[0]}</div>;
  }
}

export default Data;

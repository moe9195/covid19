import React, { Component } from "react";
import countryData from "./countries";
import axios from "axios";

const allCountries = countryData[3];
const dictionary = countryData[4];

const instance1 = axios.create({
  baseURL: "https://covid19.mathdro.id/api/",
  loading: true
});

const instance2 = axios.create({
  baseURL: "https://covidapi.info/api/v1/global/latest",
  loading: true
});

class Counter extends Component {
  state = {
    data: null,
    dataCountries: null,
    loading1: true,
    loading2: true
  };

  fetchData = async () => {
    try {
      let response1 = await instance1.get(``);
      let data1 = response1.data;
      let response2 = await instance2.get(``);
      let data2 = response2.data;

      this.setState({ data: data1, dataCountries: data2, loading1: false });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    this.fetchData();
  };

  sortCountries = items => {
    let cleaned = items.map(country => {
      let countryName = Object.keys(country)[0];
      return {
        name: dictionary[countryName],
        confirmed: country[countryName].confirmed
        //  deaths: country[countryName].deaths,
        // recovered: country[countryName].recovered
      };
    });
    const confirmed = cleaned.sort((a, b) => b.confirmed - a.confirmed);
    // const deaths = cleaned.sort((a, b) => b.deaths - a.deaths);
    // const recovered = cleaned.sort((a, b) => b.recovered - a.recovered);
    return [confirmed]; //, deaths, recovered];
  };

  render() {
    let rows = <></>;
    if (!this.state.loading1) {
      const sortedData = this.sortCountries(this.state.dataCountries.result);
      console.log(sortedData);
      const confirmedData = sortedData[0];

      rows = confirmedData.map(country => (
        <tr>
          <td>
            &nbsp;&nbsp;&nbsp;
            <font style={{ color: "red" }}>{country.confirmed}</font>
            &nbsp;&nbsp;{country.name}
          </td>
        </tr>
      ));

      //   rows = this.state.dataCountries.result.map(country => {
      //     let countryName = Object.keys(country)[0];
      //     return (
      //       <tr>
      //         <td>
      //           &nbsp;&nbsp;&nbsp;
      //           <font style={{ color: "red" }}>
      //             {country[countryName].confirmed}
      //           </font>
      //           &nbsp;&nbsp;{countryName}
      //         </td>
      //       </tr>
      //     );
      //   });
    }

    return (
      <div className="container">
        <div className="card mx-auto counter">
          <h4>
            Confirmed <br></br>
          </h4>
          <h1 className="display-3" style={{ color: "red" }}>
            {this.state.loading1 ? "" : this.state.data.confirmed.value}
          </h1>
        </div>
        <div className="card mx-auto counter list my-custom-scrollbar">
          <table class="table-dark ">
            <tbody>{this.state.loading1 ? "" : rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Counter;

import React, { Component } from "react";
import countryData from "./countries";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loading from "./Loading";
import { connect } from "react-redux";
import { setData } from "./redux/actions";

const MENA = countryData[1];
const allCountries = countryData[3];
const dictionary = countryData[4];

const instance1 = axios.create({
  baseURL: "https://covid19.mathdro.id/api/",
  loading: true,
});

const instance2 = axios.create({
  baseURL: "https://covidapi.info/api/v1/global/latest",
  loading: true,
});

class Counter extends Component {
  state = {
    data: null,
    dataCountries: null,
    loading: true,
    region: true,
  };

  changeRegion = () => {
    this.setState({ region: !this.state.region });
  };

  fetchData = async () => {
    try {
      let response1 = await instance1.get(``);
      let data1 = response1.data;
      let response2 = await instance2.get(``);
      let data2 = response2.data;
      this.setState({ data: data1, dataCountries: data2, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    this.fetchData();
  };

  componentDidUpdate() {
    this.props.setData(this.state.dataCountries);
  }

  sortCountriesConfirmed = (items) => {
    let cleaned = items.map((country) => {
      let countryName = Object.keys(country)[0];
      return {
        name: dictionary[countryName],
        confirmed: country[countryName].confirmed,
      };
    });
    const confirmed = cleaned.sort((a, b) => b.confirmed - a.confirmed);

    return [confirmed];
  };

  sortCountriesRecovered = (items) => {
    let cleaned = items.map((country) => {
      let countryName = Object.keys(country)[0];
      return {
        name: dictionary[countryName],
        recovered: country[countryName].recovered,
      };
    });

    const recovered = cleaned.sort((a, b) => b.recovered - a.recovered);
    return [recovered];
  };

  sortCountriesDeaths = (items) => {
    let cleaned = items.map((country) => {
      let countryName = Object.keys(country)[0];
      return {
        name: dictionary[countryName],
        deaths: country[countryName].deaths,
      };
    });

    const deaths = cleaned.sort((a, b) => b.deaths - a.deaths);
    return [deaths];
  };

  render() {
    let confirmedRows = <></>;
    let deadRows = <></>;
    let recoveredRows = <></>;
    let confirmedRowsMENA = <></>;
    let deadRowsMENA = <></>;
    let recoveredRowsMENA = <></>;

    if (!this.state.loading) {
      const sortedDataConfirmed = this.sortCountriesConfirmed(
        this.state.dataCountries.result
      );
      const sortedDataDeaths = this.sortCountriesDeaths(
        this.state.dataCountries.result
      );
      const sortedDataRecovered = this.sortCountriesRecovered(
        this.state.dataCountries.result
      );
      const confirmedData = sortedDataConfirmed[0];
      const deathsData = sortedDataDeaths[0];
      const recoveredData = sortedDataRecovered[0];

      confirmedRows = confirmedData.map((country) => (
        <tr>
          <td>
            &nbsp;&nbsp;&nbsp;
            <font style={{ color: "red", fontSize: "17px" }}>
              {country.confirmed}
            </font>
            <font style={{ fontSize: "15px" }}>
              &nbsp;&nbsp;
              {country.name}
            </font>
          </td>
        </tr>
      ));
      deadRows = deathsData.map((country) => (
        <tr>
          <td>
            &nbsp;&nbsp;&nbsp;
            <font style={{ color: "red", fontSize: "17px" }}>
              {country.deaths}
            </font>
            <font style={{ fontSize: "15px" }}>
              &nbsp;&nbsp;
              {country.name}
            </font>
          </td>
        </tr>
      ));
      recoveredRows = recoveredData.map((country) => (
        <tr>
          <td>
            &nbsp;&nbsp;&nbsp;
            <font style={{ color: "red", fontSize: "17px" }}>
              {country.recovered}
            </font>
            <font style={{ fontSize: "15px" }}>
              &nbsp;&nbsp;
              {country.name}
            </font>
          </td>
        </tr>
      ));
      var menaConfirmed = 0,
        menaDeaths = 0,
        menaRecovered = 0;

      confirmedRowsMENA = confirmedData.map((country) => {
        if (MENA.indexOf(country.name) !== -1) {
          menaConfirmed += country.confirmed;
          return (
            <tr>
              <td>
                &nbsp;&nbsp;&nbsp;
                <font
                  style={{
                    color: "red",
                    fontSize: "17px",
                  }}
                >
                  {country.confirmed}
                </font>
                <font style={{ fontSize: "15px" }}>
                  &nbsp;&nbsp;
                  {country.name}
                </font>
              </td>
            </tr>
          );
        }
      });
      deadRowsMENA = deathsData.map((country) => {
        if (MENA.indexOf(country.name) !== -1) {
          menaDeaths += country.deaths;
          return (
            <tr>
              <td>
                &nbsp;&nbsp;&nbsp;
                <font
                  style={{
                    color: "red",
                    fontSize: "17px",
                  }}
                >
                  {country.deaths}
                </font>
                <font style={{ fontSize: "15px" }}>
                  &nbsp;&nbsp;
                  {country.name}
                </font>
              </td>
            </tr>
          );
        }
      });
      recoveredRowsMENA = recoveredData.map((country) => {
        if (MENA.indexOf(country.name) !== -1) {
          menaRecovered += country.recovered;
          return (
            <tr>
              <td>
                &nbsp;&nbsp;&nbsp;
                <font
                  style={{
                    color: "red",
                    fontSize: "17px",
                  }}
                >
                  {country.recovered}
                </font>
                <font style={{ fontSize: "15px" }}>
                  &nbsp;&nbsp;
                  {country.name}
                </font>
              </td>
            </tr>
          );
        }
      });
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        {" "}
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            onClick={() => this.changeRegion()}
            id="regionswitch"
          />
          <label class="custom-control-label" for="regionswitch">
            {this.state.region ? "Show Global Data" : "Show Arab World"}
          </label>
        </div>{" "}
        <br />
        <div className="container counter-nav">
          <Tabs defaultActiveKey="confirmed" id="counter">
            <Tab eventKey="confirmed" title="Confirmed">
              <div className="card mx-auto counter">
                <h4>
                  Confirmed <br></br>
                </h4>

                <h1 className="display-3" style={{ color: "red" }}>
                  {this.state.loading
                    ? ""
                    : this.state.region
                    ? menaConfirmed
                    : this.state.data.confirmed.value}
                </h1>
              </div>
              <div className="card mx-auto counter list my-custom-scrollbar">
                <table class="table-dark ">
                  <tbody>
                    {this.state.loading
                      ? ""
                      : this.state.region
                      ? confirmedRowsMENA
                      : confirmedRows}
                  </tbody>
                </table>
              </div>
              <br></br>
            </Tab>
            <Tab eventKey="deaths" title="Deaths">
              <div className="card mx-auto counter">
                <h4>
                  Deaths <br></br>
                </h4>
                <h1 className="display-3" style={{ color: "red" }}>
                  {this.state.loading
                    ? ""
                    : this.state.region
                    ? menaDeaths
                    : this.state.data.deaths.value}
                </h1>
              </div>
              <div className="card mx-auto counter list my-custom-scrollbar">
                <table class="table-dark ">
                  <tbody>
                    {" "}
                    {this.state.loading
                      ? ""
                      : this.state.region
                      ? deadRowsMENA
                      : deadRows}
                  </tbody>
                </table>
              </div>
              <br></br>
            </Tab>
            <Tab eventKey="recovered" title="Recovered">
              <div className="card mx-auto counter">
                <h4>
                  Recovered <br></br>
                </h4>
                <h1 className="display-3" style={{ color: "red" }}>
                  {this.state.loading
                    ? ""
                    : this.state.region
                    ? menaRecovered
                    : this.state.data.recovered.value}
                </h1>
              </div>
              <div className="card mx-auto counter list my-custom-scrollbar">
                <table class="table-dark ">
                  <tbody>
                    {" "}
                    {this.state.loading
                      ? ""
                      : this.state.region
                      ? recoveredRowsMENA
                      : recoveredRows}
                  </tbody>
                </table>
              </div>
              <br></br>
            </Tab>
          </Tabs>
          <br /> <br /> <br /> <br />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch(setData(data)),
  };
};

export default connect(null, mapDispatchToProps)(Counter);

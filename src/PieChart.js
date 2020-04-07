import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import colormap from "colormap";
import countryData from "./countries";
import Loading from "./Loading";

const instance = axios.create({
  baseURL: "https://covid19.mathdro.id/api/confirmed",
});
const countries = countryData[1];

class PieChart extends Component {
  state = {
    selector: "confirmed",
    data: null,
    loading: true,
  };

  fetchCountriesDataSummary = async () => {
    try {
      let response = await instance.get(``);
      let data = response.data;
      this.setState({ data: data, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    this.fetchCountriesDataSummary();
  };

  getCountry = () => {
    const countriesObj = this.state.data;
    if (countriesObj) {
      const result = countriesObj.filter((country) =>
        countries.includes(country.countryRegion)
      );
      return result;
    }
  };

  setUpChart = (countriesObj, selector) => {
    let values = [];
    let labels = [];
    for (let key in countriesObj) {
      values.push(countriesObj[key][selector]);
      labels.push(countriesObj[key]["countryRegion"]);
    }
    return [values, labels];
  };

  handleOnClick = (selected) => {
    this.setState({ selector: selected });
  };

  render() {
    const plotData = this.setUpChart(this.getCountry(), this.state.selector);

    const selectors = ["confirmed", "deaths", "recovered"];

    const buttons = selectors.map((selector) => (
      <button
        className={
          this.state.selector === selector
            ? "btn btn-outline-dark clicked"
            : "btn btn-outline-dark"
        }
        onClick={() => this.handleOnClick(selector)}
      >
        {selector}
      </button>
    ));

    const data = [
      {
        values: plotData[0],
        labels: plotData[1],
        type: "pie",
        textinfo: "label",
        titlefont: {
          size: 24,
          bold: true,
        },
        title:
          this.state.selector === "confirmed"
            ? "Total Confirmed"
            : this.state.selector === "deaths"
            ? "Total Deaths"
            : "Total Recoveries",
      },
    ];
    const colorway = colormap({
      colormap: "jet",
      nshades: countries.length,
      format: "hex",
      alpha: 1,
    });
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <br></br>
        {buttons}
        <br />
        <br />
        <Plot
          data={data}
          layout={{
            font: { color: "#99aab5", size: 14 },
            showlegend: false,

            colorway: colorway.reverse(),
            plot_bgcolor: "#161616",
            paper_bgcolor: "#161616",
            autosize: true,
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />{" "}
        <br /> <br /> <br /> <br />
      </div>
    );
  }
}

export default PieChart;

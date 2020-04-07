import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import colormap from "colormap";
import countryData from "./countries";
import Loading from "./Loading";

const countries = countryData[0];
const countriesFull = countryData[1];

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
});

class TimeGraph extends Component {
  state = {
    data: null,
    selector: "confirmed",
    logarithmic: false,
    loading: true,
  };

  fetchCountriesData = async (countries) => {
    try {
      let dict = {};
      for (let i = 0; i < countries.length; i++) {
        let response = await instance.get(`country/${countries[i]}`);
        let countryData = response.data.result;
        dict[countries[i]] = countryData;
      }
      this.setState({ data: dict, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  componentDidMount = async () => {
    this.fetchCountriesData(countries);
  };

  getCountries = () => {
    const countriesObj = this.state.data;
    if (countriesObj) {
      return countriesObj;
    }
  };

  formatDate = (date) => {
    if (date == 0) {
      return 0;
    }
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const mm = date.substring(5, 7);
    const dd = date.substring(8, 11);
    return monthNames[parseInt(mm) - 1] + " " + dd;
  };

  setupTicks = (arr, delta, date) => {
    const l = arr.length;
    delta = Math.floor(l / delta);
    let newArr = [];
    for (let i = 0; i < arr.length; i = i + delta) {
      if (date) {
        newArr.push(this.formatDate(arr[i]));
      } else {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  };

  handleOnClick = (selected) => {
    this.setState({ selector: selected });
  };
  handleSwitch = () => {
    this.setState({ logarithmic: !this.state.logarithmic });
  };

  render() {
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

    const data = this.getCountries();
    let plotDataY = [[[]], [[]], [[]]],
      plotDataX = [];
    for (let iso in data) {
      let countryObj = data[iso];
      var confirmedArr = [],
        deathsArr = [],
        recoveredArr = [],
        timeArr = [],
        counter = 0,
        dateArr = [];
      for (let date in countryObj) {
        var confirmed = countryObj[date].confirmed;
        var deaths = countryObj[date].deaths;
        var recovered = countryObj[date].recovered;
        confirmedArr.push(confirmed);
        deathsArr.push(deaths);
        recoveredArr.push(recovered);
        timeArr.push(counter);
        dateArr.push(date);
        counter++;
      }
      plotDataX.push(timeArr);
      plotDataY[0].push(confirmedArr);
      plotDataY[1].push(deathsArr);
      plotDataY[2].push(recoveredArr);
    }

    let scatterData = [];
    let select =
      this.state.selector === "confirmed"
        ? 0
        : this.state.selector === "deaths"
        ? 1
        : this.state.selector === "recovered"
        ? 2
        : 3;

    for (let i = 1; i < plotDataX.length + 1; i++) {
      var trace = {
        x: dateArr,
        y: plotDataY[select][i],
        type: "scatter",
        name: countriesFull[i - 1],
      };
      scatterData.push(trace);
    }

    // console.log("test");
    // var tickvals = [0],
    //   ticktxt = [0];
    // if (plotDataX.length > 1 && dateArr.length > 1) {
    //   tickvals = this.setupTicks(plotDataX[1], 25, false);
    //   ticktxt = this.setupTicks(dateArr, 25, true);
    // }

    let logType = this.state.logarithmic ? "log" : "null";
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
        {buttons}
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            onClick={() => this.handleSwitch()}
            id="switch"
          />
          <br />

          <label class="custom-control-label" for="switch">
            Logarithmic
          </label>
        </div>
        <div>
          <Plot
            data={scatterData}
            layout={{
              modebar: {
                bgcolor: "rgba(255,255,255,0)",
              },
              title: `Total ${this.capitalizeFirstLetter(this.state.selector)}`,
              font: { color: "#99aab5", size: 12 },
              xaxis: {
                title: "Date",
                nticks: 15,
              },
              yaxis: { title: "Number", type: logType },
              colorway: colorway,
              plot_bgcolor: "#161616",
              paper_bgcolor: "#161616",
              autosize: true,
              hovermode: "closest",
              legend: {
                bgcolor: "#343434",
                bordercolor: "#161616",
                borderwidth: 2,
                font: { size: 10 },
                x: 0,
                y: 1,
                autosize: true,
              },
            }}
            config={{
              modeBarButtonsToRemove: [
                "toggleSpikelines",
                "zoomIn2d",
                "zoomOut2d",
                "autoScale2d",
                "hoverClosestCartesian",
                "hoverCompareCartesian",
              ],
              displaylogo: false,
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            modeBarButtonsToRemove={["toImage"]}
          />
        </div>
        <br /> <br /> <br /> <br />
      </div>
    );
  }
}

export default TimeGraph;

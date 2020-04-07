import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import Plot from "react-plotly.js";
import countryData from "./countries";

const dictionary = countryData[4];

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
});

const CountryInfo = ({ country }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [X, setX] = useState([]);
  const [Y1, setY1] = useState([]);
  const [Y2, setY2] = useState([]);
  const [Y3, setY3] = useState([]);
  const [Y4, setY4] = useState([]);
  const [logarithmic, setLogarithmic] = useState(false);

  const handleSwitch = () => {
    setLogarithmic(!logarithmic);
  };

  const fetchData = async (country) => {
    try {
      let response = await instance.get(`country/${country}`);
      let countryData = response.data.result;
      if (loading) {
        setData(countryData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(country);
  });

  let logType = logarithmic ? "log" : "null";

  if (data && loading) {
    var Xtemp = [];
    var Y1temp = [],
      Y2temp = [],
      Y3temp = [],
      Y4temp = [];
    for (var key in data) {
      Xtemp.push(key);
      Y1temp.push(data[key].confirmed + 1);
      Y2temp.push(data[key].deaths + 1);
      Y3temp.push(data[key].recovered + 1);
    }
    if (Xtemp.length > 1) {
      setX(Xtemp);
      setY1(Y1temp);
      setY2(Y2temp);
      setY3(Y3temp);
      for (let i = 0; i < Xtemp.length; i++) {
        Y4temp.push(Y1temp[i + 1] - Y1temp[i]);
      }
      setY4(Y4temp);
      setLoading(false);
    }
  }

  if (!loading) {
    const trace1 = {
      x: X,
      y: Y1,
      type: "scatter",
      name: "Confirmed",
    };
    const trace2 = {
      x: X,
      y: Y2,
      type: "scatter",
      name: "Deaths",
    };
    const trace3 = {
      x: X,
      y: Y3,
      type: "scatter",
      name: "Recovered",
    };
    const bar = {
      x: X,
      y: Y4,
      type: "bar",
      name: "New Cases",
    };
    const plotData = [trace1, trace2, trace3, bar];

    return (
      <div>
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            onClick={() => handleSwitch()}
            id="logswitchmap"
          />

          <label class="custom-control-label" for="logswitchmap">
            Logarithmic
          </label>
        </div>
        <Plot
          data={plotData}
          layout={{
            title: `${dictionary[country]}`,
            font: { color: "#99aab5", size: 12 },
            xaxis: {
              title: "Date",
              nticks: 15,
            },
            yaxis: { title: "Number", type: logType },

            plot_bgcolor: "#161616",
            paper_bgcolor: "#161616",
            autosize: true,
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
};

export default CountryInfo;

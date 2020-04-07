import React from "react";
import PieChart from "./PieChart";
import TimeGraph from "./TimeGraph";
import Counter from "./Counter";
import Map from "./Map";

import "./App.css";
import "./index.css";

const App = () => (
  <div className="App">
    <PieChart />
    <TimeGraph />
    <Counter />
    <Map />
  </div>
);

export default App;

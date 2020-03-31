import React from "react";
import PieChart from "./PieChart";
import TimeGraph from "./TimeGraph";
import Counter from "./Counter";
import "./App.css";
import "./index.css";

const App = () => (
  <div className="App">
    <PieChart />
    <TimeGraph />
    <Counter />
  </div>
);

export default App;

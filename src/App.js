import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import NavBar from "./NavBar";
import PieChart from "./PieChart";
import TimeGraph from "./TimeGraph";
import Counter from "./Counter";
import MapChart from "./MapChart";
import Footer from "./Footer";

import "./App.css";
import "./index.css";

const App = () => (
  <div className="App">
    <NavBar />
    <Switch>
      <Route path="/mapchart" component={MapChart} />
      <Route path="/piechart" component={PieChart} />
      <Route path="/timegraph" component={TimeGraph} />
      <Route path="/" component={Counter} />
    </Switch>

    <Footer />
  </div>
);

export default App;

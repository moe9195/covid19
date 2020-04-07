import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/piechart/">
        <button className="btn btn-primary">piechart</button>
      </Link>
      <Link to="/timegraph/">
        <button className="btn btn-primary">timegraph</button>
      </Link>
      <Link to="/map/">
        <button className="btn btn-primary">map</button>
      </Link>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav id="mainNav">
    <br></br>

    <div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="/counter/">
          <button type="button" class="btn btn-outline-dark">
            Counter
          </button>
        </Link>
        <Link to="/piechart/">
          <button type="button" class="btn btn-outline-dark">
            Pie Chart
          </button>
        </Link>
        <Link to="/timegraph/">
          <button type="button" class="btn btn-outline-dark">
            Time Graph
          </button>
        </Link>
        <Link to="/mapchart/">
          <button type="button" class="btn btn-outline-dark">
            Map
          </button>
        </Link>
      </div>
    </div>
    <br></br>
  </nav>
);

export default NavBar;

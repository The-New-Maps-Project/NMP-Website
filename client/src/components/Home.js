import React from "react";
import Svg from "./Svg";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="jumbotron">
          <div>
            <h3>End Gerrymandering</h3>
            <p>
              Use a new algorithm to help redraw districts that are fair and
              non-partisan
            </p>
          </div>
          <Svg />
        </div>
        <div id="about"></div>
        <div id="home2">
          <div>
            <h2 class="inhome" id="resources-text">
              Resources:
            </h2>
            <ul id="resources" class="inhome">
              <li>
                <a href="/algorithm">The Algorithm {">>"}</a>
              </li>
              <li>
                <a href="/visualizer">Try the Visualizer {">>"}</a>
              </li>
              <li>
                <a href="/docs">View Documentation {">>"}</a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://csvconverter.thenewmapsproject.org/"
                >
                  Use the CSV Converter {">>"}
                </a>
              </li>
              <li>
                <a href="/datastore">View the Data Store{">>"}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Use all of Our Resources</h3>
            <p>
              Choose any of The New Map Project's tools to use. We offer a
              variety of resources to supplement our main redistricting
              algorithm, including an online visualizer that maps the districts
              returned by the algorithm.
            </p>
          </div>
        </div>
        <div id="file-format"></div>
      </div>
    );
  }
}

export default Home;

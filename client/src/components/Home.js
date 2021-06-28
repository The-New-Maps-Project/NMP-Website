import React from "react";
import Svg from "./Svg";
import maicon from "../images/maicon.png"

class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="jumbotron">
          <div>
            <h3>End Gerrymandering</h3>
            <p>
              Accessible and easy to use online tools to help visualize, analyze and draw
              congressional district maps.
            </p>
          </div>
          <Svg />
        </div>
        <div id="about"></div>
        <div id="home-mapanalysis">
          <h4>Looking for Map Analysis?</h4>
          <div className="second-row">
            <img src={maicon}></img>
            <div className="right">
              <p>A platform that allows you to create and edit your own maps using The New Maps Project's resources and analyze the results using statistics</p>
              <a className="ma-sb" target="_blank" href="https://maps.thenewmapsproject.org/">Click Here</a>
            </div>
          </div>
        </div>
        <div id="home2">
          <div>
            <h2 class="inhome" id="resources-text">
              Resources:
            </h2>
            <ul id="resources" class="inhome">
              <li>
                <a
                  target="_blank"
                  href="https://maps.thenewmapsproject.org/"
                >
                  Map Analysis {">>"}
                </a>
              </li>
              <li>
                <a href="/algorithm">Algorithm {">>"}</a>
              </li>
              <li>
                <a href="/visualizer">Try the Visualizer {">>"}</a>
              </li>
              <li>
                <a href="/docs">View Documentation {">>"}</a>
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
              variety of resources to help users visualize, experiment with,
              and analyze congressional map drawings. 
            </p>
          </div>
        </div>
        <div id="file-format"></div>
      </div>
    );
  }
}

export default Home;

import React from "react";

{
  /* <h3 style={{ fontSize: "28px" }}>Team</h3>
        <p id="team-paragraph" style={{ fontSize: "18px", lineHeight: "1.2" }}>
          Vincent Cai: Email at vincent.cai48@gmail.com{" "}
        </p>

        <br /> */
}

class Info extends React.Component {
  render() {
    return (
      <div id="info-page">
        <br />
        <h2 id="about" style={{ fontSize: "30px" }}>
          About
        </h2>
        <p id="about-paragraph" style={{ fontSize: "18px", lineHeight: "1.2" }}>
          The New Maps Project is a comprehensive set of tools to calculate and
          visualize redrawn US Congressional districts, with the purpose of
          fighting gerrymandering. We seek to draw maps in an objective way
          without partisan data or depending upon randomness. For this, an
          algorithm was developed to redraw districts of any state in the Union
          using data from every town in the state, optimizing for population
          distribution, compactness, and non-partisanship. On The New Maps
          Project Website, a variety of other tools are offered for making full
          use of the central algorithm, including a dynamic online district
          visualizer for algorithm results.
        </p>
        <br />

        <h3 id="resources-text" style={{ fontSize: "28px" }}>
          Resources
        </h3>
        <p
          id="resources-paragraph"
          style={{ fontSize: "18px", lineHeight: "1.2" }}
        >
          Below are a list of resources The New Maps project offers, including
          the map analysis tool, the Java algorithm, the online visualizer, 
          the documentation for the website, and more.{" "}
        </p>
        <br />
        <ul id="resources">
        <li>
            <a
              target="_blank"
              href="https://maps.thenewmapsproject.org/"
            >
              Map Analysis{">>"}
            </a>
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
              href="https://github.com/vincentcai48/The-New-Maps-Project-Algorithm"
            >
              Code for the Algorithm {">>"}
            </a>
          </li>
          <li>
            <a href="/datastore">View the Data Store {">>"}</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Info;

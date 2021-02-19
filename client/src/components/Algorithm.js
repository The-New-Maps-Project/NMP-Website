import React from "react";
import Calculate from "../algorithm/calculate";
import { Redirect } from "react-router-dom";

class Algorithm extends React.Component {
  constructor() {
    super();
    this.state = {
      isOutput: false,
      outputLines: [],
      stateName: "",
      districts: 0,
      threshold: 0.9,
      inputLines: [],
      redirect: null,
    };
  }

  changeState = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  changeInputLines = (e) => {
    this.setState({ inputLines: e.target.value.split("\n") });
  };

  runAlgorithm = () => {
    const c = new Calculate(
      this.state.inputLines,
      this.state.districts,
      this.state.threshold / 100,
      this.state.stateName
    );
    this.setState({ isOutput: true, outputLines: c.outputArray });
    window.location = "/algorithm#algorithm-output";
  };

  render() {
    return (
      <div>
        <h2 id="algorithm-h2">The Algorithm</h2>
        <p className="algorithm-description">
          This is the browser version of The New Maps Project Redistricting
          Algorithm, simply enter data into the fields and run the algorithm in
          the browser. If you want the original Java Algorithm to download and
          run and you local system,{" "}
          <a
            target="_blank"
            href="https://github.com/The-New-Maps-Project/NMP-Algorithm"
          >
            Click Here
          </a>
        </p>
        <p
          className="algorithm-description"
          style={{ fontSize: "1.5em", marginTop: "15vh" }}
        >
          Learn how to use and how it works in{" "}
          <a href="/docs" target="_blank">
            the documentation
          </a>
        </p>
        <form id="algorithm-input">
          <ul id="algorithm-input-headers">
            <li>
              <input
                type="text"
                id="algorithm-input-state"
                placeholder="State Name"
                name="stateName"
                onChange={this.changeState}
              ></input>
            </li>
            <li>
              <p>Number of Districts:</p>
              <input
                type="number"
                id="algorithm-input-districts"
                name="districts"
                onChange={this.changeState}
              ></input>
            </li>
            <li>
              <p>Threshold (0 to 100):</p>
              <input
                type="number"
                id="algorithm-input-threshold"
                name="threshold"
                onChange={this.changeState}
              ></input>
            </li>
          </ul>
          <textarea
            id="algorithm-input-lines"
            onChange={this.changeInputLines}
            placeholder="All Input Data Here"
          ></textarea>
          <button type="button" onClick={this.runAlgorithm}>
            Run Algorithm
          </button>
        </form>

        {this.state.isOutput && (
          <div id="algorithm-output">
            <div id="algorithm-output-headers">Result:</div>
            <ul id="output-content">
              <li>
                {this.state.stateName},{this.state.threshold / 100}
              </li>
              {this.state.outputLines.map((line) => {
                return <li>{line}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Algorithm;

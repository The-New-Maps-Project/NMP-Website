import React from "react";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <div id="docs">
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bolder",
              textDecoration: "underline",
            }}
          >
            Documentation
          </div>
          <h2>The Algorithm</h2>
          <p>
            An objective, yet flexible algorithm for computing redrawn
            districts.
          </p>
          <h3>How to Use</h3>
          <p>
            Full Documentation on running the algorithm yourself on the GitHub
            repository for the algorithm.{" "}
            <a
              target="_blank"
              href="https://github.com/The-New-Maps-Project/NMP-Algorithm"
            >
              Go to GitHub repository
            </a>
          </p>
          <h3>How It Works</h3>
          <p>
            <ol>
              <li>
                Input data collected from all towns/precincts of a state, each
                precinct with data on population and location. Set how many
                districts to divide into. See "Input file format" for details.
              </li>
              <li>
                Set a threshold, this is the percentage of the average district
                population for the algorithm to stop adding precincts to a
                district, See Step 6
              </li>
              <li>
                Find the most populous precinct not yet assigned to a district
              </li>
              <li>Add the closest precinct to it to form a district.</li>
              <li>
                Calculate the center of population for the district, and add the
                precinct closest to the center of population
              </li>
              <li>
                Repeat Step 5 until passed the threshold (percentage of average
                district size)
              </li>
              <li>
                Repeat steps 3-6 until the desired amount of districts are
                formed
              </li>
              <li>
                Add all remaining precincts to the district of it's closest town
              </li>
            </ol>
          </p>
          <h3>Input File Format</h3>
          <p>
            List of precincts in CSV format. <br />
            Each line: precinct,population,latitude,longitude <br />
            <br /> Example: Springfield,30000,41.23,-76.61
          </p>
          <h3 id="visual-format">Output File Format</h3>
          <p>
            List of precincts with their assigned districts in CSV format.{" "}
            <br />
            First Line: State, threshold (as a decimal) <br />
            Subsequest lines: precinct,district,latitude,longitude,population{" "}
            <br />
            <br /> Example:
            <br />
            Nebraska,0.92
            <br />
            Springfield,2,41.23,-76.61,30000
          </p>
          <h2>The New Maps Visualizer</h2>
          <p>
            Visualise Output files form the algorithms on dynamic Google Maps
          </p>
          <h3>Uploading a File</h3>
          <p>
            Click "Choose a File" on the visualizer top menu, and choose a file
            in the specific output file format (See above "Output file format")
          </p>
          <h3>Choose an Option</h3>
          <p>
            Files premade by The New Maps Project. Click on the hamburger icon
            on the visualizer menu to see the sample files to visualize. Simply
            click on one, and then visualize.
          </p>
          <h3>Using the visualizer</h3>
          <p>
            Scroll to bottom to see a list of precincts in each district. All
            color coded corresponding to the map (Note: for larger states with
            more districts, some may be color coded with the same color). Cna
            click on any precinct on the map to view the name of the town and
            the district assigned to it. Zoom in and out with the buttons in the
            bottom right corner and drag to the map to move around.
          </p>
          <h2>The New Maps Data Store</h2>
          <p>
            Files premade by The New Maps Project for anyone to test the
            algorithm or the visualizer. The New Maps Project is constantly
            updating and adding to the data store. The data store includes both
            input files into the algorithm and output files to view in the
            visualizer, some of which are visualizer options.
          </p>
          <h2>CSV Converter</h2>
          <p>
            This is a simple program used to convert table data into the
            specific CSV format to input into The New Maps Project Algorithm.
            Uses the Google Geocoding API. The full documentation is on the
            GitHub repository.{" "}
            <a
              target="_blank"
              href="https://github.com/The-New-Maps-Project/NMP-CSV-Converter"
            >
              Go to GitHub repository
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Docs;

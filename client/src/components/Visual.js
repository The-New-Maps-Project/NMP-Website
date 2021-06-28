import React from "react";
import Loading from "./Loading";
import { storage, firestore } from "../config/firebase";
import maicon from "../images/maicon.png"

class Visual extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentFile: null,
      stateLocations: {},
      visualizeOptions: {},
      markersArr: [], //just for purposes of deleting markers.
      map: null,
      districts: [], //starting at 1, NOT 0. the "dataObj" the readFile() function
      focusDistrict: -1,
      isLoading: false,
    };
  }

  //This downloads specified file from storage and sets currentFile;
  setCurrentFile = (filename) => {
    var pathReference = storage.ref("textfiles/" + filename + ".txt");
    var classThis = this; //have to declare this for "this.setState" to reference the correct "this" inside a function
    pathReference
      .getDownloadURL()
      .then(function (url) {
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
          classThis.setState({ currentFile: blob });
          document.getElementById("confirm-visualization").textContent =
            "Visualize " + filename + " >>>";
          document.getElementById("confirm-visualization").classList =
            "submit-real";
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element:
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("confirm-visualization").textContent =
          "Error, Select Another Option";
      });
  };

  componentDidMount() {
    /**THIS LOADS THE MAP */
    var script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      "AIzaSyB5dR_M5LglL5rK-2P5oA44lHduBUD8C2c" +
      "";
    console.log(process.env.REACT_APP_GOOGLE_APIKEY);
    script.defer = true;
    console.log(script.src);
    document.head.appendChild(script);
    script.addEventListener("load", () => {
      this.initMap();
    });

    document.getElementById("options").style.display = "none";

    //Get all the states' locations from firestore
    firestore
      .collection("stateLocations")
      .doc("efG8X0pxBLabJe5BbOpr")
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ stateLocations: doc.data() });
        } else {
          console.log("Nonexsistent Document!");
        }
      })
      .catch((err) => console.log(err));

    //Get all options for visualization from firestore
    firestore
      .collection("visualizeOptions")
      .doc("v38Eqbri3jvGCndvfsy5")
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ visualizeOptions: doc.data() });
        } else {
          console.log("Nonexistent Document");
        }
      })
      .catch((err) => console.log(err));
  }

  clearAllMarkers = () => {
    this.state.markersArr.forEach((e) => e.setMap(null));
    this.setState({ markersArr: [] });
  };

  selectedOption = (e) => {
    //could return the span as e.target if you click on it
    var fname = e.target.name || e.target.parentElement.name;
    document.getElementById("confirm-visualization").classList = "";
    window.location = "/visualizer#top-section";
    document.getElementById("confirm-visualization").textContent = "Loading...";
    this.setCurrentFile(fname);
  };

  initMap = function () {
    //create the map, default in Washington, DC;
    var center = { lat: 39.3433, lng: -95.4603 };
    var map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: center,
    });
    this.setState({ map: map });

    //VISUALIZES ALL THE DATA FOR THAT FILE, Generate Districts, Markers, and all other data from a file.
    //This file used is the variable "currentFile"
  };

  uploadOwnFile = async (e) => {
    await this.setState({ currentFile: e.target.files[0] });
    this.unfocusDistrict();
  };

  changeFocusDistrict = (e) => {
    const { name } = e.target;
    console.log(name, e.target);
    this.setState({ focusDistrict: Number(name) });
    this.readFile();
  };

  readFile = () => {
    this.setState({ isLoading: true });
    var fr = new FileReader();
    var classThis = this;
    fr.onload = function () {
      window.location = "/visualizer#title";
      //array of districts, each an object with a population, and an array of towns. STARTS AT INDEX 1, NOT 0.
      var dataObj = []; //no need to put in state, just for purposes of storing data in this function.
      classThis.clearAllMarkers();
      var colors = ["blue", "red", "green", "yellow", "purple", "orange"];
      var lines = fr.result.split("\n");
      var numLine = 0;
      lines.forEach((e) => {
        numLine++;
        if (numLine !== 1) {
          var elements = e.split(",");
          var townName = elements[0];
          var districtNo = Number(elements[1]);
          var lat = Number(elements[2]);
          var lng = Number(elements[3]);
          var pop = Number(elements[4]);
          if (!dataObj[districtNo]) {
            dataObj[districtNo] = {
              population: pop,
              towns: [townName],
              color: colors[districtNo % colors.length],
            };
          } else {
            dataObj[districtNo].population += pop;
            dataObj[districtNo].towns.push(townName);
          }

          //only put the marker if it is in the selected district or there is no selected district
          if (
            classThis.state.focusDistrict == -1 ||
            classThis.state.focusDistrict === districtNo
          ) {
            var s =
              "http://maps.google.com/mapfiles/ms/icons/" +
              colors[districtNo % colors.length] +
              "-dot.png";
            var marker = new window.google.maps.Marker({
              position: { lat: lat, lng: lng },
              map: classThis.state.map,
              icon: {
                url: s,
              },
              title: townName,
            });
            classThis.setState((prevState) => {
              var addOneMarker = prevState.markersArr;
              addOneMarker.push(marker);
              return { markersArr: addOneMarker };
            }); //add to array, so can delete later
            const contentString =
              "<div className='town-name'>" +
              townName +
              "<span> District " +
              districtNo +
              "</span>" +
              "</div>";
            const infowindow = new window.google.maps.InfoWindow({
              content: contentString,
            });
            marker.addListener("click", () => {
              infowindow.open(classThis.state.map, marker);
            });
          }
        } else {
          var elmts = e.split(",");
          document.getElementById("title").innerHTML =
            elmts[0] + " | Threshold: " + elmts[1];
          if (classThis.state.stateLocations[elmts[0]]) {
            classThis.state.map.setCenter({
              lat: classThis.state.stateLocations[elmts[0]].lat,
              lng: classThis.state.stateLocations[elmts[0]].lng,
            });
            classThis.state.map.setZoom(
              classThis.state.stateLocations[elmts[0]].zoom
            );
          }
        }
      });
      classThis.setState({ isLoading: false });

      //fills out district in state, so that the data can be filled out.
      classThis.setState({ districts: dataObj });
    };

    if (this.state.currentFile) fr.readAsText(this.state.currentFile);
  };

  openCloseOptions = () => {
    const optionsDOM = document.getElementById("options");
    if (optionsDOM.style.display == "none") {
      optionsDOM.style.display = "grid";
    } else {
      optionsDOM.style.display = "none";
    }
  };

  returnDistrictsListsDOM = () => {
    var districts = this.state.districts;
    var arr = [];
    for (var i = 1; i < districts.length; i++) {
      arr.push(
        <div id={"district" + i}>
          <button
            type="button"
            class="view-alone"
            onClick={this.changeFocusDistrict}
            name={i}
          >
            View Alone
          </button>
          <h3 style={{ backgroundColor: districts[i].color }}>
            {"District " + i + " | Population:" + districts[i].population}
          </h3>
          <ul class="towns-list">
            {districts[i].towns.map((e) => (
              <li>{e}</li>
            ))}
          </ul>
        </div>
      );
    }
    console.log(arr);
    return arr;
  };

  //This ALSO READS THE FILE!! Call this whenver you need to visualize ALL districts
  unfocusDistrict = () => {
    this.setState({ focusDistrict: -1 });
    this.readFile();
  };

  render() {
    return (
      <div id="visual-container">
        {this.state.isLoading && <Loading />}

        <h3 id="visualizer-title">
          The New Maps <span style={{ color: "lightcoral" }}>Visualizer</span>
        </h3>
        <p id="visualizer-description">Visualize examples of districts drawn by the New Maps Project Algorithm with different settings</p>
        <div className="second-row">
          <span>This is the legacy visualizer</span>
          <p className="ma-p"><img src={maicon}></img> Use the <a style ={{margin: "0px 5px"}}target="_blank" href="https://maps.thenewmapsproject.org">Map Analysis</a> tool to visualize disticts with more flexibility, interactivity, and data analysis.</p>
        </div>
        <section id="top-section">
          <div id="options-container">
            <div id="options-menu-buttons">
              <button
                id="confirm-visualization"
                onClick={() => this.unfocusDistrict()}
              >
                Select an option
              </button>
              <button
                type="button"
                id="open-close-options"
                onClick={this.openCloseOptions}
                class="fa fa-bars"
              ></button>
            </div>
            <p>
              *For demonstrative purposes only, input data is NOT accurate, only to show examples of district drawings.
            </p>
            <div id="options">
              {this.state.visualizeOptions.allOptions &&
                this.state.visualizeOptions.allOptions
                  .sort((a, b) => {
                    return a.state.localeCompare(b.state);
                  })
                  .map((e) => {
                    return (
                      <button
                        className="option"
                        type="button"
                        key={`${e.filename}-uniquekey`}
                        id={`${e.filename}-button`}
                        name={e.filename}
                        onClick={this.selectedOption}
                      >
                        {e.state}
                        {e.text ? <span>{e.text}</span> : ""}
                      </button>
                    );
                  })}
            </div>
          </div>

          <div id="or-text">OR</div>

          <div id="uploadfile-container">
            <div>Upload a File</div>
            <input type="file" id="fileupload" onChange={this.uploadOwnFile} />
            <p>
              *Files must be in a{" "}
              <a href="/docs#visual-format">specific format</a>
            </p>
          </div>
        </section>

        <h2 id="title"></h2>

        <div id="map"></div>

        <div id="focusedDistrict">
          {this.state.focusDistrict != -1 && (
            <div>
              <div>District {this.state.focusDistrict}</div>
              <button type="button" onClick={this.unfocusDistrict}>
                Unselect
              </button>
            </div>
          )}
        </div>
        <div id="data">{this.returnDistrictsListsDOM()}</div>
      </div>
    );
  }
}
// {
//   this.state.focusDistrict != -1 && (
//     <div>
//       District Selected: {this.state.focusDistrict}
//       <button onClick={this.unfocusDistrict()}>Unselect</button>
//     </div>
//   );
// }

export default Visual;

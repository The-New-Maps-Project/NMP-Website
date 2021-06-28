import React from "react";
import { firestore } from "../config/firebase";

class Datastore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithminput: [],
      algorithmoutput: [],
    };
  }
  componentDidMount() {
    //all the DOCS, then get all the fils per doc
    firestore
      .collection("datastore")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          this.setState({ [doc.id]: doc.data().allFiles });
        });
      });
  }

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
            The New Maps Data Store
          </div>
          <p>
            We are constantly updating the data store with more files, be sure
            to check back to see if what you wanted is here! Please read our
            disclaimers and note that data provided here is NOT up to date or
            accurate and is used for demonstrative purposes only.
          </p>
          <h2>Sample Input Files</h2>
          <p>Files to put into the algorithm</p>
          <div>
            <ul className="datastore-list">
              {this.state.algorithminput &&
                this.state.algorithminput.map((e) => {
                  return (
                    <li>
                      <a target="_blank" href={e.url}>
                        {e.text}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <h2>Sample Output Files</h2>
          <p>Files returned from the algorithm, to put into the Visualizer</p>
          <div>
            <ul className="datastore-list">
              {this.state.algorithmoutput &&
                this.state.algorithmoutput.map((e) => {
                  return (
                    <li>
                      <a target="_blank" href={e.url}>
                        {e.text}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Datastore;

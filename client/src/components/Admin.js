import React from "react";
import { auth, firestore, timestamp } from "../config/firebase";
import Loading from "./Loading";
import Login from "./Login";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: Boolean(auth.currentUser),
      missionMain: "",
      missionSecondary: "",
      missionIsChanged: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((a) => {
      if (a.uid) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });

    firestore
      .collection("settings")
      .doc("mission")
      .get()
      .then((doc) => {
        this.setState({
          missionMain: doc.data().main,
          missionSecondary: doc.data().secondary,
        });
      });
  }

  changeState = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, message: "", missionIsChanged: true });
  };

  addNews = () => {
    firestore
      .collection("news")
      .add({
        title: this.state.newsTitle,
        text: this.state.newsText,
        timestamp: timestamp.serverTimestamp(),
      })
      .then((doc) =>
        this.setState({
          message: 'Added "' + this.state.newsTitle + '" successfully!',
        })
      );
  };

  updateMissionText = () => {
    this.setState({ isLoading: true });
    firestore
      .collection("settings")
      .doc("mission")
      .update({
        main: this.state.missionMain,
        secondary: this.state.missionSecondary,
      })
      .then(() => {
        this.setState({ isLoading: false, missionIsChanged: false });
      }).catch(e=>{
        console.error(e);
      });
  };

  logout = () => {
    auth.signOut();
  };

  render() {
    if (!this.state.isLoggedIn) {
      return <Login />;
    }
    return (
      <div id="dev-console-container">
        <h2>Developer Console</h2>
        <div>
          <form id="add-news">
            <h3>Add News</h3>
            <input
              id="text-first"
              type="text"
              name="newsTitle"
              onChange={this.changeState}
              placeholder="Title"
            ></input>
            <textarea
              name="newsText"
              onChange={this.changeState}
              placeholder="Text"
            ></textarea>
            <div id="login-error-message">{this.state.message}</div>
            <button
              type="button"
              onClick={this.addNews}
              style={{ marginRight: "10px" }}
            >
              Add News
            </button>
            <button type="button" onClick={this.logout}>
              Logout
            </button>
          </form>

          <form className="cs">
            <h3>Mission Text</h3>
            <textarea
              className="ct"
              value={this.state.missionMain}
              onChange={this.changeState}
              name="missionMain"
              placeholder="Mission main text"
              style={{ fontWeight: "bolder" }}
            ></textarea>
            <textarea
              className="ct"
              onChange={this.changeState}
              name="missionSecondary"
              placeholder="Mission secondary text"
              value={this.state.missionSecondary}
            ></textarea>
            {this.state.missionIsChanged && (
              <button className="cb" onClick={this.updateMissionText}>
                Update Mission Text
              </button>
            )}
          </form>

          {this.state.isLoading && <Loading />}
        </div>
      </div>
    );
  }
}

export default Admin;

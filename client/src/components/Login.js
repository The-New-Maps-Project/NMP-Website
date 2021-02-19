import React from "react";
import { auth, firestore, timestamp } from "../config/firebase";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      email: "",
      password: "",
      message: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  changeState = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, message: "", missionIsChanged: true });
  };

  login = async () => {
    if (!this.state.email || !this.state.password) {
      this.setState({ message: "Please fill in all fields" });
    }
    await auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((err) => {
        console.error(err);
        this.setState({ message: err.message });
      });
    if (document.querySelector("#add-news #text-first")) {
      document.querySelector("#add-news #text-first").value = "";
    }
  };

  render() {
    if (this.state.isAuthenticated) {
      return <div></div>;
    } else {
      return (
        <div id="login-container">
          <form id="login-form">
            <h2>Developer Login</h2>
            <input
              type="text"
              name="email"
              onChange={this.changeState}
              placeholder="Email"
            ></input>
            <input
              type="password"
              name="password"
              onChange={this.changeState}
              placeholder="Password"
            ></input>
            <div id="login-error-message">{this.state.message}</div>
            <button type="button" onClick={this.login}>
              Submit
            </button>
          </form>
        </div>
      );
    }
  }
}

export default Login;

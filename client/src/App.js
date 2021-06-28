import React from "react";
import Visual from "./components/Visual";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import News from "./components/News";
import Docs from "./components/Docs";
import Info from "./components/Info";
import Datastore from "./components/Datastore";
import Gallery from "./components/Gallery";
import Admin from "./components/Admin";
import Algorithm from "./components/Algorithm";
import Mission from "./components/Mission";
import Team from "./components/Team";
import Privacy from "./legal/privacy";
import Disclaimers from "./legal/disclaimers";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/visualizer" component={Visual} />
          <Route path="/mission" component={Mission} />
          <Route path="/news" component={News} />
          <Route path="/docs" component={Docs} />
          <Route path="/datastore" component={Datastore} />
          <Route path="/info" component={Info} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/admin" component={Admin} />
          <Route path="/algorithm" component={Algorithm} />
          <Route path="/team" component={Team} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/disclaimers" component={Disclaimers} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

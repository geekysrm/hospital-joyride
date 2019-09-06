import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Doctor from "./components/Doctor/Doctor";
import Child from "./components/Child/Child";
import Parent from "./components/Parent/Parent";
import Landing from "./components/Landing/Landing";
import HelpChatbot from "./components/HelpChatbot/HelpChatbot";
import Navbar from "./components/Navbar/Navbar";
import TreatmentDetails from "./components/TreatmentDetails/TreatmentDetails";


import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar></Navbar>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/doctors" component={Doctor}></Route>
            <Route exact path="/child" component={Child}></Route>
            <Route exact path="/parent" component={Parent}></Route>
            <Route exact path="/chat" component={HelpChatbot}></Route>
            <Route
              exact
              path="/details/:id"
              render={props => <TreatmentDetails {...props} isAuthed={true} />}
            ></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

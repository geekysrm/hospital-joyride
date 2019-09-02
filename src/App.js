import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Doctor from "./components/Doctor/Doctor";
import Landing from "./components/Landing/Landing";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/doctors' component={Doctor}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

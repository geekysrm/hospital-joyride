import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Doctor from "./components/Doctor/Doctor";
import Child from "./components/Child/Child";
import Parent from "./components/Parent/Parent";
import Landing from "./components/Landing/Landing";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/doctors' component={Doctor}></Route>
          <Route exact path='/child' component={Child}></Route>
          <Route exact path='/parent' component={Parent}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

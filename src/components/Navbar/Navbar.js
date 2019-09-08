import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-light"
      >
        <Link className="navbar-brand" to="/">
          Hospital Adventure
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
}

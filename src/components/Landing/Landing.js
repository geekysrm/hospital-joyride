import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="row">
        <Link className="btn btn-link" to="/doctors">
          Doctor
        </Link>
        <Link className="btn btn-link" to="/child">
          Child
        </Link>
        <Link className="btn btn-link" to="/parent">
          Parent
        </Link>
      </div>
    );
  }
}

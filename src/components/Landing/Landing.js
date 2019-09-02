import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Link to='/doctors'>Doctor</Link>
        <Link to='/child'>Child</Link>
        <Link to='/parent'>Parent</Link>
      </div>
    );
  }
}

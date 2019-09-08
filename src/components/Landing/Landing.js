import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../actions";

import "./Landing.css";

import logoImage from "../../assets/HospitalJoyride.png";

class Landing extends Component {
  render() {
    if (this.props.current_user === "doctor") {
      this.props.history.push("/doctors");
    }
    if (this.props.current_user === "parent") {
      this.props.history.push("/parent");
    }
    return (
      <div className="landing-container">
        <div
          style={{ display: "flex", justifyContent: "center", padding: "30px" }}
        >
          <img
            src={logoImage}
            alt="logo"
            style={{ width: "250px", objectFit: "contain" }}
          />
        </div>

        <Link
          className="ui button landing-link mb-3"
          to="/doctors"
          onClick={() => this.props.login("doctor")}
        >
          Login as Doctor
        </Link>
        <Link
          className="ui button landing-link"
          to="/parent"
          onClick={() => this.props.login("parent")}
        >
          Login as Parent
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ current_user }) => ({
  current_user: current_user.current_user
});

export default connect(
  mapStateToProps,
  { login }
)(Landing);

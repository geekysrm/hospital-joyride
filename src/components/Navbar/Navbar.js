import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-light"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Link className="navbar-brand" to="/">
            Hospital Joyride
          </Link>
        </div>

        {this.props.location.pathname !== "/" && (
          <div>
            <a className="nav-link" href="/">
              Logout
            </a>
          </div>
        )}
      </nav>
    );
  }
}

export default withRouter(Navbar);

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  firestoreConnect,
  isLoaded,
  isEmpty,
  withFirestore
} from "react-redux-firebase";
import { getFirestore } from "redux-firestore";

import { Icon } from "semantic-ui-react";

import "./Parent.css";

class Parent extends Component {
  render() {
    return (
      <div>
        {this.props.parents ? (
          <div className="header">
            <div>
              <Icon name="user" circular size="big" />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <div className="header-name">{this.props.parents[0].name}</div>
              <div className="header-email">{this.props.parents[0].email}</div>
            </div>
          </div>
        ) : (
          <div>loading ...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parents: state.firestore.ordered.parents
});

export default withFirestore(
  compose(
    firestoreConnect([{ collection: "parents" }]), // or { collection: 'todos' }
    connect(mapStateToProps)
  )(Parent)
);

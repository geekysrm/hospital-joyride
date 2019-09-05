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

import { Icon, Placeholder, Segment, Button } from "semantic-ui-react";

import "./Parent.css";

class Parent extends Component {
  renderPastTreatments = () => {
    let past = [];
    const firestore = getFirestore();
    firestore
      .collection("treatments")
      .where("isCompleted", "==", false)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          past.push(doc.data());
        });
      });
  };

  render() {
    return (
      <div className="page-container">
        {this.props.parents ? (
          <>
            <div className="header">
              <div>
                <Icon name="user" circular size="big" />
              </div>
              <div style={{ paddingLeft: "30px" }}>
                <div className="header-name">{this.props.parents[0].name}</div>
                <div className="header-email">
                  {this.props.parents[0].email}
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "15px", paddingBottom: "50px" }}>
              <div className="heading">
                Your Children's Current Treatments -{" "}
              </div>
              <div style={{ paddingTop: "15px" }}>
                <Segment>
                  Your children don't have any current treatments
                </Segment>
              </div>
            </div>

            <div style={{ paddingTop: "15px", paddingBottom: "50px" }}>
              <div className="heading">Your Children's Past Treatments - </div>
              <div style={{ paddingTop: "15px" }}>
                {this.renderPastTreatments()}
              </div>
            </div>
            <div className="footer">
              <Button fluid primary>
                Get Help !!
              </Button>
            </div>
          </>
        ) : (
          <div style={{ padding: "20px" }}>
            <Placeholder>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </div>
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

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

import { Icon, Placeholder, Segment, Button, Message } from "semantic-ui-react";

import "./Parent.css";

class Parent extends Component {
  renderPastTreatments = () => {
    if (this.props.pastTreatments) {
      if (this.props.pastTreatments.length !== 0) {
        return this.props.pastTreatments.map(item => {
          return <Segment key={item.id}>{item.childName}'s treatment</Segment>;
        });
      } else {
        return (
          <Message info>Your childrens don't have any past treatments</Message>
        );
      }
    }
  };

  renderCurrentTreatments = () => {
    if (this.props.currentTreatments) {
      if (this.props.currentTreatments.length !== 0) {
        return this.props.currentTreatments.map(item => {
          return <Segment key={item.id}>{item.childName}'s treatment</Segment>;
        });
      } else {
        return (
          <Message info>
            Your childrens don't have any current treatments
          </Message>
        );
      }
    }
  };

  render() {
    return (
      <div className="page-container">
        {this.props.parents && this.props.parents.length !== 0 ? (
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

            <div style={{ paddingTop: "15px", paddingBottom: "10px" }}>
              <div className="heading">
                Your Childrens Current Treatments -{" "}
              </div>
              <div style={{ paddingTop: "15px" }}>
                {this.renderCurrentTreatments()}
              </div>
            </div>

            <div style={{ paddingTop: "15px", paddingBottom: "50px" }}>
              <div className="heading">Your Childrens Past Treatments - </div>
              <div style={{ paddingTop: "15px" }}>
                {this.renderPastTreatments()}
              </div>
            </div>
            <div className="footer">
              <Button
                fluid
                primary
                onClick={() => {
                  this.props.history.push("/chat");
                }}
              >
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
  parents: state.firestore.ordered.parents,
  pastTreatments: state.firestore.ordered.pastTreatments,
  currentTreatments: state.firestore.ordered.currentTreatments
});

export default withFirestore(
  compose(
    firestoreConnect([
      { collection: "parents" },
      {
        collection: "treatments",
        where: [["isCompleted", "==", false]],
        storeAs: "pastTreatments"
      },
      {
        collection: "treatments",
        where: [["isCompleted", "==", true]],
        storeAs: "currentTreatments"
      }
    ]),
    connect(mapStateToProps)
  )(Parent)
);

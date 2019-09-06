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
import { Link } from "react-router-dom";
import store from "../../store";

import { Icon, Placeholder, Segment, Button, Message } from "semantic-ui-react";

class TreatmentDetails extends Component {
  render() {
    return (
      <>
        {this.props.treatment ? (
          <>
            <div className="header">
              <div>
                <Icon name="user" circular size="big" />
              </div>
              <div style={{ paddingLeft: "30px", width: "100%" }}>
                <div className="header-name">
                  {this.props.treatment.childName}
                </div>
              </div>
            </div>
            <div className="body">
              <div className="body-tag">
                <div>Gender: </div>
                <div>Age: </div>
                <div>Blood Group:</div>
                <div>Doctor Assigned: </div>
                <div>Symptoms: </div>
                {this.props.treatment.symptoms.map((s, index) => {
                  if (index === 0) {
                    return null;
                  }
                  return <br key={index}></br>;
                })}
              </div>
              <div className="body-details">
                <div>{this.props.treatment.gender}</div>
                <div>{this.props.treatment.age}</div>
                <div>O+ve</div>
                <div>
                  {this.props.treatment.assignedDoc.length === 0
                    ? "We are searching!!"
                    : this.props.treatment.assignedDoc}
                </div>
                {this.props.treatment.symptoms.map((symptom, index) => (
                  <div key={index} style={{ textTransform: "capitalize" }}>
                    {symptom}
                  </div>
                ))}
              </div>
            </div>
          </>
				) : null}
				{this.props.doctor ? (
					<div className="body">
            <div className="body-tag">
              <div>Doctor Assigned: </div>
              <div>Phone Number: </div>
              <div>Email:</div>
              <div>Hospital: </div>
              <div>Qualification: </div>
              <div>Specialization: </div>
            </div>
            <div className="body-details">
              <div>{this.props.doctor.name}</div>
              <div>{this.props.doctor.phone}</div>
              <div>{this.props.doctor.email}</div>
              <div>{this.props.doctor.hospital}</div>
              <div>{this.props.doctor.qualification}</div>
							<div>{this.props.doctor.specialization}</div>
            </div>
					</div>
					) : null}				
      </>
    );
  }
}

const mapStateToProps = state => ({
  treatment: state.firestore.ordered.treatment
    ? state.firestore.ordered.treatment[0]
		: null,
	doctor: state.firestore.ordered.doctors ? state.firestore.ordered.doctors.filter(doctor => doctor.id === state.firestore.ordered.treatment.assignedDoc) : null
});

export default withFirestore(
  compose(
    firestoreConnect(props => [
      {
        collection: "treatments",
        doc: props.match.params.id,
        storeAs: "treatment"
			},
			{
				collection: "doctors",
				// doc: props.treatment ? props.treatment.assignedDoc : null,
				// storeAs: "doctor"
			}
    ]),
    connect(mapStateToProps)
  )(TreatmentDetails)
);

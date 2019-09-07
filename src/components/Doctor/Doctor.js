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
import { Icon, Message, Segment } from "semantic-ui-react";
import { Descriptions } from "antd";

class Doctor extends Component {
  render() {
    const { doctors, upcomingAppointments } = this.props;
    console.log(doctors);
    console.log(upcomingAppointments);
    return (
      <div>
        {doctors ? (
          doctors.map(doctor => (
            <div key={doctor.id}>
              <div className="header">
                <div>
                  <Icon name="user" circular size="big" />
                </div>
                <div style={{ paddingLeft: "30px" }}>
                  <div className="header-name">{doctor.name}</div>
                  <div className="header-email">{doctor.email}</div>
                </div>
              </div>
              <hr />
              <Descriptions title="Doctor Details">
                <Descriptions.Item label="Phone No.">
                  {doctor.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Hospital">
                  {doctor.hospital}
                </Descriptions.Item>
                <Descriptions.Item label="Qualification">
                  {doctor.qualification}
                </Descriptions.Item>
                <Descriptions.Item label="Specialization">
                  {doctor.specialization}
                </Descriptions.Item>
              </Descriptions>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
        <div style={{ paddingTop: "15px", paddingBottom: "10px" }}>
          <div className="heading">Your Upcoming Appointments - </div>
          {upcomingAppointments && upcomingAppointments.length ? (
            upcomingAppointments.map(appointment => {
              return (
                <Link
                  to={`/appointment-details/${appointment.id}`}
                  key={appointment.id}
                  style={{ textDecoration: "none", color: "#212529" }}
                >
                  <Segment style={{ marginBottom: "1rem" }}>
                    {appointment.childName}'s treatment
                  </Segment>
                </Link>
              );
            })
          ) : (
            <Message info>You do not have any upcoming appointments.</Message>
          )}
          <div style={{ paddingTop: "15px" }}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  doctors: state.firestore.ordered.doctors,
  upcomingAppointments: state.firestore.ordered.upcomingAppointments
});

export default withFirestore(
  compose(
    firestoreConnect([
      { collection: "doctors" },
      {
        collection: "treatments",
        where: [["isCompleted", "==", false]],
        storeAs: "upcomingAppointments"
      }
    ]),
    connect(mapStateToProps)
  )(Doctor)
);

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
import { Descriptions } from "antd";

class Doctor extends Component {
  render() {
    const { doctors } = this.props;
    console.log(doctors);
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
        {/* <div
          onClick={() => {
            const firestore = getFirestore();
            // firestore.collection("doctors").add(doctors[0]);
            // firestore
            //   .collection("doctors")
            //   .doc(doctors[0].id)
            //   .update({
            //     name: "sai",
            //     hospital: "amiya"
            //   });
            // firestore
            //   .collection("doctors")
            //   .doc(doctors[1].id)
            //   .delete();
          }}
        >
          Change !!
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  doctors: state.firestore.ordered.doctors
});

export default withFirestore(
  compose(
    firestoreConnect([{ collection: "doctors" }]), // or { collection: 'todos' }
    connect(mapStateToProps)
  )(Doctor)
);

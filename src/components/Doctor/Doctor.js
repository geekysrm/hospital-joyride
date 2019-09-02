import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

class Doctor extends Component {
  render() {
    const { doctors } = this.props;
    console.log(doctors);
    return (
      <div>
        {doctors ? (
          doctors.map(doctor => <div key={doctor.id}>{doctor.name}</div>)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default compose(
  firestoreConnect([{ collection: "doctors" }]), // or { collection: 'todos' }
  connect((state, props) => ({
    doctors: state.firestore.ordered.doctors
  }))
)(Doctor);

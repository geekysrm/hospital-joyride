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
        <div
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
        </div>
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

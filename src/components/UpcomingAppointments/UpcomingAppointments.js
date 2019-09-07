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

import {
  Icon,
  Placeholder,
  Segment,
  Button,
  Message,
  Form,
  Input
} from "semantic-ui-react";
import { Icon as AntIcon, Table } from "antd";

class UpcomingAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: null,
      disease: "",
      diet: "",
      numberOfMeds: 0,
      meds: []
    };
  }

  addNewMedicine = () => {
    this.setState({
      numberOfMeds: this.state.numberOfMeds + 1,
      meds: [
        ...this.state.meds,
        {
          name: "",
          number: "",
          timing: "",
          lunch: "",
          dinner: ""
        }
      ]
    });
  };

  componentDidUpdate() {
    if (!this.state.doctor) {
      if (this.props.treatment && this.props.treatment.assignedDoc) {
        this.getDoc(this.props.treatment.assignedDoc);
      }
    }
  }

  renderMedicineForm = () => {
    let medicines = [];
    for (let i = 0; i < this.state.numberOfMeds; i++) {
      medicines.push(
        <Form.Field inline>
          <Input
            placeholder="Medicine Name"
            name="name"
            value={this.state.meds[i] ? this.state.meds[i].name : null}
            onChange={e => {
              const newMeds = this.state.meds.map((med, index) => {
                if (index === i) {
                  return {
                    ...med,
                    name: e.target.value
                  };
                } else {
                  return med;
                }
              });

              this.setState({
                meds: newMeds
              });
            }}
          />
          <Input
            placeholder="Dosage per intake"
            name="number"
            value={this.state.meds[i] ? this.state.meds[i].number : null}
            onChange={e => {
              const newMeds = this.state.meds.map((med, index) => {
                if (index === i) {
                  return {
                    ...med,
                    number: e.target.value
                  };
                } else {
                  return med;
                }
              });

              this.setState({
                meds: newMeds
              });
            }}
          />
          <Input
            placeholder="Timing"
            name="timing"
            value={this.state.meds[i] ? this.state.meds[i].timing : null}
            onChange={e => {
              const newMeds = this.state.meds.map((med, index) => {
                if (index === i) {
                  return {
                    ...med,
                    timing: e.target.value
                  };
                } else {
                  return med;
                }
              });

              this.setState({
                meds: newMeds
              });
            }}
          />
          <Input
            placeholder="During Lunch?"
            name="lunch"
            value={this.state.meds[i] ? this.state.meds[i].lunch : null}
            onChange={e => {
              const newMeds = this.state.meds.map((med, index) => {
                if (index === i) {
                  return {
                    ...med,
                    lunch: e.target.value
                  };
                } else {
                  return med;
                }
              });

              this.setState({
                meds: newMeds
              });
            }}
          />
          <Input
            placeholder="During Dinner?"
            name="dinner"
            value={this.state.meds[i] ? this.state.meds[i].dinner : null}
            onChange={e => {
              const newMeds = this.state.meds.map((med, index) => {
                if (index === i) {
                  return {
                    ...med,
                    dinner: e.target.value
                  };
                } else {
                  return med;
                }
              });

              this.setState({
                meds: newMeds
              });
            }}
          />
        </Form.Field>
      );
    }
    return medicines;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getDoc = async id => {
    const firestore = getFirestore();
    let data = await firestore
      .collection("doctors")
      .doc(id)
      .get();
    data = data.data();

    this.setState({
      doctor: data
    });
  };
  render() {
    const columns = [
      {
        title: "Tablet Name",
        dataIndex: "tabletName",
        key: "tabletName"
      },
      {
        title: "Timing",
        dataIndex: "timing",
        key: "timing"
      },
      {
        title: "Lunch",
        dataIndex: "lunch",
        key: "lunch",
        render: x => {
          if (x === 0) {
            return (
              <AntIcon
                type="close-circle"
                theme="twoTone"
                twoToneColor="#eb2f96"
              />
            );
          } else {
            let a = [];
            for (let i = 1; i <= x; i++) {
              a.push(
                <AntIcon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                  key={i}
                />
              );
            }

            return a;
          }
        }
      },
      {
        title: "Dinner",
        dataIndex: "dinner",
        key: "dinner",
        render: x => {
          if (x === 0) {
            return (
              <AntIcon
                type="close-circle"
                theme="twoTone"
                twoToneColor="#eb2f96"
              />
            );
          } else {
            let a = [];
            for (let i = 1; i <= x; i++) {
              a.push(
                <AntIcon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                  key={i}
                />
              );
            }

            return a;
          }
        }
      }
    ];
    let dataSource;
    if (this.props.treatment && this.props.treatment.meds) {
      dataSource = this.props.treatment.meds.map((med, index) => {
        med = med.split(",");
        console.log(med);
        return {
          key: index + 1,
          tabletName: med[0],
          timing: med[2],
          lunch: med[3] === "true" ? med[1] : 0,
          dinner: med[4] === "true" ? med[1] : 0
        };
      });
    }
    return (
      <div style={{ marginBottom: "1rem" }}>
        {this.props.treatment ? (
          <div>
            <div className="header">
              <div>
                <Icon name="user" circular size="big" />
              </div>
              <div style={{ paddingLeft: "30px", width: "100%" }}>
                <div
                  className="header-name"
                  style={{ textTransform: "capitalize" }}
                >
                  {this.props.treatment.childName}
                </div>
              </div>
            </div>
            <div className="body">
              <div className="body-tag">
                <div>Gender: </div>
                <div>Age: </div>
                <div>Blood Group:</div>
                <div>Symptoms: </div>
                {this.props.treatment.symptoms.map((s, index) => {
                  if (index === 0) {
                    return null;
                  }
                  return <br key={index}></br>;
                })}
                {this.props.treatment.isDiagnosed ? <div>Disease: </div> : null}
              </div>
              <div className="body-details">
                <div>{this.props.treatment.gender}</div>
                <div>{this.props.treatment.age}</div>
                <div>{this.props.treatment.bloodGroup}</div>
                <div>
                  {this.props.treatment.assignedDoc
                    ? null
                    : "We are searching!!"}
                </div>
                {this.props.treatment.symptoms.map((symptom, index) => (
                  <div key={index} style={{ textTransform: "capitalize" }}>
                    {symptom}
                  </div>
                ))}
                {this.props.treatment.isDiagnosed ? (
                  <div>{this.props.treatment.disease}</div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {this.props.treatment && this.props.treatment.medicalHistory ? (
          <div className="body">
            <div className="body-desc">
              <div>Medical History: </div>
              <hr></hr>
              <div style={{ fontWeight: "500" }}>
                {this.props.treatment.medicalHistory}
              </div>
            </div>
          </div>
        ) : null}
        {this.props.treatment && this.props.treatment.ongoingTreatments ? (
          <div className="body">
            <div className="body-desc">
              <div>On Going Medical Condition: </div>
              <hr></hr>
              <div style={{ fontWeight: "500" }}>
                {this.props.treatment.ongoingTreatments}
              </div>
            </div>
          </div>
        ) : null}
        {this.props.treatment &&
        this.props.treatment.appointmentDate &&
        this.props.treatment.appointmentTime ? (
          <div className="body">
            <div className="body-tag">
              <div>Appointment Date: </div>
              <div>Appointment Time: </div>
            </div>
            <div className="body-details">
              <div>{this.props.treatment.appointmentDate}</div>
              <div>{this.props.treatment.appointmentTime}</div>
            </div>
          </div>
        ) : null}
        {this.props.treatment && this.props.treatment.isDiagnosed ? (
          <div className="body">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              style={{ width: "100%" }}
            />
          </div>
        ) : null}
        {this.props.treatment && this.props.treatment.diet ? (
          <div className="body">
            <div className="body-desc" style={{ width: "100%" }}>
              <div>Diet Description: </div>
              <hr></hr>
              <div style={{ fontWeight: "500" }}>
                {this.props.treatment.diet}
              </div>
            </div>
          </div>
        ) : null}

        <br />

        {(this.props.treatment && !this.props.treatment.disease) ||
        (this.props.treatment && !this.props.treatment.diet) ||
        (this.props.treatment && !this.props.treatment.meds) ||
        (this.props.treatment &&
          this.props.treatment.meds &&
          this.props.treatment.meds.length === 0) ? (
          <div className="header-name">Enter your diagnosis :</div>
        ) : null}

        <Form>
          {this.props.treatment && !this.props.treatment.disease && (
            <Form.Field>
              <label style={{ padding: "0.5rem", fontSize: "18px" }}>
                Disease
              </label>
              <Input
                placeholder="Disease"
                name="disease"
                value={this.state.disease}
                onChange={this.handleChange}
              />
            </Form.Field>
          )}
          {this.props.treatment && !this.props.treatment.diet && (
            <Form.Field>
              <label style={{ padding: "0.5rem", fontSize: "18px" }}>
                Preferred Diet
              </label>
              <Input
                placeholder="Diet"
                name="diet"
                value={this.state.diet}
                onChange={this.handleChange}
              />
            </Form.Field>
          )}

          {this.props.treatment && this.props.treatment.meds ? (
            this.props.treatment.meds.length === 0 && (
              <Form.Field>
                <label style={{ padding: "0.5rem", fontSize: "18px" }}>
                  Enter Medicines :
                  <Button
                    icon
                    onClick={this.addNewMedicine}
                    style={{ margin: "0.5rem" }}
                  >
                    <Icon name="add" />
                  </Button>
                </label>
              </Form.Field>
            )
          ) : (
            <Form.Field>
              <label style={{ padding: "0.5rem", fontSize: "18px" }}>
                Enter Medicines :
                <Button
                  icon
                  onClick={this.addNewMedicine}
                  style={{ margin: "0.5rem" }}
                >
                  <Icon name="add" />
                </Button>
              </label>
            </Form.Field>
          )}
          {<div>{this.renderMedicineForm()}</div>}

          {(this.props.treatment && !this.props.treatment.disease) ||
          (this.props.treatment && !this.props.treatment.diet) ||
          (this.props.treatment && !this.props.treatment.meds) ||
          (this.props.treatment &&
            this.props.treatment.meds &&
            this.props.treatment.meds.length === 0) ? (
            <div style={{ padding: "1rem" }}>
              <Button
                primary
                onClick={async () => {
                  const meds = this.state.meds.map(med => {
                    let str = `${med.name},${med.number},${med.timing},${med.lunch},${med.dinner}`;

                    return str;
                  });

                  const firestore = getFirestore();

                  await firestore
                    .collection("treatments")
                    .doc(this.props.match.params.id)
                    .update({
                      disease: this.state.disease,
                      diet: this.state.diet,
                      meds,
                      isDiagnosed: true
                    });

                  this.props.history.push("/doctors");
                }}
              >
                Submit
              </Button>
            </div>
          ) : null}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  treatment: state.firestore.ordered.treatment
    ? state.firestore.ordered.treatment[0]
    : null
});

export default withFirestore(
  compose(
    firestoreConnect(props => [
      {
        collection: "treatments",
        doc: props.match.params.id,
        storeAs: "treatment"
      }
    ]),
    connect(mapStateToProps)
  )(UpcomingAppointments)
);

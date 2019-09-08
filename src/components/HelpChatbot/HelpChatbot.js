import React, { Component } from "react";
import {connect} from 'react-redux';

import "./HelpChatbot.css";
import chatBotImage from "../../assets/chat-bot.jpg";

import { Image, Button, Icon } from "semantic-ui-react";
import { Badge, Select, DatePicker } from "antd";
import { Form, FormGroup, Label, Input } from "reactstrap";

import chat from "../../assets/chat";

import moment from "moment";

import { getFirestore } from "redux-firestore";

class HelpChatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatPointer: "start",
      childInfo: {
        childName: "",
        age: 0,
        gender: "",
        bloodGroup: "",
        symptoms: [],
        medicalHistory: "",
        ongoingTreatments: "",
        appointmentDate: "2019-09-20",
        appointmentTime: ""
      }
    };
  }

  renderInputs = inputs => {
    return inputs.map(input => {
      if (input.type === "select") {
        return (
          <div style={{ paddingBottom: "20px" }}>
            <Select
              mode="tags"
              style={{ width: "250px" }}
              tokenSeparators={[","]}
              value={this.state.childInfo.symptoms}
              onChange={value => {
                this.setState({
                  childInfo: {
                    ...this.state.childInfo,
                    symptoms: value
                  }
                });
              }}
            ></Select>
          </div>
        );
      } else if (input.type === "date") {
        return (
          <div style={{ paddingBottom: "20px" }}>
            <Label>{input.label}</Label>
            <DatePicker
              value={moment(this.state.childInfo.appointmentDate, "YYYY-MM-DD")}
              onChange={(date, dateString) => {
                this.setState({
                  childInfo: {
                    ...this.state.childInfo,
                    appointmentDate: dateString
                  }
                });
              }}
            />
          </div>
        );
      } else {
        return (
          <FormGroup>
            <Label>{input.label}</Label>
            <Input
              type={input.type}
              name={input.value}
              value={this.state.childInfo[input.value]}
              placeholder={input.placeholder && input.placeholder}
              onChange={event => {
                if (input.type === "number") {
                  this.setState({
                    childInfo: {
                      ...this.state.childInfo,
                      [event.target.name]: Number(event.target.value)
                    }
                  });
                } else {
                  this.setState({
                    childInfo: {
                      ...this.state.childInfo,
                      [event.target.name]: event.target.value
                    }
                  });
                }
              }}
            />
          </FormGroup>
        );
      }
    });
  };

  renderButtons = buttons => {
    if (buttons) {
      return buttons.map(button => {
        return (
          <Button
            primary
            onClick={async event => {
              event.preventDefault();

              if (button.label === "Book") {
                console.log(this.state);

                const firestore = getFirestore();

                await firestore.collection("treatments").add({
                  ...this.state.childInfo,
                  assignedDoc: "s9OhzTJRhZJtebPKZeUN",
                  isCompleted: false,
                  isDiagnosed: false,
                  storyPointer: "part_1_1"
                });

                this.setState({
                  chatPointer: button.value,
                  childInfo: {
                    childName: "",
                    age: 0,
                    gender: "",
                    bloodGroup: "",
                    symptoms: [],
                    medicalHistory: "",
                    ongoingTreatments: "",
                    appointmentDate: "2019-09-20",
                    appointmentTime: ""
                  }
                });
              } else {
                this.setState({
                  chatPointer: button.value
                });
              }
            }}
          >
            <Button.Content>
              {button.label} <span>&nbsp;&nbsp;</span>{" "}
              <Icon name={button.icon} />
            </Button.Content>
          </Button>
        );
      });
    } else {
      return null;
    }
  };

  renderMessages = () => {
    let msg = [];

    const fullMsg = chat[this.state.chatPointer];

    if (fullMsg.bot) {
      const x = (
        <div className="msg-bot" key={1024}>
          <div dangerouslySetInnerHTML={{ __html: fullMsg.bot.message }}></div>
          {fullMsg.bot.options && (
            <div>
              {fullMsg.bot.options.map((option, index) => {
                console.log(index);
                return (
                  <div className="option-bot" key={index}>
                    <div
                      onClick={() => {
                        if (option.value === "home") {
                          this.setState({
                            childInfo: {
                              childName: "",
                              age: 0,
                              gender: "",
                              bloodGroup: "",
                              symptoms: [],
                              medicalHistory: "",
                              ongoingTreatments: "",
                              appointmentDate: "2019-09-20",
                              appointmentTime: ""
                            }
                          });
                          this.props.history.push("/parent");
                        } else if (option.value === "start") {
                          this.setState({
                            chatPointer: "start",
                            childInfo: {
                              childName: "",
                              age: 0,
                              gender: "",
                              bloodGroup: "",
                              symptoms: [],
                              medicalHistory: "",
                              ongoingTreatments: "",
                              appointmentDate: "2019-09-20",
                              appointmentTime: ""
                            }
                          });
                        } else {
                          this.setState({
                            chatPointer: option.value
                          });
                        }
                      }}
                    >
                      {" "}
                      <Badge status="processing" />
                      {option.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );

      msg.push(x);
    }

    if (fullMsg.user) {
      const x = (
        <div className="msg-user" key={1023}>
          <div dangerouslySetInnerHTML={{ __html: fullMsg.user.message }}></div>

          {fullMsg.user.options && (
            <div>
              {fullMsg.user.options.map((option, index) => {
                return (
                  <div className="option" key={index}>
                    <div
                      onClick={() => {
                        if (option.value === "home") {
                          this.setState({
                            childInfo: {
                              childName: "",
                              age: 0,
                              gender: "",
                              bloodGroup: "",
                              symptoms: [],
                              medicalHistory: "",
                              ongoingTreatments: "",
                              appointmentDate: "2019-09-20",
                              appointmentTime: ""
                            }
                          });
                          this.props.history.push("/parent");
                        } else if (option.value === "start") {
                          this.setState({
                            chatPointer: "start",
                            childInfo: {
                              childName: "",
                              age: 0,
                              gender: "",
                              bloodGroup: "",
                              symptoms: [],
                              medicalHistory: "",
                              ongoingTreatments: "",
                              appointmentDate: "2019-09-20",
                              appointmentTime: ""
                            }
                          });
                        } else {
                          this.setState({
                            chatPointer: option.value
                          });
                        }
                      }}
                    >
                      {" "}
                      <Badge status="processing" />
                      {option.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {fullMsg.user.inputs && (
            <Form style={{ marginTop: "20px", width: "250px" }}>
              {this.renderInputs(fullMsg.user.inputs)}
              <div>{this.renderButtons(fullMsg.user.buttons)}</div>
            </Form>
          )}
        </div>
      );

      msg.push(x);
    }

    return msg;
  };

  render() {
    if (this.props.current_user !== "parent") {
      this.props.history.push("/");
    }
    return (
      <div className="page-container">
        <div className="chatbot-container">
          <div className="chat-header">
            <div>
              <Image
                style={{ width: "50px" }}
                src={chatBotImage}
                size="tiny"
                circular
              />
            </div>
            <div className="bot-name">HealthBot</div>
          </div>
          <div className="chat">{this.renderMessages()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user
})

export default connect(mapStateToProps, null)(HelpChatbot);
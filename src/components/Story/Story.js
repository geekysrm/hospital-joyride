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

import { Alert } from "antd";
import { Button, Icon } from "semantic-ui-react";
import { Button as AntButton, Radio, Icon as AntIcon } from "antd";

import "./Story.css";

import comic from "../../assets/comicbook";

import Speech from "speak-tts";
const speech = new Speech();
speech.init({
  volume: 1,
  lang: "en-GB",
  rate: 1,
  pitch: 1,
  voice: "Google UK English Male",
  splitSentences: true
});

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      storyPointer: null,
      mute: false
    };
  }

  componentDidUpdate() {
    if (
      this.props.treatment &&
      this.props.treatment.storyPointer &&
      !this.state.storyPointer
    ) {
      this.setState({
        storyPointer: this.props.treatment.storyPointer
      });
    }
  }

  renderComic = () => {
    const comicData = comic[this.state.storyPointer];

    if (comicData.action) {
      const firestore = getFirestore();

      firestore
        .collection("treatments")
        .doc(this.props.match.params.id)
        .update({
          storyPointer: comicData.action
        });
    }

    if (comicData.custom) {
      const newText = `${comicData.text.split("#")[0]}${this.props.treatment[
        comicData.text.split("#")[1]
      ].join(", ")}.`;

      if (!this.state.mute) {
        speech.speak({
          text: newText
        });
      }

      return (
        <div>
          <div className="comic-img-container">
            <div>
              <img
                className="comic-img"
                src={comicData.image}
                alt={`comic-img-${this.state.storyPointer}`}
              />
            </div>
            <div className="comic-text">{newText}</div>
          </div>
        </div>
      );
    } else {
      if (!this.state.mute) {
        speech.speak({
          text: comicData.text
        });
      }

      return (
        <div>
          <div className="comic-img-container">
            <img
              className="comic-img"
              src={comicData.image}
              alt={`comic-img-${this.state.storyPointer}`}
            />
          </div>
        </div>
      );
    }
  };

  renderButtons = () => {
    const comicData = comic[this.state.storyPointer];

    return (
      <div className="btn-container">
        <Button.Group size="large">
          <Button
            icon
            labelPosition="left"
            color="blue"
            disabled={!comicData.pointers.prev}
            onClick={() => {
              this.setState({
                storyPointer: comicData.pointers.prev
              });
            }}
          >
            Previous
            <Icon name="left arrow" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="blue"
            disabled={!comicData.pointers.next}
            onClick={() => {
              this.setState({
                storyPointer: comicData.pointers.next
              });
            }}
          >
            Next
            <Icon name="right arrow" />
          </Button>
        </Button.Group>
      </div>
    );
  };

  renderMute = () => {
    return (
      <div className="mute-icon-container">
        {this.state.mute ? (
          <Icon
            name="volume off"
            size="big"
            onClick={() => {
              this.setState({
                mute: false
              });
            }}
          />
        ) : (
          <Icon
            name="volume up"
            size="big"
            onClick={() => {
              this.setState({
                mute: true
              });
            }}
          />
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.showModal && (
          <div style={{ marginTop: "1rem" }}>
            <Alert
              message="Informational Notes"
              description={
                <div>
                  Please hand over you device to your child.
                  <br />
                  <br />
                  <div>
                    <Button
                      icon
                      labelPosition="right"
                      positive
                      onClick={() => {
                        this.setState({
                          showModal: false
                        });
                      }}
                    >
                      Start Adventure
                      <Icon name="right arrow" />
                    </Button>
                  </div>
                </div>
              }
              type="info"
              showIcon
            />
          </div>
        )}

        {!this.state.showModal && this.state.storyPointer && (
          <div className="story-container">
            {this.renderComic()}
            {this.renderMute()}
            {this.renderButtons()}
          </div>
        )}
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
  )(Story)
);

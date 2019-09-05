import React, { Component } from "react";

import "./HelpChatbot.css";

import { Image } from "semantic-ui-react";
import { Badge } from "antd";

import chat from "../../assets/chat";

class HelpChatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatPointer: "start"
    };
  }

  renderMessages = () => {
    let msg = [];

    const fullMsg = chat[this.state.chatPointer];

    if (fullMsg.bot) {
      const x = (
        <>
          <div className="msg-bot">
            <div
              dangerouslySetInnerHTML={{ __html: fullMsg.bot.message }}
            ></div>
            {fullMsg.bot.options && (
              <div>
                {fullMsg.bot.options.map(option => {
                  return (
                    <div className="option-bot">
                      <div
                        onClick={() => {
                          this.setState({
                            chatPointer: option.value
                          });
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
        </>
      );

      msg.push(x);
    }

    if (fullMsg.user) {
      const x = (
        <>
          <div className="msg-user">
            <div
              dangerouslySetInnerHTML={{ __html: fullMsg.user.message }}
            ></div>
            {fullMsg.user.options && (
              <div>
                {fullMsg.user.options.map(option => {
                  return (
                    <div className="option">
                      <div
                        onClick={() => {
                          this.setState({
                            chatPointer: option.value
                          });
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
        </>
      );

      msg.push(x);
    }

    return msg;
  };

  render() {
    return (
      <div>
        <div className="chatbot-container">
          <div className="chat-header">
            <div>
              <Image
                style={{ width: "50px" }}
                src="https://i.pinimg.com/736x/3a/87/9f/3a879f07d46ec94c28e7ca9e6f111790.jpg"
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

export default HelpChatbot;

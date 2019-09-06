import React, { Component } from "react";

import "./HelpChatbot.css";
import chatBotImage from "../../assets/chat-bot.jpg";

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
                {fullMsg.bot.options.map((option, index) => {
                  return (
                    <div className="option-bot" key={index}>
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
                {fullMsg.user.options.map((option, index) => {
                  return (
                    <div className="option" key={index + 99}>
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

export default HelpChatbot;

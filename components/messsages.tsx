import React from "react";
//import ScrollToBottom from "react-scroll-to-bottom";
interface messageConfig {
  user1: string;
  message: string;
}

function messsages(props: { messages: messageConfig }) {
  return (
    <div>
      <div>{messsages}</div>
    </div>
  );
}

export default messsages;

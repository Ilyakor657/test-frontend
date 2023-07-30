import React from 'react';

const MessageAPI = (props) => {
  return (
    <div className={`message-api ${props.messageAPI[0]}`}>
      <span>{props.messageAPI[1]}</span>
    </div> 
  )
};

export default MessageAPI;
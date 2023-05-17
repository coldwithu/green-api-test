import React from 'react';
import './Message.css'

function Message({sender, text}) {

    return(
        <div className={`message ${sender ? 'left' : 'right'}`}>
            {text}
        </div>
    );
}

export default Message;

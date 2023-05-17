import React, {useState} from 'react';
import sendSVG from '../../assets/send.svg';
import './Main.css'
import Message from "../Message";

function Main({user}) {
    const [number, setNumber] = useState('');
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [deleteId, setDeleteId] = useState(0);


    const sendUrl = `https://api.green-api.com/waInstance${user.idInstance}/SendMessage/${user.apiTokenInstance}`;
    const receiveUrl = `https://api.green-api.com/waInstance${user.idInstance}/ReceiveNotification/${user.apiTokenInstance}`;
    const deleteUrl = `https://api.green-api.com/waInstance${user.idInstance}/DeleteNotification/${user.apiTokenInstance}`;

    const onInputNumber = (event) => {
        setNumber(event.target.value);
    }

    const onInputMessage = (event) => {
        setMessage(event.target.value);
    }
    const handleClick = () => {
        setReceiver(number);
        setNumber('');
    }

    const sendMessage = () => {
        let data = {
            chatId: `${receiver}@c.us`,
            message
        }
        fetch(sendUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())

        let newMessage = {
            sender: 0,
            text: message
        }
        setMessages([...messages, newMessage]);
        setMessage('');
    }

    const receiveMessage = () => {
        let newMessage = {};
        fetch(receiveUrl)
            .then(response => response.json())
            .then(result => {
                if(result){
                    newMessage.text = result.body.messageData?.textMessageData?.textMessage;
                    newMessage.sender = 1;
                    setMessages([...messages, newMessage]);
                    setDeleteId(result.receiptId)
                }
            })

        fetch(`${deleteUrl}/${deleteId}`, {method: 'DELETE'})
            .then(response => response.json())

    }


    const updateChat = () => {
        receiveMessage();
    }
    return(
        <div className='main'>
            <div className='left-side'>
                <div className='user'>
                    {`IdInstance: ${user.idInstance}`}
                </div>
                <div className='content'>
                    <input
                        className='form__input number'
                        type="text"
                        placeholder='Номер пользователя'
                        value={number}
                        onChange={onInputNumber}
                    />
                    <button
                        className='form__button add-chat'
                        onClick={handleClick}
                    >
                        Создать чат
                    </button>
                </div>

            </div>
            <div className='chat'>
                {
                    receiver ? (
                        <>
                            <div className='chat__info'>
                                {receiver ? `Чат с пользователем ${receiver}` : 'Чат'}
                                <button onClick={updateChat}>Обновить чат</button>
                            </div>
                            <div className='chat__messages'>
                                {
                                    messages.map((item, index) => (
                                        <Message
                                            key={index}
                                            sender={item.sender}
                                            text={item.text}
                                        />
                                    ))
                                }
                            </div>
                            <div className='chat__line'>
                                <input
                                    type='text'
                                    placeholder='Введите сообщение'
                                    onChange={onInputMessage}
                                    value={message ? message : ''}
                                />
                                <button
                                    disabled={!message}
                                    onClick={sendMessage}
                                >
                                    <img src={sendSVG} alt='send'/>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='placeholder'>
                            Введите номер получателя
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Main;

import React, {useState} from 'react';
import './Auth.css'

function Auth({onAuth}) {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    const handleClick = () => {
        if(idInstance === '' || apiTokenInstance === ''){
            alert('Введите данные!');
        }else{
            let data = {
                idInstance,
                apiTokenInstance
            }
            onAuth(data);
        }

    }
    const onInputIdInstance = (event) => {
        setIdInstance(event.target.value);
    }
    const onInputApiTokenInstance = (event) => {
        setApiTokenInstance(event.target.value);
    }
    return (
        <div className='auth'>
            <h1 className='welcome'>
                Авторизация
            </h1>
            <div className='form'>
                <input
                    className='form__input'
                    type="text"
                    placeholder='idInstance'
                    value={idInstance}
                    onChange={onInputIdInstance}
                />
                <input
                    className='form__input'
                    type="text"
                    placeholder='apiTokenInstance'
                    id='apiTokenInstance'
                    value={apiTokenInstance}
                    onChange={onInputApiTokenInstance}
                />
                <button className='form__button' onClick={handleClick}>Войти</button>
            </div>
        </div>
    );
}

export default Auth;

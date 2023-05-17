import React, {useState} from 'react';
import './App.css';
import Auth from "./Components/Auth";
import Main from "./Components/Main";

function App() {
    const [user, setUser] = useState();

    return (
      <div className="App">
          {
              !user ? <Auth onAuth={setUser}/> : <Main user={user}/>
          }
      </div>
    );
}

export default App;

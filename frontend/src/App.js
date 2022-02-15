import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [username, setName] = useState("")
  const [birthday,setBirthday] = useState("")

  const submitBirthday = () =>{
    //console.log(username + birthday)
    Axios.post('http://localhost:9000/add', {username: username, birthday: birthday})
         .then(() => {
            alert('Birthday added to database successfully!!')
        })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>USERS</h1>
      </header>
      <div className="App-fields">
        <label>Name </label>
        <input type="text" name="username" onChange={(event) => {setName(event.target.value)}}/> <br/>
        <label>Birthday </label>
        <input type="text" name="birthday" onChange={(event) => {setBirthday(event.target.value)}}/> <br/>
        <button onClick={submitBirthday}>Submit</button>
      </div>
    </div>
  );
}

export default App;

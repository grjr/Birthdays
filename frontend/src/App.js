import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [username, setName] = useState("")
  const [birthday,setBirthday] = useState("")

  const [birthdayList, setBirthdayList] = useState([])

  const submitBirthday = () =>{
    //console.log(username + birthday)
    Axios.post('http://localhost:9000/add', {username: username, birthday: birthday})
         .then(() => {
            alert('Birthday added to database successfully!!')
        })
  }

  const showAll = () =>{
    Axios.get('http://localhost:9000/showall')
         .then((response) => {
           console.log(response)
           setBirthdayList(response.data)
         })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>BIRTHDAYS</h1>
      </header>
      <div className="App-fields">
        <label><b> Name</b></label>
        <input type="text" name="username" onChange={(event) => {setName(event.target.value)}}/> <br/>
        <label><b>Birthday</b></label>
        <input type="text" name="birthday" onChange={(event) => {setBirthday(event.target.value)}}/> <br/>
        <div className="My-btns">
          <button onClick={submitBirthday}><b>ADD</b></button>
          <button onClick={showAll}><b>SHOW ALL</b></button>
          <button onClick={ () => { {setBirthdayList([])} } }><b>CLEAR</b></button>
        </div>
        <div className="My-list">
          {birthdayList.map( (val,key) => {
            return <div>{val.name} {val.birthday}</div> //name is the column name in the database
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

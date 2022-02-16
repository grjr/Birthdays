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
           var mydate=response.data[0].birthday
           var currYear = new Date().getFullYear()
           console.log(new Date(mydate).toLocaleDateString());
           console.log(new Date(mydate).getFullYear());
           console.log(currYear);
    var birthYear = new Date(mydate).getFullYear()
    const age = currYear-birthYear
    console.log(age)
           setBirthdayList(response.data)
         })
  }

  const clearAll = () => {
    {setBirthdayList([])}
  }

  // const age = () => {
  //   var currYear = new Date().getFullYear()
  //   var birthYear = new Date(val.birthday).getFullYear()
  //   const age = currDate-birthYear
  //   console.log(currYear + birthYear + age)
  // }

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
          <button onClick={submitBirthday}>ADD</button>
          <button onClick={showAll}>SHOW ALL</button>
          <button onClick={clearAll}>CLEAR</button>
        </div>
        <div className="My-list">
          {birthdayList.map( (val,key) => {
            return <div className="List-items">
                <div>{val.name} </div>
                <div>({new Date(val.birthday).toLocaleDateString()})</div>
                <div>Age {new Date().getFullYear() - new Date(val.birthday).getFullYear()}</div>
            </div> //name is the column name in the database
          })}
        </div>
      </div>
    </div>
  );
}

export default App;



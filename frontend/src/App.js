import React, {useEffect, useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [username, setName] = useState("")
  const [birthday,setBirthday] = useState("")

  const [birthdayList, setBirthdayList] = useState([])
  const [todayList, setTodayList] = useState([])
  const [upcomingList, setUpcomingList] = useState([])

  // const sendBdayNoti = () => {
  //   console.log('Button clicked!')
  //   Axios.post('http://localhost:9000/send')
  //        .then(() => {
  //          console.log('Email sent!')
  //        })
  // }


  //Using UseEffect hook with blank callback to stop rendering multiple times something is loaded
  const sendBdayNoti = useEffect( () => {
    console.log('Button clicked!')
    Axios.post('http://localhost:9000/send')
         .then(() => {
           console.log('Email sent!')
         })
  }, []);

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
          //  console.log(response)
           var mydate=response.data[0].birthday
           var currYear = new Date().getFullYear()
          //  console.log(new Date(mydate).toLocaleDateString());
          //  console.log(new Date(mydate).getFullYear());
          //  console.log(currYear);
           var birthYear = new Date(mydate).getFullYear()
           const age = currYear-birthYear
          //  console.log(age)
           setBirthdayList(response.data)
         })
  }

  const clearAll = () => {
    {setBirthdayList([])}
  }

  
  function todaysBirthdays(){
    Axios.get('http://localhost:9000/today')
        .then((response) => {
          setTodayList(response.data)
          // console.log(response.data)
        })
  }

  function upcomingBirthdays(){
    // var today = new Date()
    // var currMonth = new Date().getMonth();
    // var currDate = new Date().getDate();
    // var oneWeekAfter= new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
    // var oneWeekMonth = oneWeekAfter.getMonth()
    // var oneWeekDate = oneWeekAfter.getDate()
    // console.log(`${currDate} and ${currMonth} and ${oneWeekAfter} and ${oneWeekMonth} and ${oneWeekDate}`)
      Axios.get('http://localhost:9000/upcoming')
        .then((response) => {
          setUpcomingList(response.data)
        })
  }

  return (
    <div className='App'>


      <header className='App-header'>
        <h1>BIRTHDAYS</h1>
      </header>

      <div className='Body-section'>
        <div className='App-fields'>

          <div className='Input-fields'>
            <label><b>  Name</b></label>
            <input type="text" name="username" onChange={(event) => {setName(event.target.value)}}/> <br/>
            <label><b>Birthday</b></label>
            <input type="text" name="birthday" onChange={(event) => {setBirthday(event.target.value)}}/> <br/>
          </div>
            
          <div className='My-btns'>
            <button onClick={submitBirthday}>ADD</button>
            <button onClick={showAll}>SHOW ALL</button>
            <button onClick={clearAll}>CLEAR</button>
            {/* <button onClick={sendBdayNoti}>EMAIL</button> */}
          </div>

          <div className='My-list'>
            {birthdayList.map( (val,key) => {
              return <div className='List-items'>
                <div>{val.name} </div>
                <div>({new Date(val.birthday).toLocaleDateString()})</div>
                <div>Age {new Date().getFullYear() - new Date(val.birthday).getFullYear()}</div>
              </div> 
            })}
          </div>
        </div>

        <div className='Right-tab'>
          <h2>Today's birthdays!!</h2>
          {sendBdayNoti}
          <div className= 'Upcoming-list'>
            {todaysBirthdays()}
            {todayList.map( (val,key) => {
              return <div className='Upcoming-list-items'>
                <div>{val.name} </div>
                {/* {<div>({new Date(val.birthday).toLocaleString('en-us',{day:'numeric',month:'short'})},</div> } */}
                <div> (Age {new Date().getFullYear() - new Date(val.birthday).getFullYear()})</div>
              </div> 
            })}
          </div>
          <h2>Upcoming this month!!</h2>
          <div className= 'Upcoming-list'>
            {upcomingBirthdays()}
            {upcomingList.map( (val,key) => {
              return <div className='Upcoming-list-items'>
                <div>{val.name} </div>
                <div>({new Date(val.birthday).toLocaleString('en-us',{day:'numeric',month:'short'})},</div>
                <div> Age {new Date().getFullYear() - new Date(val.birthday).getFullYear()})</div>
              </div> 
            })}
          </div>
        </div>
    </div>
  </div>
  );
}

export default App;



const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const {urlencoded} = require('body-parser')
require('dotenv').config()
const sendgridMail= require('@sendgrid/mail')
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

const port = 9000
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Root9999!",
    database: "myusers"
});

app.use(cors())
app.use(express.json())

app.post('/send', (req, res) => {
    const todayAgainStmt = 'select * from users where extract(MONTH FROM birthday)=extract(MONTH FROM curdate()) and extract(DAY FROM birthday)=extract(DAY FROM curdate())'
    db.query(todayAgainStmt, (err, result) => {
        console.log(result)
        const len= result.length
        let bdayPerson = " "
        if(len==1)
            bdayPerson=result[0].name
        else{ 
            for(let i=0; i<len;i++)
                if(i!=len-1)
                    bdayPerson+= result[i].name + ' and '
                else
                    bdayPerson+= result[i].name
            console.log(bdayPerson)
        }
        if(err) throw err
        else{
            sendMail("Today's birthdays!!", `Celebrating birthday today: ${bdayPerson}`)
            res.send("Email sent successfully")
        }
    })
    function sendMail(subject,body){
        const email = {
            to: 'canebot785@sueshaw.com',
            from: 'greety89@gmail.com',
            subject: subject,
            text: body,
            body: body
        }
        sendgridMail.send(email);
    }
})


app.post('/add', (req,res) => {
    console.log(req.body)
    const username= req.body.username;
    const birthday = req.body.birthday;
    const sqlInsertStmt = 'insert into users (name,birthday) values (?,?)';
    db.query(sqlInsertStmt, [username,birthday], (err, result) =>{
        console.log(result);
        if(err) //throw err
        console.log(err);
        res.send("Successfully added birthday!")
    })
})

app.get('/showall', (req, res) => {
    console.log(req)
    const selectAllSqlStmt = 'select * from users'
    db.query(selectAllSqlStmt, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.get('/today', (req,res) => {
    const todayStmt = 'select * from users where extract(MONTH FROM birthday)=extract(MONTH FROM curdate()) and extract(DAY FROM birthday)=extract(DAY FROM curdate())'
    db.query(todayStmt, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.get('/upcoming', (req,res) => {
    const upcomingStmt = 'select * from users where  extract(MONTH FROM birthday)=extract(MONTH FROM curdate()) and extract(DAY FROM birthday) > extract(DAY FROM curdate())'
    db.query(upcomingStmt, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})



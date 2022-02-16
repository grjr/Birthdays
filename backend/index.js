const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')
//const mysql = require('mysql')
const mysql = require('mysql2')
const {urlencoded} = require('body-parser')

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

// app.get('/', (req, res) => {
//     const sqlStmt = "insert into users(name,birthday) values('Aami', date '1988-11-10')";
//     db.query(sqlStmt, (err, result) => {
//         if (err) throw err;
//         res.send('Ta-da !!');
//     })
// });

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
});

app.get('/showall', (req, res) => {
    console.log(req)
    const selectAllSqlStmt = 'select * from users'
    db.query(selectAllSqlStmt, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})
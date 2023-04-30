const express=require('express');
const mysql = require("mysql");
var cors = require('cors')
const app=express();
app.use(express.json())
app.use(cors())

var pool = mysql.createPool({
    host: "localhost",
    user:"root",
    password: "@sweety10",
    database: "yashu",
    connectionLimit:10
    
});

let insertUserInDB = (title,des)=>{
    let query = `insert into tasklist (title,des) values ('${title}', '${des}');`
    pool.query(query);

}

let getAllUsers = (res) =>{
    pool.query('select * from tasklist;', (err,rows)=>{
        res.status(200).send(rows)
    });
}


let deleteUsers = (id)=> {
    pool.query(`delete from tasklist where id = ${id}`);
}

let truncate = ()=> {
    pool.query(`truncate tasklist`);
}



app.post('/createUser' , (req,res) =>{
    let title = req.body.title;
    let des= req.body.des;

    insertUserInDB(title,des);

    res.status(200).send({"status":"Done"});

})

app.get('/getAllUsers', (req,res) => {
    getAllUsers(res);
})

app.delete('/clearAll', (req,res) => {
    truncate();
    res.status(200).send({'truncate':'done'});
})

app.delete('/deleteUser', (req,res)=>{
    let id= req.body.id;
    deleteUsers(id);
    res.status(200).send({'Deletion':'done'});
})


const port =3001;
const hostname="localhost";


app.listen(port , hostname,()=>{
    console.log("i am listening");
})
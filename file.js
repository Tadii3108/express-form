const express = require('express');
const file = express();
//const router = express.Router();
const body_parser = require('body-parser');
const path = require('path');
require('dotenv').config();
const Pool = require('pg').Pool;


const getConnection = () => {
   return {user: "user",
    host: "localhost",
    database: "db",
    password: "pass",
    /*port: 5432*/}
};
//getConnection();

tableName = 'visitors'
const createTable = async(tableName) =>{
    const pool = new Pool(getConnection());
    const tadi = await pool.connect();
    const res = await pool.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, visitor_name varchar(100), visitor_age int, date_of_visit text,time_of_visit time,assistant varchar(100),comments text);`);
    tadi.release()
    console.log(`${tableName} table created`);
    return res.rowCount;
}

const addNewVisitor = async(visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    const pool = new Pool(getConnection());
    const tadi =  await pool.connect();
    let values, query;
    const text = `INSERT INTO visitors(
                visitor_name,
                visitor_age,
                date_of_visit,
                time_of_visit,
                assistant,
                comments)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *`

    values = [visitor_name, assistant, visitor_age, date_of_visit, time_of_visit, comments]

    try {
        query = await pool.query(text,values)

        await pool.end()
        return query.rows
    } catch(err) {
        console.log(err);
        await pool.end()
    }
    console.log("User has been added!")
}

file.use(express.json());
file.use(body_parser.urlencoded({ extended:true }));

file.set('view engine', 'pug')
file.set('./views/index.pug', path.join(__dirname, './views/index.pug'))

file.get('/new_visit', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/form.html'));
})

file.post("/submit", (req, res) => {
    console.log(req.body)
    addNewVisitor(req.body.visitor_name, req.body.assistant, req.body.visitor_age, req.body.date_of_visit, req.body.time_of_visit, req.body.comments)
    if(!req.body)
        throw new Error('request body cannot be empty')

    res.render("file", {
        visitor_name : req.body.visitor_name
    })
});

const server = file.listen(9000, ()=> {
    console.log('server is running at 127.0.0.1:9000')
})

createTable('visitors');
//addNewVisitor();

module.exports = server;
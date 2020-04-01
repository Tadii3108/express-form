const {createTable, addNewVisitor} = require('./db')
const express = require('express');
const body_parser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(body_parser.urlencoded({ extended:true }));

app.set('view engine', 'pug')
app.set('./views', path.join(__dirname, './views'));

app.get('/new_visit', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.post("/submit", (req, res) => {
    console.log(req.body)
    addNewVisitor(req.body.visitor_name, 
        req.body.assistant, 
        req.body.visitor_age, 
        req.body.date_of_visit, 
        req.body.time_of_visit, 
        req.body.comments);
    if(!req.body)
        throw new Error('bodies cannot be empty')

    res.render('index', {
        visitor_name : req.body.visitor_name
    })
});

const server = app.listen(9000, ()=> {
    console.log('server is running on port 9000')
})

module.exports = server;
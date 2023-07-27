const ejs = require("ejs");
const express = require('express');
const bodyParser = require ("body-parser")

const _ = require('lodash');

const app = express();

let subjects = []

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(req, res){
    console.log("O servidor está funcionando e ativo.")
})

app.get("/", function(req, res){
    res.render("home")
})
app.get("/compose", function(req, res){
    res.render("compose")
})

app.post("/compose", function(req, res){
    res.render("home")
    
    const subject=[
        title = req.body.subjectTitle,
        selector = req.body.subjectSelector,
        description = req.body.subjectDesc,
    ]

    subjects.push(subject);

    console.log(subject)
})
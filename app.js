const ejs = require("ejs");
const express = require('express');
const bodyParser = require ("body-parser")

const _ = require('lodash');

const app = express();

const extremamente = "Extremamente dificil";
const umPouco = "Um pouco dificil";
const nemUmPouco = "Nem um pouco dificil";

let subjects = []

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(req, res){
    console.log("O servidor está funcionando e ativo.")
})

app.get("/", function(req, res){
    res.render("home", {newSubject: subjects})
})
app.get("/compose", function(req, res){
    res.render("compose")
})

app.post("/compose", function(req, res){

        let selector =  req.body.subjectSelector;

        if(selector ==="1"){
            selector =extremamente;
        }
        if(selector ==="2"){
            selector = umPouco;
        }
        if (selector ==="3"){
            selector=nemUmPouco;
        }
    const subject={
        title: req.body.subjectTitle,
        selector: selector,
        description: req.body.subjectDesc,
    }  

    subjects.push(subject);
    res.redirect("/")

})
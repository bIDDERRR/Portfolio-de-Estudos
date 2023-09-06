const ejs = require("ejs");
const express = require('express');
const bodyParser = require ("body-parser")
const axios = require('axios');
const _ = require('lodash');
const app = express();

import {tasks} from './'

app.use(bodyParser.json());

const extremamente = "extremamente dificil";
const umPouco = "um pouco dificil";
const nemUmPouco = "nem um pouco dificil";

let subjects = [];
let Topics = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(req, res){
    console.log("O servidor está funcionando e ativo.")
})

app.get('/signatures', function(req, res){
    res.render('signatures')
})

app.get("/", function(req, res){
    res.render("home", {newSubject: subjects})
})
app.get("/compose", function(req, res){
    res.render("compose")
})

app.get("/subject/:subjectName", function(req, res){
    let parameter = req.params.subjectName;
    const kebabParam = _.kebabCase(parameter)
    parameter = kebabParam;

    subjects.forEach(subject =>{
         let subjTitle = _.kebabCase(subject.title)
         if(subjTitle === parameter){
            
           res.render('subject', {subjectTitle: subject.title,
             subjectSelector: subject.selector, subjDesc: subject.description
             }) 
        }
         else{
            console.log("It has ocurred an error.")
        }
    })


    res.render("subject" )
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
            description: req.body.subjectDesc
        } 
    subjects.push(subject);
    res.redirect("/")

})


const items =[]

axios.post('/api/tasksAdded', {tasks})

.then(response =>{

})
.catch(error =>{
    console.log()
})

//estilizar a pagina de subject, a forma de entrar em cada subject tambem, 
//conseguir passar os dados da todolist para a pagina de subject
//limpar o codigo 
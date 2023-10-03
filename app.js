const ejs = require("ejs");
const express = require('express');
const bodyParser = require("body-parser")
const axios = require('axios');
const _ = require('lodash');
const app = express();
let subjects = [];

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function (req, res) {
    console.log("O servidor está funcionando e ativo.")
})

app.get("/", function (req, res) {
    res.render("home", { newSubject: subjects })
})

app.get("/compose", function (req, res) {
    res.render("compose")

})

app.get("/subject/:subjectName", function (req, res) {
    let parameter = req.params.subjectName;
    const kebabParam = _.kebabCase(parameter)
    parameter = kebabParam;

    subjects.forEach(subject => {
        let subjTitle = _.kebabCase(subject.title)
        if (subjTitle === parameter) {

            res.render('subject', {
                subjectTitle: subject.title,
                subjectSelector: subject.selector,
                subjDesc: subject.description, 
                subjectTasks: subject.tasks
            })
        }
        else {
            console.log("It has ocurred an error.")
        }
    })


    res.render("subject")
})



app.post("/compose", function (req, res) {

    const data =req.body;   
   
    
    const subjectData = {
        title: data.subjectTitle, 
        selector :data.subjectSelector,
        description : data.subjectDesc,
        tasks: data.tasks
    } 
    /* const selector = data.subjectSelector; */
   /*  if(selector  === 1){
        selector = 'extremamente dificl'
    }
    if(selector ===2){
        selector ='um pouco dificil'
    }
    if(selector===3 ){
       selector = 'nem um pouco dificil'
    } */
    /* console.log(selector) */
    subjects.push(subjectData)
    console.log(subjects)
   
})

//paginas estaticas

app.get('/signatures', function (req, res) {
    res.render('signatures')
})
app.get("/progress", function(req, res){
    res.send("A Pagina não esta pronta ainda :/")
})

app.get("/tips", function(req, res){
    res.render("tips")
})

app.get("/accounts", function(req, res){
    res.render("accounts")
})




// TODO criar um novo object com o nome de selector
//onde o key value pair selector:data.subjectSelector ira receber os dados do seletor que estao na const Data normalmente
//depois ira passar esses dados diretamente para subjectData apos terem sido julgados por uma if condition

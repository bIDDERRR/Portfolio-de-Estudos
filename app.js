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

app.get('/signatures', function (req, res) {
    res.render('signatures')
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
                subjectSelector: subject.selector, subjDesc: subject.description
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
   
   
    subjects.push(subjectData)
    console.log(subjects)
   
})

 /* console.log('Dados da matéria recebidos:', subjectData); */
    /* passando dados da pagina de compose para o servidor 
    e retornando eles como um card na home */

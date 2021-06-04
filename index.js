// Course: CS361 - Software Engineering I
// Student Name: Dave Huston
// Assignment: Project
// Description: Project Index

//require express, express-handlebars, and body-parser
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var fs = require('fs');


//allow app to be able to accept request bodies formatted as BOTH URL encoded query strings or JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

//set port
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6952);

app.get('/',function(req,res){
    res.render('home.handlebars');
});

app.get('/query',function(req,res,next) {
    //read stored data from file
    fs.readFile('history.json', 'utf8', (err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(JSON.parse(data));
    });
});

app.get('/add-entry', (req, res,next) => {
    personName = req.query.name;
    personDate = req.query.date;
    var newEntry = {
        name: personName,
        date: personDate
    };

    //read file and write new entry
    fs.readFile('history.json', 'utf8', (err, data) => {
        var obj = JSON.parse(data);
        for (let i = 0; i < obj.length; i++) {
            if (newEntry.name.toLowerCase() == obj[i].name.toLowerCase()) {
                console.log('Person Already Added');
                return
            }
        }
        obj.push(newEntry);
        var input = JSON.stringify(obj, null, 2)
        fs.writeFile('history.json', input, (err) => {
            if (err) {
                next(err);
                return;
            }
            res.send(JSON.parse(data));
        });
    });
});

app.get('/remove-entry', (req, res,next) => {
    personName = req.query.name;
    var removeEntry = personName

    //read in the stored data and remove entry if it matches the personName sent
    fs.readFile('history.json', 'utf8', (err, data) => {
        var obj = JSON.parse(data);
        for (let i = 0; i < obj.length; i++) {
            if (removeEntry === obj[i].name) {
                obj.splice(i,1);
            }
        }

        //write new history file with entry removed
        var input = JSON.stringify(obj, null, 2)
        fs.writeFile('history.json', input, (err) => {
            if (err) {
                next(err);
                return;
            }
            res.send(JSON.parse(data));
        });
    });
});

//404 handlebars
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

//500 error handlebars
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

//start server on the set port
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Intern = require("./models/intern");
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var url = process.env.MONGODB_URI || "mongodb://localhost";
mongoose.connect(url + "/home");
var db = mongoose.connection;
//Home route
app.get("/", hello);
function hello(req, res) {
    res.send('Nothing here. No API');
}
// Interns Route
app.get("/interns", getInterns);
function getInterns(req, res) {
    Intern.getInterns(function (err, interns) {
        if (err) {
            throw err;
        }
        console.log(interns);
        res.json(interns);
    });
}
//Get specific intern
app.get('/interns/:_id', internsid);
function internsid(req, res) {
    Intern.getInternById(req.params._id, function (err, intern) {
        if (err) {
            throw err;
        }
        res.json(intern);
    });
}
// Add Intern
app.post('/interns', postIntern);
function postIntern(req, res) {
    var internItems = req.body;
    Intern.addIntern(internItems, function (err, intern) {
        if (err) {
            throw err;
        }
        res.json(intern);
    });
}
// Update Points (or name)
app.put('/interns/:_id', putIntern);
function putIntern(req, res) {
    var intern = req.body;
    var id = req.params._id;
    Intern.updateIntern(id, intern, {}, function (err, intern) {
        if (err) {
            throw err;
        }
        res.json(intern);
    });
}
// Delete Intern
app.delete('/interns/:_id', deleteIntern);
function deleteIntern(req, res) {
    var id = req.params._id;
    Intern.deleteIntern(id, function (err, intern) {
        if (err) {
            throw err;
        }
        res.json(intern);
    });
}
app.listen(process.env.PORT || 3000);

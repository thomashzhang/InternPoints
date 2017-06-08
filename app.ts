'use strict';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as Intern from "./models/intern"

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const url: string = process.env.MONGODB_URI || "mongodb://localhost";
mongoose.connect(url + "/pingtern");
const db = mongoose.connection;

//Home route
app.get("/", hello);
function hello(req: any, res: any) {
    res.send('Nothing here. No API');
}

// Interns Route
app.get("/interns", getInterns);
function getInterns(req: any, res: any) {
    Intern.getInterns(function(err: any, interns: any){
        if (err) {
            throw err;
        }
        console.log(interns);
        res.json(interns);
    })
}

//Get specific intern
app.get('/interns/:_id', internsid);
function internsid(req: any, res: any) {
    Intern.getInternById(req.params._id, function(err: any, intern: any){
        if (err) {
            throw err;
        }
        res.json(intern);
    })
}

// Add Intern
app.post('/interns', postIntern);
function postIntern(req: any, res: any) {
    var internItems = req.body;
    Intern.addIntern(internItems, function(err: any, intern: any){
        if (err) {
            throw err;
        }
        res.json(intern);
    })
}

// Update Points (or name)
app.put('/interns/:_id', putIntern);
function putIntern(req: any, res: any) {
    let intern = req.body;
    let id = req.params._id
    Intern.updateIntern(id, intern, {}, function(err: any, intern: any){
        if (err) {
            throw err;
        }
        res.json(intern);
    })
}

// Delete Intern
app.delete('/interns/:_id', deleteIntern);
function deleteIntern(req: any, res: any) {
    let id = req.params._id
    Intern.deleteIntern(id, function(err: any, intern: any){
        if (err) {
            throw err;
        }
        res.json(intern);
    })
}

app.listen(process.env.PORT || 3000);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});
var Intern = mongoose.model('Intern', internSchema);
// Get Intern
function getInterns(callback, limit) {
    Intern.find(callback).limit(limit);
}
exports.getInterns = getInterns;
// Get Intern by id
function getInternById(id, callback) {
    Intern.findById(id, callback);
}
exports.getInternById = getInternById;
//Add Intern
function addIntern(intern, callback) {
    Intern.create(intern, callback);
}
exports.addIntern = addIntern;
//Update Intern
function updateIntern(id, intern, options, callback) {
    var query = { _id: id };
    var update = {
        name: intern.name,
        points: intern.points
    };
    Intern.findOneAndUpdate(query, update, options, callback);
}
exports.updateIntern = updateIntern;
// Delete Intern
function deleteIntern(id, callback) {
    var query = { _id: id };
    Intern.remove(query, callback);
}
exports.deleteIntern = deleteIntern;

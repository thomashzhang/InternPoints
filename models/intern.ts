import * as mongoose from "mongoose";
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});
const Intern = mongoose.model('Intern', internSchema);

// Get Intern
export function getInterns(callback: any, limit?: any) {
    Intern.find(callback).limit(limit);
}

// Get Intern by id
export function getInternById(id: string, callback: any) {
    Intern.findById(id, callback);
}

//Add Intern
export function addIntern(intern: any, callback: any) {
    Intern.create(intern, callback);
}

//Update Intern
export function updateIntern(id: string, intern: any, options: any, callback: any) {
    let query = {_id: id};
    let update = {
        name: intern.name,
        points: intern.points
    }
    Intern.findOneAndUpdate(query, update, options, callback);
}

// Delete Intern
export function deleteIntern(id: string, callback: any) {
    let query = {_id: id};
    Intern.remove(query, callback);
}

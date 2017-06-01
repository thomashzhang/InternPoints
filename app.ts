'use strict';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

const app = express();
const url: string = process.env.MONGODB_URI || "mongodb://localhost";
mongoose.connect(url + "/home");
const db = mongoose.connection;

//Home route
app.get("/", hello);
function hello(req: any, res: any) {
    res.send('Nothing here. No API');
}
app.listen(process.env.PORT || 3000);
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var morgan = require('morgan');
var cors = require('cors');
var db = require('./db.json');
app.use(express.json());
app.use(cors());
app.use(express.static('./src/dist'));
morgan.token('body', function (req, res) { return JSON.stringify(req.body); });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.get('/api/persons', function (req, res) {
    res.json(db);
});
app.get('/api/persons/:id', function (req, res) {
    var id = req.params.id;
    var result = db.filter(function (person) { return person.id === Number(id); });
    if (result.length) {
        db = db.filter(function (person) { return person.id !== Number(id); });
        res.json(result);
    }
    else {
        res.status(404).end();
    }
});
app.post('/api/persons', function (req, res) {
    var person = req.body;
    var sameName = db.filter(function (p) { return p.name.toLowerCase() === person.name.toLowerCase(); });
    if (sameName.length) {
        return res.status(400).json({ error: 'A Person with that name is already listed' });
    }
    if (!person.name && !person.number) {
        return res.status(400).json({ error: 'Missing content: name & number' });
    }
    if (!person.name) {
        return res.status(400).json({ error: 'Missing content: name' });
    }
    if (!person.number) {
        return res.status(400).json({ error: 'Missing content: number' });
    }
    // const randId = Math.floor(Math.random() * 1000)
    var formattedPerson = {
        name: person.name,
        number: person.number,
        id: db.length + 1
    };
    db = __spreadArray(__spreadArray([], db, true), [formattedPerson], false);
    res.json(formattedPerson);
});
app.delete('/api/persons/:id', function (req, res) {
    var id = req.params.id;
    var result = db.filter(function (person) { return person.id !== Number(id); });
    if (result.length) {
        res.status(204).end();
    }
    else {
        res.status(404).end();
    }
});
app.get('/info', function (req, res) {
    var currentDate = new Date();
    res.send("<div>\n                <h3>Phonebook has info for ".concat(db.length, " people</h3>\n                <p>").concat(currentDate.toLocaleString(), "</p>\n            </div>"));
});
var unkownEndpoint = function (req, res) {
    res.status(404).send({ error: 'unkown endpoint' });
};
app.use(unkownEndpoint);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});

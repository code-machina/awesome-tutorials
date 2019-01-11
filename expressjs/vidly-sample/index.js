const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.join());

const genres = [
    {id: 1, name: 'Action' },
    {id: 2, name: 'Horror' },
    {id: 3, name: 'Romance' },
];

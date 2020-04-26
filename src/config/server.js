const express = require('express');
const cors = require('cors');
const app = express();

//Convierta todo lo que viene de texto como json
app.use(express.json());
app.use(cors());
app.set("port", 3015)

module.exports = app;
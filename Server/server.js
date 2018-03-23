const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
//use .ENV file to hide uname and password;
//put file in gitignore file;
const mongoURI = 'mongodb://peppermint1:Bananas1@ds125618.mlab.com:25618/peppermint1';
mongoose.connect(mongoURI);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./Controllers/userController');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./'))
app.use(express.static(path.join(__dirname, '../Client')));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '../Client/index.html')
});

app.post('/createList', userController.startList);
app.post('/deleteListItem', userController.deleteListItem);
app.post('/updateListItem', userController.updateListItem);
app.get('/listItems', userController.findAll);

app.listen(3001, () => { console.log('Is listening') });
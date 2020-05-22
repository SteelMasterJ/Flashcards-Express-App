const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.set('view engine', 'pug');

app.use((req, res, next) => {
    console.log('Hello');
    const err = new Error('Oh boy');
    next(err);
});

app.use((req, res, next) => {
    console.log('world!');
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username
    if (name) {
        res.render('index', {name: name});
    } else {
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: 'Who is buried in Grant\'s Tomb?', hint: 'think whose tomb it is' });
});

app.get('/hello', (req, res) => {
    const cookie = req.cookies.username;
    if (cookie) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
});
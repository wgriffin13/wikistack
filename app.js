const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout')
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

// Middleware
// logging
app.use(morgan('dev'));
// public folder
app.use(express.static(__dirname + '/public'));
// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));
// parses json bodies
app.use(express.json())

// Routes
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res, next) => {
    res.redirect('/wiki')
});

const PORT = process.env.PORT || 3000;

const init = () => {
    models.db.sync({force: false})
        .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening in port ${PORT}`);
        });
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
}

init();

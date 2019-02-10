const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout')
const models = require('./models');

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
app.get('/', (req, res, next) => {
    res.send(layout('<br>Hello World!'));
});

// db.authenticate()
//     .then(() => {
//         console.log('connected to the database');
//     })

const PORT = process.env.PORT || 3000;

const init = () => {
    models.db.sync({force: true})
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

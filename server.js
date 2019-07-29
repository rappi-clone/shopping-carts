'use strict'

const Express = require('express');
const app = Express();
const PORT = 6001;
const database = require('./db/database')();
const routes = require('./routes/routes')(database)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Request-Headers, Access-Control-Request-Method, Origin, X-Requested-With, Content-Type, Accept, DNT, Referer, User-Agent, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use('/', routes);

//Handle errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.error) res.json({ errorMessage: err.error.message });
    else {
        res.json({ errorMessage: 'Ocurrió un error en el servidor. Inténtalo de nuevo en un momento' });
        if (err.errors && err.errors[0]) console.log(err.errors[0].message)
        // else console.log(err)
    }
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
});
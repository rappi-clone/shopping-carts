'use strict'

const express = require('express');
const app = express();
const port = 3002;

// const routes = require('./routes/routes');

const config = {
    database: process.env.DB_NAME || 'carrito',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    setup: false,
    define: {
        underscored: true
    }
}
const index = require('./index')(config)

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/', (req, res, next) => {
    return res.json({
        message: "Funciono"
    })
})

app.post('/createShoppingCart', async (req, res, next) => {
    const Index = await index;
    let create = await Index.ShoppingCart;
    await create.createShoppingCart(req.body)
    return res.json({
        message: "creado"
    })
})

app.get('/findShoppingCartByPk', async (req, res, next) => {
    const Index = await index;
    let ShoppingCart = await Index.ShoppingCart;
    console.log(req.body.id)
    let shoppingCart = await ShoppingCart.findShoppingCartByPk(req.body.id)
    return res.json(
        shoppingCart
    )
});

app.listen(port, () => {
    console.log('Server started')
});
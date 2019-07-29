'use strict'

const Sequelize = require('sequelize')
const SetupShoppingCartModel = require('./models/shopping-cart')
const SetupCartProductModel = require('./models/cart-product')

const config = {
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    host: process.env.DB_HOST || '',
    dialect: 'postgres',
    setup: true,
    logging: console.log,
    define: {
        underscored: true,
        freezeTableName: true,
        paranoid: true
    }
}

module.exports = async function () {

    const sequelize = new Sequelize(config)

    await sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const ShoppingCart = SetupShoppingCartModel(sequelize)
    const CartProduct = SetupCartProductModel(sequelize)

    ShoppingCart.hasMany(CartProduct, { onDelete: 'CASCADE', as: 'CartProducts'})
    CartProduct.belongsTo(ShoppingCart)

    if (config.setup) sequelize.sync({ force: true, logging: console.log })

    return {
        ShoppingCart,
        CartProduct
    }
}
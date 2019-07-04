'use strict'

const setupDatabase = require('./lib/db')
const setupShoppingCart = require('./lib/shoppingcart')
//const defaults = require('defautls')

// Models
const setupShoppinCartModel = require('./models/shoppingcart')
const setupCartProductModel = require('./models/cartproduct')

module.exports = async function (config) {
  // config = defaults(config, {
  //   dialect: 'slqite',
  //   pool: {
  //     max: 10,
  //     min: 0,
  //     idle: 1000
  //   },
  //   query: {
  //     raw: true
  //   }
  // })

  const sequelize = setupDatabase(config)

  //
  const ShoppingCartModel = setupShoppinCartModel(config)

  const CartProductModel = setupCartProductModel(config)

  ShoppingCartModel.hasMany(CartProductModel)
  CartProductModel.belongsTo(ShoppingCartModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const ShoppingCart = setupShoppingCart(ShoppingCartModel)
  const CartProduct = {}

  return {
    ShoppingCart,
    CartProduct
  }
}

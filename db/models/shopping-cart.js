'use strict'

const Sequelize = require('sequelize')

module.exports = sequelize => {

  let shoppingCartModel = sequelize.define('shopping_carts', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    }
  })

  return shoppingCartModel
}

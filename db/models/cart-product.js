'use strict'

const Sequelize = require('sequelize')

module.exports = sequelize => {
  let cartProductModel = sequelize.define('cartProduct', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }
  })

  return productModel
}
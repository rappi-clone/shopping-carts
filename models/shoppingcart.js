'use strict'
const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupShoppingCartModel (config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('shoppingcart', {
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}

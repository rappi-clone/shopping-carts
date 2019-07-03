'use strict'
const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupShoppingCartModel (config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('shoppingcart', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  })
}

'use strict'
const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupCartProductModel (config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('cartproduct', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}

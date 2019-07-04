'use strict'

module.exports = async function setupShoppingCart (ShoppingCartModel) {
  async function findShoppingCartByPk (id) {
    return ShoppingCartModel.findByPk(id)
  }

  async function createShoppingCart (obj) {
    const result = await ShoppingCartModel.create(obj)
    return result.toJSON()
  }

  async function updateShoppingCart (cart, product) {

  }

  return {
    findShoppingCartByPk,
    createShoppingCart,
    updateShoppingCart
  }
}

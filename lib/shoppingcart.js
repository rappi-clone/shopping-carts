'use strict'

module.exports = function setupShoppingCart (ShoppingCartModel) {
  async function findShoppingCartByPk (id) {
    return ShoppingCartModel.findByPk(id)
  }

  async function createShoppingCart () {
    const result = await ShoppingCartModel.create()
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

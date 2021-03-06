'use strict'

const Express = require('express');
const ErrorHandler = require('../db/lib/errorHandler')

module.exports = database => {
  const router = Express.Router();

  router.post('/createShoppingCart', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para poder crear un carrito'), status: 401 })
      }

      let userId = req.headers.id

      const db = await database;
      await db.ShoppingCart.create({ userId })

      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.get('/getCartProducts', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para leer los productos del carrito'), status: 401 })
      }

      let userId = req.headers.id

      const db = await database;
      let shoppingCart = await db.ShoppingCart.findOne({ where: { userId } })

      if (shoppingCart === null) next({ error: new Error("El carrito que buscas no existe"), status: 401 })

      let cartProducts = await shoppingCart.getCartProducts({ order: [['id', 'ASC']] })

      res.json({
        cartProducts
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/setCartProducts', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para agregar productos al carrito'), status: 401 })
      }

      let userId = req.headers.id

      const db = await database;
      let shoppingCart = await db.ShoppingCart.findOne({ where: { userId } })

      if (shoppingCart === null) {
        shoppingCart = await db.ShoppingCart.create({ userId })
      }

      let currentCartProducts = await shoppingCart.getCartProducts()

      currentCartProducts.forEach(async product => {
        await product.destroy()
      });

      for (let i = 0; i < currentCartProducts.length; i++) {
        await currentCartProducts[i].destroy()
      }

      req.body.cartProducts.forEach(async product => {
        await shoppingCart.createCartProduct(product)
      });

      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/addCartProduct', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para agregar productos al carrito'), status: 401 })
      }

      let userId = req.headers.id

      const db = await database;
      let shoppingCart = await db.ShoppingCart.findOne({ where: { userId } })

      if (shoppingCart === null) {
        shoppingCart = await db.ShoppingCart.create({ userId })
      }

      let currentCartProducts = await shoppingCart.getCartProducts()

      let repeated = false

      for (let i = 0; i < currentCartProducts.length; i++) {
        if (currentCartProducts[i].productId === req.body.productId) {
          await currentCartProducts[i].update({ quantity: (currentCartProducts[i].quantity + 1) })
          repeated = true
        }
      }

      if (!repeated) {
        await shoppingCart.createCartProduct(req.body)
      }

      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/reduceCartProduct', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para agregar productos al carrito'), status: 401 })
      }

      let userId = req.headers.id

      const db = await database;
      let shoppingCart = await db.ShoppingCart.findOne({ where: { userId } })

      if (shoppingCart === null) next({ error: new Error("El carrito que buscas no existe"), status: 401 })

      let currentCartProducts = await shoppingCart.getCartProducts()

      for (let i = 0; i < currentCartProducts.length; i++) {
        if (currentCartProducts[i].productId === req.body.productId) {
          if (currentCartProducts[i].quantity === 1) await currentCartProducts[i].destroy()
          else await currentCartProducts[i].update({ quantity: (currentCartProducts[i].quantity - 1) })
        }
      }

      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/deleteCartProduct', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para agregar productos al carrito'), status: 401 })
      }

      let userId = req.headers.id

      const db = await database;
      let shoppingCart = await db.ShoppingCart.findOne({ where: { userId } })

      if (shoppingCart === null) next({ error: new Error("El carrito que buscas no existe"), status: 401 })

      let currentCartProducts = await shoppingCart.getCartProducts()

      for (let i = 0; i < currentCartProducts.length; i++) {
        if (currentCartProducts[i].productId === req.body.productId) {
          await currentCartProducts[i].destroy()
        }
      }

      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/deleteCartProducts', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para modificar el carrito'), status: 401 })
      }

      let userId = req.headers.id

      const db = await database;
      let shoppingCart = await db.ShoppingCart.findOne({ where: { userId } })

      if (shoppingCart === null) next({ error: new Error("El carrito que buscas no existe"), status: 401 })

      let currentCartProducts = await shoppingCart.getCartProducts()
      currentCartProducts.forEach(async product => {
        await product.destroy()
      });

      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  // router.get('/getAllStores', async (req, res, next) => {
  //   try {
  //     const db = await database;
  //     let stores = await db.Store.findAll()
  //     res.json({
  //       stores
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

  // router.get('/getStoreByStoreId/:id', async (req, res, next) => {
  //   try {
  //     let storeId = req.params.id
  //     const db = await database;
  //     let store = await db.Store.findByPk(storeId)
  //     res.json({
  //       store
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

  // router.post('/createProductInStore/:id', async (req, res, next) => {
  //   try {
  //     if (req.headers.usertype != 'administrator') {
  //       throw ({ error: new Error('Debes estar logeado como administrador para poder crear un producto'), status: 401 })
  //     }
  //     let storeId = req.params.id

  //     const db = await database;
  //     let store = await db.Store.findByPk(storeId)

  //     if(store === null) next({ error: new Error("La tienda en la que quieres crear el producto no existe"), status: 401 })

  //     await store.createProduct(req.body)

  //     res.json({
  //       success: true
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

  // router.get('/getStoreProducts/:id', async (req, res, next) => {
  //   try {
  //     let storeId = req.params.id

  //     const db = await database
  //     let store = await db.Store.findByPk(storeId)

  //     if(store === null) next({ error: new Error("La tienda que buscas no existe"), status: 401 })

  //     let products = await store.getProducts()

  //     res.json({
  //       products
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

  // router.get('/getProductByProductId/:id', async (req, res, next) => {
  //   try {
  //     let productId = req.params.id
  //     const db = await database
  //     let product = await db.Product.findByPk(productId)
  //     res.json({
  //       product
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

  // router.post('/deleteProduct/:id', async (req, res, next) => {
  //   try {
  //     let productId = req.params.id
  //     const db = await database
  //     let product = await db.Product.findByPk(productId)

  //     if(product === null) next({ error: new Error("El producto que buscas no existe"), status: 401 })

  //     await product.destroy()

  //     res.json({
  //       success: true
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

  // router.post('/buyProduct/:id', async (req, res, next) => {
  //   try {
  //     let productId = req.params.id
  //     const db = await database
  //     let product = await db.Product.findByPk(productId)
  //     if(product === null) next({ error: new Error("El producto que buscas no existe"), status: 401 })

  //     let currentQuantity = product.availableQuantity
  //     let availableQuantity = currentQuantity-req.body.quantity

  //     if(req.body.quantity > currentQuantity) next({ error: new Error("No puedes comprar una cantidad mayor a la disponible"), status: 401 })

  //     await product.update({availableQuantity})

  //     res.json({
  //       success: true
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

  return router;
}
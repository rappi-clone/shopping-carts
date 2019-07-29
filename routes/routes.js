'use strict'

const Express = require('express');
const ErrorHandler = require('../db/lib/errorHandler')

module.exports = database => {
  const router = Express.Router();

  // router.post('/createStore', async (req, res, next) => {
  //   try {
  //     if (req.headers.usertype != 'administrator') {
  //       throw ({ error: new Error('Debes estar logeado como administrador para poder crear una tienda'), status: 401 })
  //     }

  //     const db = await database;
  //     let store = await db.Store.create(req.body)

  //     res.json({
  //       success: true
  //     });
  //   } catch (error) {
  //     ErrorHandler(error, next)
  //   }
  // })

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
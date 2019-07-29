module.exports = (error, next) => {
    console.log('entró al handler')
    console.log(error)
    if (error.errors) {
        if (error.errors[0]) {       
            // Errors related to the shopping-cart model
            // if (error.errors[0].message === 'stores.name cannot be null') next({ error: new Error('El nombre de la tienda no puede estar vacío'), status: 401 })
            // else if (error.errors[0].message === 'name must be unique') next({ error: new Error('Ya hay una tienda con este mismo nombre'), status: 401 })
            // else if (error.errors[0].message === 'stores.description cannot be null') next({ error: new Error('La descripción de la tienda no puede estar vacía'), status: 401 })
            // else if (error.errors[0].message === 'stores.address cannot be null') next({ error: new Error('La dirección de la tienda no puede estar vacía'), status: 401 })
            // else if (error.errors[0].message === 'stores.minimumOrderPrice cannot be null') next({ error: new Error('Debes ingresar el precio mínimo de la orden'), status: 401 })
            // else if (error.errors[0].message === 'stores.openingHour cannot be null') next({ error: new Error('Debes ingresar la hora de apertura'), status: 401 })
            // else if (error.errors[0].message === 'stores.closingHour cannot be null') next({ error: new Error('Debes ingresar la hora de cierre'), status: 401 })
            // else if (error.errors[0].message === 'stores.logoUrl cannot be null') next({ error: new Error('Debes ingresar la url del logo'), status: 401 })
            // else if (error.errors[0].message === 'stores.coverPictureUrl cannot be null') next({ error: new Error('Debes ingresar la url de la imagen de cover'), status: 401 })
            // else if (error.errors[0].message === 'Validation isUrl on logoUrl failed') next({ error: new Error('La url del logo es inválida'), status: 401 })
            // else if (error.errors[0].message === 'Validation isUrl on coverPictureUrl failed') next({ error: new Error('La url del cover es inválida'), status: 401 })
            // else if (error.errors[0].message === 'Validation notEmpty on address failed') next({ error: new Error('Debes ingresar una dirección'), status: 401 })
            
            // // Errors related to the products model
            // else if (error.errors[0].message === 'products.name cannot be null') next({ error: new Error('El nombre del producto no puede estar vacío'), status: 401 })
            // else if (error.errors[0].message === 'products.description cannot be null') next({ error: new Error('La descripción del producto no puede estar vacía'), status: 401 })
            // else if (error.errors[0].message === 'products.price cannot be null') next({ error: new Error('El precio del producto no puede estar vacío'), status: 401 })
            // else if (error.errors[0].message === 'products.availableQuantity cannot be null') next({ error: new Error('La cantidad de unidades disponibles del producto no puede estar vacío'), status: 401 })
            // else if (error.errors[0].message === 'Validation isUrl on pictureUrl failed') next({ error: new Error('La url de la foto del producto es inválida'), status: 401 })

            // // Errors related to both
            // else if (error.errors[0].message === 'Validation notEmpty on name failed') next({ error: new Error('El nombre no puede estar vacío'), status: 401 })
            // else if (error.errors[0].message === 'Validation notEmpty on description failed') next({ error: new Error('La descripción no puede estar vacía'), status: 401 })

            // else 
            next({ error: new Error(error.errors[0].message), status: 401 })
        }
        else {
            console.log('Primer else')
            next({ error: new Error(error.message), status: 500 })
        }
    }
    else if (error.error) {
        console.log('Segundo else')
        next({ error: new Error(error.error), status: 401 })
    }
    else{
        console.log('Tercer else')
        // if (error.message.includes('invalid input syntax for type numeric:')) next({ error: new Error('Debes ingresar un precio válido'), status: 401 })
        // if (error.message.includes('invalid input syntax for type time:')) next({ error: new Error('Debes ingresar una hora válida'), status: 401 })
        // if (error.message.includes('invalid input syntax for integer:')) next({ error: new Error('Debes ingresar una cantidad disponible válida'), status: 401 })
        // else 
        next({ error: new Error(error.message), status: 500 })
    }
}
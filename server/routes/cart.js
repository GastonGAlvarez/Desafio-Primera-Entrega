const path = require('path');
const { Router } = require('express');
const CartProducts = require('../models/CartProducts.js');

const admin = require('../server.js');

const router = new Router();
const cartProdsClass = new CartProducts(path.join(__dirname, '../database/cartProducts.json'));


router.get('/:id/products', (req, res) => {
    const id = req.params.id;
    const products = cartProdsClass.getById(id);

    res.send(products);
});

router.post('/', (req, res) => {
    return cartProdsClass.createNewCart();
});

router.delete('/:id', (req, res) =>{
    const idToDelete = req.params.id;
    cartProdsClass.deleteById(idToDelete);

    res.send("Carrito eliminado con éxito");    
});

router.delete('/:id/products/:id_prod', (req, res) =>{
    const idToDelete = req.params.id;
    const idProdToDelete = req.params.id_prod;
    cartProdsClass.deleteProdById(id, id_prod);

    res.send("Producto eliminado con éxito");
})


module.exports = router;
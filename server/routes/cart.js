const { Router } = require('express');
const cart = require('../models/Cart.js');

const router = new Router();

router.get('/:id/products', async (req, res) => {
    const id = req.params.id;
    const products = await cart.getById(id);

    res.send(products);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const id = await cart.createNewCart(body)
    res.status(201).send(id);
});

router.post('/:id/products', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try{
        await cart.saveNewProd(body, id);
        res.status(201).send("Producto añadido con éxito.");

    } catch(err){
        if(err.message === "El carrito no existe"){
            res.sendStatus(404)
        } else{
            console.log(err)
            res.sendStatus(500)
        }
    }
});

router.delete('/:id', async (req, res) =>{
    const idToDelete = req.params.id;
    await cart.deleteById(idToDelete);

    res.send("Carrito eliminado con éxito").status(200);    
});

router.delete('/:id/products/:id_prod', async (req, res) =>{
    const idToDelete = req.params.id;
    const idProdToDelete = req.params.id_prod;
    await cart.deleteProdById(idToDelete, idProdToDelete);

    res.send("Producto eliminado con éxito");
})


module.exports = router;
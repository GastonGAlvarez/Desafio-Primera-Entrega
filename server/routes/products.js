const { Router } = require('express');
const product = require('../models/mysql_(knex)/Product.js');
const admin = true;

const router = new Router();

router.get('/:id?', async (req, res) => {
    const id = req.params.id;

    if(!id){
        const products = await product.getAll();
        res.send(products);
    }else{
        const products = [];
        products.push( await product.getById(id) );
        if(products[0] !== null){
            res.send(products[0]);
        }
        else{
            res.send({error: -1, descripción: 'route /:id? method GET not product with that id' })
        }
    }
});

router.post('/', (req, res) => {
    if(admin){
        const newProduct = req.body;
        product.create(newProduct);
        res.status(201).send("Producto añadido");
    }else{
        res.send({error: -1, descripción: 'route / method POST not authorized' })
    }
});

router.put('/:id', async (req, res) => {
    if(admin){
        const id = req.params.id;
        const productUpdate = req.body;
        product.update(id, productUpdate);
        res.status(200).send("Producto actualizado");
    }else{
        res.send({error: -1, descripción: 'route /:id method PUT not authorized' })
    }
});

router.delete('/:id', (req, res) => {
    if(admin){
        const id = req.params.id;
        product.delete(id);
    }else{
        res.send({error: -1, descripción: 'route /:id method DELETE not authorized' })
    }
})


module.exports = router;
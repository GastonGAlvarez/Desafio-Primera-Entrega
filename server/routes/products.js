const path = require('path');
const { Router } = require('express');
const Products = require('../models/Products.js');
const admin = require('../server.js');

const router = new Router();
const productsClass = new Products(path.join(__dirname, '../database/products.json'));

router.get(['/', '/:id'], async (req, res) => {
    const id = req.params.id;
    if(!id){
        const products = await productsClass.getAll();
        res.render('index', { products });
    }else{
        const products = [];
        products.push( await productsClass.getById(id) );
        if(products[0] !== null){
            res.render('index', { products });
        }
        else{
            res.send({error: -1, descripción: 'route /:id method GET not product with that id' })
        }
    }
});

router.post('/add', (req, res) => {
    if(admin){
        const newProduct = req.body;
        productsClass.save(newProduct);
        res.render('result', { newProduct });
    }else{
        res.send({error: -1, descripción: 'route /add method POST not authorized' })
    }
});

router.put('/:id', async (req, res) => {
    if(admin){
        const id = req.params.id;
        const productUpdate = req.body;
        productsClass.saveById(id, productUpdate);
        const newProduct = await productsClass.getById(id);
        res.render('result', { newProduct })
    }else{
        res.send({error: -1, descripción: 'route /:id method PUT not authorized' })
    }
});

router.delete('/:id', (req, res) => {
    if(admin){
        const id = req.params.id;
        productsClass.deleteById(id);
    }else{
        res.send({error: -1, descripción: 'route /:id method DELETE not authorized' })
    }
})


module.exports = router;
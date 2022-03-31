const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } = require("./config");
const adminMiddleware = require('./middlewares/admin.js');
const productsRouter = require('./routes/mongodb/products.js');
const cartRouter = require('./routes/mongodb/cart.js');

const app = express();
const PORT = process.env.PORT || 8080;

// Mongoose Connection
mongoose.connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`).then(() => {
    
    // Middlewares Body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static(path.join(__dirname, 'public')));

    // Routes
    app.use('/api/products', adminMiddleware, productsRouter);
    // app.use('/api/cart', adminMiddleware, cartRouter);

    // Listen
    app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`) );

}).catch((err) => console.log("Error al conectar con Mongo Cloud", err))


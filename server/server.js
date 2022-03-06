const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products.js');
const cartRouter = require('./routes/cart.js');

const app = express();
const PORT = process.env.PORT || 8080;

const admin = true;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send("Hola mundo!"));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);



app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`) );
const Product = require("../models/mongo_cloud/Product.js");

module.exports = {
  get: async (req, res) => {
    const { orderBy, search } = req.query;

    try {
      const products = await Product.getAll(orderBy, search)
      res.send(products)
    } catch (e) {
      console.log(e)
      res.status(500).send({
        error: e.message
      })
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;
    const prod = await Product.getById(id);
    res.status(200).send(prod);
  },
  put: async (req, res) => {
    const id = req.params.id;
    const { body } = req;
    const result = await Product.update(id, body);
    res.status(200).send("Producto actualizado.");
  },
  post: async (req, res) => {
    const { body } = req
    try {
      const prod = await Product.create(body)
      res.status(201).send(prod)
    } catch (e) {
      console.log(e)
      res.status(500).send({
        error: e.message
      })
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await Product.delete(id);
    res.status(200).send("Producto eliminado.");
  }
}
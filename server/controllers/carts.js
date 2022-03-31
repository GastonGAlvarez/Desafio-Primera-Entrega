const product = require("../models/mongo_cloud/Product.js");
const cart = require("../models/mongo_cloud/Cart.js");

module.exports = {
  create: async (req, res) => {
    try {
      const cartId = await cart.create()
      res.send(cartId)
    } catch (e) {
      console.log(e)
      res.status(500).send({
        error: e.message
      })
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;
    const cart = await cart.getAll(id);
    res.status(200).send(cart);
  },
  addProd: async (req, res) => {
    const id = req.params.id;
    const idProd = req.params.idProd;

    try {
      const prod = await product.getById(idProd)
      await cart.addProd(id, prod);
    } catch (e) {
      console.log(e)
      res.status(500).send({
        error: e.message
      })
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await cart.delete(id);
    res.status(200).send("Carrito eliminado.");
  },
  delProd: async (req, res) => {
    const id = req.params.id;
    const idProd = req.params.idProd;
    try {
      await cart.delProd(id, idProd);
    } catch (e) {
      console.log(e)
      res.status(500).send({
        error: e.message
      })
    }
  }
}
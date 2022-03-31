const mongoose = require("mongoose");
const Product = require("../models/mongo/Product.js");

class MongoContainer{
    constructor(collection, schema){
        this.model = mongoose.model(collection, new mongoose.Schema(schema));
    }

    async create(){
        const id = await this.model.create({ products: [] });
        return id
    }

    async getAll(id) {
        const cart = await this.model.find({ _id: id });
        return cart;
    }

    async addProd(id, prods){
        { products } = await this.model.findOne({ _id: id})
        products.push(prods);

        const result = await this.model.updateOne({ _id: id }, { products: products });
        return result;
    }

    async delProd(id, prodId){
        { products } = await this.model.findOne({ _id: id });
        const index = products.findIndex(i => i.id == productId)
        
        if (index == -1) throw new Error('Product not found')
        products.splice(index, 1)

        const result = await this.model.updateOne({ _id: id}, { products: products });
        return result;
    }

    async delete(id){
        const result = await this.model.deleteOne({ _id: id});
        return result;
    }
}

module.exports = MongoContainer;
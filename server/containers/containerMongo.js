const mongoose = require("mongoose");

class MongoContainer{
    constructor(collection, schema){
        this.model = mongoose.model(collection, new mongoose.Schema(schema));
    }

    async create(obj){
        const id = await this.model.create(obj)
        return id;
    }

    async getAll(orderBy = '', search = '') {
        let products = []
        let find = search ? { name: { $regex: search, $options: "i" } } : {}
        if (orderBy){
            const sort = {};
            sort[orderBy] = -1;
            products = await this.model.find(find).sort(sort);
        } else{
            products = await this.model.find(find);
        }

        return products.map( (p) => {
            return {
                name: p.name,
                description: p.description,
                code: p.code,
                url: p.url,
                price: p.price,
                stock: p.stock,
                id: p["_id"],
                timestamp: p.timestamp
            }
        })
    }

    async getById(id){
        const product = await this.model.findOne({ _id: id})
        return {
            name: product.name,
            description: product.description,
            code: product.code,
            url: product.url,
            price: product.price,
            stock: product.stock,
            id: product["_id"],
            timestamp: product.timestamp
        }
    }

    async update(id, body){
        const result = await this.model.updateOne({ _id: id}, body);
        return result;
    }

    async delete(id){
        const result = await this.model.deleteOne({ _id: id});
        return result;
    }
}

module.exports = MongoContainer;
const MongoContainer = require("../../containers/containerMongo.js");

class ProductMongo extends MongoContainer{
    constructor(){
        super('products', {
            name: String,
            description: String,
            code: String,
            url: String,
            price: Number,
            stock: { type: Number, default: 0 },
            timestamp: { type: Number, default: Date.now() }
        });
    }
}

module.exports = new ProductMongo();
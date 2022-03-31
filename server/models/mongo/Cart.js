const MongoContainer = require("../../containers/containerMongoCart.js");

class CartMongo extends MongoContainer{
    constructor(){
        super('carts', {
            products: [
                {
                    name: String,
                    description: String,
                    code: String,
                    url: String,
                    price: Number,
                    stock: { type: Number, default: 0 },
                    timestamp: { type: Number, default: Date.now() }
                }
            ],
            timestamp: { type: Number, default: Date.now() }

        });
    }
}

module.exports = new CartMongo();
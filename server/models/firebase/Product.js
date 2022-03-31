const DB = require("../../containers/containerFirebase.js");

class ProductFirebase extends DB {
    constructor(){
        super('products')
    }
}

module.export = new ProductFirebase();
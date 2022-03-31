const DB = require("../../containers/containerFirebase.js");

class CartFirebase extends DB {
    constructor(){
        super('carts')
    }
}

module.export = new CartFirebase();
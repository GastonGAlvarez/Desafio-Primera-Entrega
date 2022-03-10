const fs = require('fs').promises;

class CartProducts {
    constructor(file) {
        this.file = file;
        this.data = [];
    }

    async createNewCart(cart){
        await this.readData();

        cart.timestamp = Date.now();
        cart.id = this.data[this.data.length - 1].id + 1
        this.data.push(cart)

        await this.writeData();
    }

    async saveNewProd(prod, id) {
        await this.readData();

        const cart = this.data.find(elem => elem.id == id)
        if(!cart){
            throw new Error("El carrito no existe");
        }

        const productExist = cart.products.find(elem => elem.id == id);
        if(!productExist){
            cart.products.push(prod);
        }else{
            throw new Error("El producto ya esta en el carro.");
        }
        
        await this.writeData();
    }

    async getById(id) {
        await this.readData();

        let index = this.data.findIndex(elem => elem.id == id)
        if(index !== -1){
            return this.data[index].products;
        }else{
            throw new Error("No existe un carrito con ese ID");
        } 
    }

    async deleteById(id) {
        await this.readData();

        let index = this.data.findIndex(elem => elem.id == id)
        if(index !== -1){
            this.data.splice(index, 1);
            await this.writeData();
        }
        else{
            throw new Error("No existe un carrito con ese ID");
        }
    }

    async deleteProdById(id, prodId){
        await this.readData();

        let index = this.data.findIndex(elem => elem.id == id)
        if(index !== -1){
            let indexProd = this.data[index].products.findIndex(elem => elem.id == prodId)
            if(indexProd !== -1){
                this.data[index].products.splice(indexProd, 1);
                await this.writeData();
            }else{
                throw new Error("El carrito no contiene un producto con ese ID");
            }
        }
        else{
            throw new Error("No existe un carrito con ese ID");
        }
    }

    async readData(){
        const text = await fs.readFile( this.file , 'utf8' );
        this.data = JSON.parse(text);
    }

    async writeData(){
        await fs.writeFile(this.file, JSON.stringify(this.data, null, 2), 'utf8');
    }

}


module.exports = CartProducts;
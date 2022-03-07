const fs = require('fs').promises;

class CartProducts {
    constructor(file) {
        this.file = file;
    }

    async createNewCart(prods){
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);
        const last = data[data.length - 1];
        if(!prods){
            data.push({ id: last.id + 1, prods})
        }
        else data.push({ id: last.id + 1 })

        await fs.writeFile(this.file, JSON.stringify(data, null, 2), 'utf8');
        return last.id + 1;
    }

    async saveProds(prods, id) {
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);

        let index = data.findIndex(elem => elem.id === id)
        if(index !== -1){
            data[index].push({ ...prods });
        }
        else console.log("No existe un carrito con ese id");
        
        await fs.writeFile(this.file, JSON.stringify(data, null, 2), 'utf8');
        return console.log("Productos añadidos correctamente en el carrito.");
    }

    async getById(id) {
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);

        let index = data.findIndex(elem => elem.id === id)
        if(index !== -1){
            return data[index]
        }
        else return null;
    }

    async deleteById(id) {
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);

        let index = data.findIndex(elem => elem.id === id)
        if(index !== -1){
            data.splice(index, 1);
            await fs.writeFile(this.file, JSON.stringify(data), 'utf8');
        }
        else console.log("El id no existe o es erróneo");
    }

    async deleteProdById(id, prodId){
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);

        let index = data.findIndex(elem => elem.id === id)
        if(index !== -1){
            await fs.writeFile(this.file, JSON.stringify(data), 'utf8');
        }
        else console.log("El id no existe o es erróneo");
    }

}

module.exports = CartProducts;
const fs = require('fs').promises;

class CartProducts {
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);
        const last = data[data.length - 1];
        data.push({ id: last.id + 1, ...obj})

        await fs.writeFile(this.file, JSON.stringify(data, null, 2), 'utf8');
        return last.id + 1;
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

    async getAll() {
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);

        return data;
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

    async deleteAll() {
        const data = [];
        await fs.writeFile(this.file, JSON.stringify(data), 'utf8');
    }
}

module.exports = CartProducts;
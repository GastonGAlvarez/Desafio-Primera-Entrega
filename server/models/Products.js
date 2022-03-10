const fs = require('fs').promises;

class Products {
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        await this.readData();

        const last = data[data.length - 1] || 0;
        if(last == 0){
            data.push({ id: 1, ...obj})
        }else{
            data.push({ id: last.id + 1, ...obj})
        }

        await this.writeData();
        return last.id + 1;
    }

    async saveById(id, productUpdate) {
        await this.readData();

        let index = data.findIndex(elem => elem.id == id)
        if(index !== -1){
            data.splice(index, 1, {id, ...productUpdate});
            await this.writeData();
        }
        else{ 
            throw new Error("No existe un producto con ese id.");
        }
    }

    async getById(id) {
        await this.readData();

        let index = data.findIndex(elem => elem.id == id)
        if(index !== -1){
            return data[index];
        }
        else return null;
    }

    async getAll() {
        const data = await this.readData();

        return data;
    }

    async deleteById(id) {
        await this.readData();

        let index = data.findIndex(elem => elem.id == id)
        if(index !== -1){
            data.splice(index, 1);
            await this.writeData();
        }
        else console.log("El id no existe o es erróneo");
    }

    async deleteAll() {
        const data = [];
        await this.writeData();
    }

    async readData(){
        const text = await fs.readFile( this.file , 'utf8' );
        const data = JSON.parse(text);

        return data;
    }

    async writeData(){
        await fs.writeFile(this.file, JSON.stringify(data, null, 2), 'utf8');
    }
}

module.exports = Products;
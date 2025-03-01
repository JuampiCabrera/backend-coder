import fs from "node:fs";
import { promises } from "node:dns";
import { v4 as uuidv4 } from "uuid";
import path from 'path'

class ProductManager {
    constructor(path) {
        this.path = path;
        this.product = {}
        this.productsList = []
    }

    async getAllProducts() {
        try {
            if (fs.existsSync(this.path)) {
            const list = await fs.promises.readFile(this.path, "utf-8");
            this.productsList = [... JSON.parse(list).products]
            return [... this.productsList];
            } else return [];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProduct(id) {
        try {
            const products = await this.getAllProducts();
            const product = products.find((product) => product.id === id);
            if (!product) throw new Error("product not found");
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProduct(product) {
        await this.getAllProducts();
        let newProduct = {
            "id": uuidv4,
            "description": "",
            "title": "",
            "code": "",
            "price": 0,
            "status": true,
            "stock": 0,
            "category": ""
        }
        product.description ? newProduct.description = product.description : null
        product.title ? newProduct.title = product.title : null
        product.code ? newProduct.code = product.code : null
        product.price ? newProduct.price = product.price : null
        product.status ? newProduct.status = product.status : null
        product.stock ? newProduct.stock = product.stock : null
        product.category ? newProduct.category = product.category : null
        this.productsList.push(newProduct)
        await fs.promises.writeFile(this.path,JSON.stringify({ products: this.productsList }))
    }

    async updateProduct(product, id) {
        await this.getAllProducts();
        if (this.productsList.some(obj => obj.id == id)) {
            const prod = this.productsList.find(obj => obj.id == id)
            product.title ? prod.title = product.title : null
            product.description ? prod.description = product.description : null
            product.code ? prod.code = product.code :null
            product.price ? prod.price = product.price :null
            product.status ? prod.status = product.status :null
            product.stock ? prod.stock = product.stock :null
            product.category ? prod.category = product.category :null

            await fs.promises.writeFile(this.path,JSON.stringify({ products: this.productsList }))
            console.log("Producto Modificado")
        } else {
            console.log("ID no encontrado")
        }
    }

    async deleteProduct(id){
        await this.getAllProducts();
        if (this.productsList.some(obj => obj.id == id)) {
            const i = this.productsList.findIndex(obj => obj.id == id)
            this.productsList.splice(i,1)
            await fs.promises.writeFile(this.path,JSON.stringify({ products: this.productsList }))
            console.log("Producto Eliminado")
        } else {
            console.log("ID no encontrado")
        }
    }

    async deleteAllProducts() {
        try {
            const products = await this.getAllProducts();
            if (!products.length > 0) throw new Error("No existen productos");
            await fs.promises.unlink(this.path);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProductManager
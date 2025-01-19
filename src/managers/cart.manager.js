import fs from "fs";
import { promises } from "node:dns";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./product.manager.js";
import { __dirname } from "../utils.js";

const productManager = new ProductManager(__dirname + '/data/products.json');

class CartManager {
  constructor(path) {
    this.path = path;

    this.cart = {};
    this.cartList = [];
    this.productsListToCart = [];
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const list = await fs.promises.readFile(this.path, "utf-8");
        this.cartList = [...JSON.parse(list).carts];
        return [...this.cartList];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCart() {
    try {
      const newId = uuidv4;
      await this.getAllCarts();
      const newCart = { id: newId, products: [] };
      this.cartList.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify({ carts: this.cartList }));
      return newId;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCart(id) {
    try {
      await this.getAllCarts();
      if (this.cartList.some((obj) => obj.id == id)) {
        this.cart = this.cartList.find((obj) => obj.id == id);
        console.log("Producto Encontrado");
        return this.cart;
      } else {
        console.log("ID no encontrado");
        return null;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cid, pid) {
    const productsList = await productManager.getAllProducts();
    const cartsList = await this.getAllCarts();
    if (productsList.some((obj) => obj.id == pid)) {
      if (cartsList.some((obj) => obj.id == cid)) {
        const prod = productsList.find( obj  => obj.id == pid);
        const i = cartsList.findIndex( obj => obj.id == cid);
        if (cartsList[i].products.some( obj => obj.id == prod.id)) {
            const i2 = cartsList[i].products.findIndex( obj => obj.id == pid);
            cartsList[i].products[i2].cuantity ++
        } else {
            cartsList[i].products.push({"id":prod.id, "cuantity":1});
        }
        this.cartList = cartsList
        await fs.promises.writeFile(this.path,JSON.stringify({ carts: this.cartList })
        );
      } else {
        console.log("No Existe el ID Carrito");
      }
    } else {
      console.log("No Existe el ID producto");
    }
  }
}


export default CartManager;
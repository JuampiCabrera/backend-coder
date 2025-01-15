import { Router } from "express";
import ProductManager from "../managers/product.manager.js";
import CartManager from "../managers/cart.manager.js"
import { __dirname } from "../utils.js";

const router = Router();
const cartsManager = new CartManager(__dirname + '/data/carts.json');

router.post("/", async (req, res) => {
    try {
    res.json(await cartsManager.createCart());
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/:idCart", async (req, res) => {
    try {
        const { idCart } = req.params;
        res.json(await cartsManager.getCartById(idCart));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/:idCart/product/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const { idCart } = req.params;
    const response = await cartsManager.saveProdToCart(idCart, idProd);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router
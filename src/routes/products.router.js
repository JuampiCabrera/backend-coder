import { Router } from "express"
import ProductManager from "../managers/product.manager.js";
import { __dirname } from "../utils.js";
import { socketServer } from "../app.js";


const router = Router()
const productManager = new ProductManager(__dirname + '/data/products.json');

router.get("/", async (req, res) => {
    try {
        const prods = await productManager.getAllProducts();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const prods = await productManager.getProduct();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req,res)=>{
    const newProduct = req.body
    await productManager.addProduct(newProduct)
    const productsList = await productManager.getAllProducts()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)

})

router.put('/:pid', async (req,res)=>{
    const id = req.params.pid
    const newProduct = req.body
    await productManager.updateProduct(newProduct,id)
    const productsList = await productManager.getAllProducts()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)
})

router.delete('/:pid', async (req,res)=>{
    const id = req.params.pid
    await productManager.deleteProduct(id)
    const productsList = await productManager.getAllProducts()
    socketServer.emit('realtime', productsList)
    res.status(201).json({"mensaje": `Producto eliminado. id: ${id}'`})
})

export default router
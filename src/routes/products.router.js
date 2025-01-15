import { Router } from "express"
import ProductManager from "../managers/product.manager.js";
import { __dirname } from "../utils.js";
import { socketServer } from "../app.js";


const router = Router()
const productManager = new ProductManager(__dirname + '/data/products.json');

router.get("/", async (req, res) => {
    try {
        const prods = await productManager.getAll();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const prods = await productManager.getById();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req,res)=>{
    const newProduct = req.body
    await ProductManager.create(newProduct)
    const productsList = await productManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)

})

router.put('/:pid', async (req,res)=>{
    const id = req.params.pid
    const newProduct = req.body
    await productManager.update(newProduct,id)
    const productsList = await productManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)
})

router.delete('/:pid', async (req,res)=>{
    const id = req.params.pid
    await productManager.delete(id)
    const productsList = await productManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json({"mensaje": `Producto eliminado. id: ${id}'`})
})

export default router
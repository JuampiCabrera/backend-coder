import { Router } from "express"
import ProductManager from "../managers/product.manager.js";


const router = Router()


router.get("/", async (req, res) => {
    try {
        const prods = await ProductManager.getAll();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const prods = await ProductManager.getById();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req,res)=>{
    const newProduct = req.body
    await ProductManager.create(newProduct)
    const productsList = await ProductManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)

})

router.put('/:pid', async (req,res)=>{
    const id = req.params.pid
    const newProduct = req.body
    await ProductManager.update(newProduct,id)
    const productsList = await ProductManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)
})

router.delete('/:pid', async (req,res)=>{
    const id = req.params.pid
    await ProductManager.delete(id)
    const productsList = await ProductManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json({"mensaje": `Producto eliminado. id: ${id}'`})
})

export default router
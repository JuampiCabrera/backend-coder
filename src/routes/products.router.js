import { Router } from "express"
import {prodManager} from "../managers/product.manager.js"


const router = Router()


router.get("/", async (req, res) => {
    try {
        const prods = await prodManager.getAll();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const prods = await prodManager.getById();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req,res)=>{
    const newProduct = req.body
    await prodManager.create(newProduct)
    const productsList = await prodManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)

})

router.put('/:pid', async (req,res)=>{
    const id = req.params.pid
    const newProduct = req.body
    await prodManager.update(newProduct,id)
    const productsList = await prodManager.getAll()
    socketServer.emit('realtime', productsList)
    res.status(201).json(newProduct)
})

router.delete('/:pid', async (req,res)=>{
    const id = req.params.pid
    await prodManager.delete(id)
    const productsList = await prodManager.getAllProducts()
    socketServer.emit('realtime', productsList)
    res.status(201).json({"mensaje": `Producto eliminado. id: ${id}'`})
})

export default router
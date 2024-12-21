import express from 'express'
import { Router } from "express"


const router = Router()


router.get("/", async (req, res) => {
    try {
        const prods = await prodManager.getAll();
        res.status(200).json(prods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/api/products/:pid', (req,res) => {
    const productId = req.params.pid
    const producto = products.find(prod => prod.id === productId)

    if(producto){
        res.status(200).send(producto)
    }else {
        res.status(404).send('el producto no existe')
    }
})

router.post('/api/products', (req, res)=> {
    let {nombre, marca, precio, stock} =req.body

    const newProducts = {
        id: crypto.randomBytes(10).toString('hex'),
        nombre: nombre,
        marca: marca,
        precio: precio,
        stock: stock,
    }
    products.push(newProducts)

    res.status(201).send(`Producto creado: ${newProducts.id}`)
})

router.put('/api/products/:pid', (req,res) => {
    const productId = req.params.pid
    let {nombre, marca, precio, stock} = req.body

    const indice  = products.findIndex(prod => prod.id === productId)

    if(indice != -1){
        products[indice].nombre = nombre
        products[indice].marca = marca
        products[indice].precio = precio
        products[indice].stock = stock
        res.status(200).send("producto actualizado correctamente")
    }else {
        res.status(404).send('el producto no existe')
    }
})

router.delete('/api/products/:pid', (req, res)=>{
    const productId = req.params.pid

    const indice = products.findIndex(prod => prod.id === productId)

    if(indice != -1){
        products.splice(indice, 1) 
        res.status(200).send('producto eliminado')
    } else{
        res.status(404).send('el producto no existe')
    }
})

export default router
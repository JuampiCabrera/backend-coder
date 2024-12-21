import express from 'express'
import { Router } from "express"


const router = Router()
const cart = []


router.get('/api/cart', (req,res) => {

    res.status(200).send(cart)
    
    })

router.get('/api/cart/:pid', (req,res) => {
    const itemId = req.params.pid
    const item = cart.find(item => item.id === itemId)

    if(item){
        res.status(200).send(cart)
    }else {
        res.status(404).send('el producto no existe')
    }
})

router.post('/api/cart', (req, res)=> {

    res.status(201).send(`Producto creado: `)
})

router.put('/api/cast/:pid', (req,res) => {
    const productId = req.params.pid
    let {nombre, marca, precio, stock} = req.body

    const indice  = products.findIndex(prod => prod.id === productId)

    if(indice != -1){
        item[indice].nombre = nombre
        item[indice].marca = marca
        item[indice].precio = precio
        item[indice].stock = stock
        res.status(200).send("producto actualizado correctamente")
    }else {
        res.status(404).send('el producto no existe')
    }
})

router.delete('/api/products/:pid', (req, res)=>{
    const itemId = req.params.pid

    const indice = items.findIndex(item => item.id === itemId)

    if(indice != -1){
        items.splice(indice, 1) 
        res.status(200).send('producto eliminado')
    } else{
        res.status(404).send('el producto no existe')
    }
})

export default router
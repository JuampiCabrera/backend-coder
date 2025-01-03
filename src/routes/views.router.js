import { Router } from "express";

const router = Router()

//callback --> controlador --> logica 
router.get('/', (req, res) => {
    const user = {
        name: 'juampi',
        last_name: 'cabrera',
        role:  'admin'
    }

    const products = [
        {title: 'producto 1', price: 5000},
        {title: 'producto 2', price: 6000},
        {title: 'producto 3', price: 6000},
        {title: 'producto 4', price: 6000},
        {title: 'producto 5', price: 6000},
    ]
    res.render('home', {
        user,
        products,
        isAdmin: user.role === 'admin',
        hayProductos: products.length != 0,
        titlePage: 'HOME'
    })
})

export default router
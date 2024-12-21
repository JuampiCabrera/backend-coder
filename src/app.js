import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import path from 'path'


const PORT = 8080
const app = express() 

app.use(express.urlencoded({extended:true}))
app.use(express.json()) 
app.use('/static',express.static(path.join(process.cwd(), "src", "public")))

const middleware = (req, res, next) => {
    console.log('Time: ', data.now())
    req.username = 'juan'
    netx()
}

app.use(middleware)

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

app.listen(PORT, () =>{
    console.log("server on port ", PORT);
    
})
import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import realTimeProducts from './routes/realtimeproducts.router.js'
import { __dirname } from './utils.js'
import  handlebars  from 'express-handlebars'
import  {Server} from 'socket.io'
import ProductManager from './managers/product.manager.js'



const app = express() 
const productManager = new ProductManager(__dirname + '/data/products.json');

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

//configuracion motor de plantilla 

app.engine('handlebars', handlebars.engine()) 
app.set('views', __dirname + "/views")
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use('/realtimeproducts', realTimeProducts)


const PORT = 8080
const httpServer = app.listen(PORT, () =>{
    console.log("server on port ", PORT);
})

export const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket)=>{
    console.log(`Nuev.Disp.Conect. ID: ${socket.id}`)
    const productsList = await productManager.getAllProducts()
    socket.emit('home', productsList)
    socket.emit('realtime', productsList)
    socket.on('nuevo-producto', async(producto)=>{
        await productManager.addProduct(producto)
        socketServer.emit('realtime', productsList) 
    })
    socket.on('update-producto', async (producto)=>{
        await productManager.updateProduct(producto, producto.id)
        socketServer.emit('realtime',productsList)
    })
    socket.on('delete-product', async(id) => {
        await productManager.deleteProduct(id)
        socketServer.emit('realtime', productsList)
    })
})
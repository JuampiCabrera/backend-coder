import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import realTimeProducts from './routes/realtimeproducts.js'
import logger from 'morgan'
import { __dirname } from './utils.js'
import  handlebars  from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import { prodManager } from './managers/product.manager.js'


const app = express() 

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static(__dirname +  "/public"))
app.use(logger('dev'))

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
    const productsList = await prodManager.getAll()
    socket.emit('home', productsList)
    socket.emit('realtime', productsList)
    socket.on('nuevo-producto', async(producto)=>{
        await prodManager.create(producto)
        socketServer.emit('realtime', productsList) 
    })
    socket.on('update-producto', async (producto)=>{
        await prodManager.update(producto, producto.id)
        socketServer.emit('realtime',productsList)
    })
    socket.on('delete-product', async(id) => {
        await prodManager.delete(id)
        socketServer.emit('realtime', productsList)
    })
})
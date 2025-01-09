import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import logger from 'morgan'
import path from 'path'
import { __dirname } from './utils.js'
import uploader from './utils/multer.js'
import  handlebars  from 'express-handlebars'
import viewsRouter from './routes/views.router.js'


const app = express() 
const PORT = 8080

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static(path.join(process.cwd(), "src", "public")))
app.use(logger('dev'))

//configuracion motor de plantilla

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
})) 
app.set('view engine', 'hbs')
app.set('views', __dirname + "/views")


app.post('/subirarchivo', uploader.single('myFile'), (req, res) => {
    res.send('archivo subido')
})

app.use('/', viewsRouter)

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

app.listen(PORT, () =>{
    console.log("server on port ", PORT);
    
})
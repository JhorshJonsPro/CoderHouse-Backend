import express from 'express'
import routerProd from './routes/products.routes.js'
import { __dirname } from './path.js'
import path from 'path'

import { engine } from 'express-handlebars'
import routerUser from './routes/users.route.js'

const PORT = 4000
const app = express()

app.engine('handlebars', engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json())//permite enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true }))//permite extenciones en la url

app.use('/users', routerUser)

app.use('/api/products', routerProd)
app.use('/static', express.static(path.join(__dirname, '/public')))

app.listen(PORT, () => {

})  
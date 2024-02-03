import {promises as fs} from 'fs'
//import crypto from 'crypto'
import uuid4 from 'uuid4'

export class ProductManager {
      constructor(path){
            this.productos = []
            this.path = path
      }

      async getProducts(){
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if(prods.lenght == 0){
                  return "no hay productos"
            }
            return prods
      }

      async getProductByID(id){
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const prod = prods.find(producto => producto.id === id)
            return prod
      }

      async addProduct(prod){
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const existProd = prods.find(producto => producto.id === prod.id)
            if(existProd){
                  return false
            }else{
                  //prod.id = crypto.randomBytes(16).toString('hex')
                  prod.id = uuid4()
                  prods.push(prod)
                  await fs.writeFile(this.path, JSON.stringify(prods))
                  return true
            }
            
      }

      async updateProduct(id, producto){
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const prod = prods.find(producto => producto.id === id)
            if(prod){
                  prod.title = producto.title
                  prod.description = producto.description
                  prod.price = producto.price
                  prod.stock = producto.stock
                  prod.code = producto.code
                  prod.status = producto.status
                  prod.category = producto.category
                  prod.thumbnails = producto.thumbnails
                  prods.push(prod)
                  await fs.writeFile(this.path, JSON.stringify(prods))
                  return true
            }else{
                  return false
            }
      }

      async deleteProduct(id){
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const prod = prods.find(producto => producto.id === id)
            if(prod){
                  await fs.writeFile(this.path, JSON.stringify(prods.filter(producto => producto.id !== id)))
                  return true
            }else{
                  return false
            }
      }

}
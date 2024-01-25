import {promises as fs} from 'fs'



export class productManager{
  constructor(path){
    this.products = []  
    this.path = path
  }

  async getAllProducts(){
    let prods = JSON(await fs.readFile(this.path, 'utf-8'))
    if(prods.length <= 0){
      console.log('No hay productos en la base de datos !!')
    }else{
      console.log(prods)
    }
    
  }

  async deleteProduct(id){
    let prods = JSON(await fs.readFile(this.path, 'utf-8'))


    const arrayNew = prods.filter((ele) => {
      return ele.id !== id
    })

    await fs.promises.writeFile(this.path, JSON.stringify(arrayNew, null, 2), 'utf-8')
    console.log('Producto Elminado!!')
  }

  async updateProduct(id, infoNew){
      let prods = JSON(await fs.readFile(this.path, 'utf-8'))

    let arrayUpdated = prods.map((ele)=> {
      if(ele.id == id){
        return {...ele,   title:infoNew.title, price:infoNew.price}
      }else{
        return ele
      }
    })

    console.log(arrayUpdated)
    await fs.promises.writeFile(this.path, JSON.stringify(arrayUpdated, null, 2), 'utf-8')
    console.log('Producto Actualizado!!')

  }
}

let newPr = new MangerProduct('./productos.json')

//newPr.deletrreProducto('ldfldsg.545564567fds87f')
newPr.updateProduct('lhjtsa9h0.2538265a71cd', {price: 156666, title:"TITULOMODIFICADO"})
newPr.getAllProducts()
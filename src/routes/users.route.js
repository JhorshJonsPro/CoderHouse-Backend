import Router from 'express'

const routerUser = new Router()

routerUser.get('/home', (req, res) => {
      res.render('home')
      // res.send('holaaaa')
})

export default routerUser
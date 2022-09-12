const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8081',
  // 'Access-Control-Allow-Methods': 'OPTIONS',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'Content-Type, custome-header'
}

const router = express.Router()

router.post('/more/credentials', (req, res) => {
  console.log('server2 post req.cookies: ', req.cookies)
  console.log('server2 post req.body: ', req.body)
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/credentials', (req, res) => {
  console.log('server2 options req.cookies: ', req.cookies)
  console.log('server2 options req.body: ', req.body)
  res.set(cors)
  res.end()
})

router.get('/more/credentials', (req, res) => {
  res.set(cors)
  res.end('cors get')
})

app.use(router)

const port = 7001
module.exports = app.listen(port, () => {
  console.log(`server 2 listening on http://localhost:${port}`)
})

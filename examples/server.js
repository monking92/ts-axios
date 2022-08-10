const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  // publicPath: '/__build__/',
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: true
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

registSimpleRouter()
registBaseRouter()
registErrorRouter()
registExtendRouter()
registInterceptor()
registConfigRouter()
registCancelRouter()

function registSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })
}

function registBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        console.log('chunk: ', chunk)
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({ msg: 'hello world, path: error/get' })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({ msg: 'hello world, path: error/timeout' })
    }, 3000)
  })
}

function registExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })


  router.get('/extend/mobile', function(req, res) {
    res.json({
      code: 1,
      msg: 'success',
      data: {
        wp: 'Lumia 950XL',
        ios: 'IPhone XSMax',
        android: 'Vivo X50Pro'
      }
    })
  })
}

function registInterceptor() {
  router.post('/interceptor/post', function(req, res) {
    res.json({
      code: 1,
      msg: 'success',
      data: {
        bar: '0'
      }
    })
  })
}

function registConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function registCancelRouter() {
  router.get('/cancel/get', function(req, res) {
    res.json({ msg: 'get, cancel axios' })
  })

  router.post('/cancel/post', function(req, res) {
    res.json({ msg: 'post, cancel axios' })
  })
}


app.use(router)

const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}, Ctrl+C to stop`)
})

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

require('./server2')

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

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('xsrf-sun', 456)
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

registSimpleRouter()
registBaseRouter()
registErrorRouter()
registExtendRouter()
registInterceptor()
registConfigRouter()
registCancelRouter()
registMoreRouter()
registProgressRouter()

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
    setTimeout(() => {
      res.json({ msg: 'get, cancel axios' })
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json({ msg: 'post, cancel axios' })
    }, 1000)
  })
}

function registMoreRouter() {
  /* router.get('/more/credentials/get', function(req, res) {
    console.log('get: ', req.cookies)
    res.json(req.cookies)
  }) */

  router.get('/more/credentials', function(req, res) {
    console.log('get: ', req.cookies)
    res.json(req.cookies)
  })

  router.post('/more/xsrf', function(req, res) {
    console.log('xsrf post: ')
    res.cookie('xsrf-sun', 123)
    res.json({ 'set-cookie': 'xsrf-sun' })
  })
}

function registProgressRouter() {
  router.post('/progress/upload/post', function(req, res) {
    res.json('upload success')
  })
}


app.use(router)

const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}, Ctrl+C to stop`)
})

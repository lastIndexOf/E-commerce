const
	Koa = require('koa')
  session = require('koa-session2'),
  renderer = require('koa-views'),
  bodyParser = require('koa-bodyparser'),
  Router = require('koa-router'),
  static = require('koa-static2')

const config = require('./config.js').serverConfig
const app = new Koa()

const router = new Router()
const render = renderer('./app/view', {
	map: { html: 'pug' },
	extension: 'pug'
})

require('./router/router.js')(router)

app
	.use(static('/static', './dist'))
	.use(render)
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())

app.listen(config.port, () => {
	console.log(`server running at http://localhost:${ config.port }`)
})


const
	Koa        =  require('koa'),
  session    =  require('koa-session'),
  renderer   =  require('koa-views'),
	bodyParser =  require('koa-bodyparser'),
  Router     =  require('koa-router'),
  static     =  require('koa-static2'),
	logger     =  require('koa-logger'),
	mongoose   =  require('mongoose')

mongoose.Promise = Promise
const config = require('./config.js')
const app = new Koa()

const router = new Router()
const render = renderer('./app/view/html', {
	map: { html: 'pug' },
	extension: 'pug'
})

if (config.env === 'development') {
	mongoose.set('debug', true)
}

mongoose.connect(config.db.url, err => {
	if (err)
		console.error(err)
	else
		console.log('connect to mongoDB success!')
})

require('./router/router.js')(router)

app.keys = config.keys

app
	.use(logger())
	.use(static('/static', './dist'))
	.use(render)
	.use(session(config.session, app))
	.use(bodyParser({ formLimit: '50mb' }))
	.use(router.routes())
	.use(router.allowedMethods())

app.listen(config.serverConfig.port, () => {
	console.log(`server running at http://localhost:${ config.port }`)
})

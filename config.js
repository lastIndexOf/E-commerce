const serverPort = 4000

module.exports = {
	enter: 'type.js',
 	server: 'server.js',
 	proxy: `http://localhost:${ serverPort }`,  // 需要开启代理监听的端口
 	port: 4555, // 开启代理的端口号
	env: 'development',
 	serverConfig: {
 		port: serverPort
 	},
	db: {
		host: '',
		password: '',
		port: 27017,
		url: 'mongodb://localhost:27017/commerce'
	},
	keys: ['this is secret'],
	session: {
		key: 'koa:sess',
		maxAge: 86400000,
		overwrite: true,
		httpOnly: true,
		signed: true
	}
}

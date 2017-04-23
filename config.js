const serverPort = 3200

module.exports = {
	enter: 'canvas.js',
 	server: 'server.js',
 	proxy: `http://localhost:${ serverPort }`,  // 需要开启代理监听的端口
 	port: 3333, // 开启代理的端口号
 	serverConfig: {
 		port: serverPort
 	}
}
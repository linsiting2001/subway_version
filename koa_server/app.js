//服务器的入口文件
//1. 创建koa的实例对象
//首先安装 koa npm install -g koa
const Koa = require('koa')

const app = new Koa()
//2.绑定中间件
//绑定第一层中间件
const resDurationMiddleware = require('./middleware/koa_response_duration')
app.use(resDurationMiddleware)
//绑定第二层中间件
const resHeaderMiddleware = require('./middleware/koa_response_header')
app.use(resHeaderMiddleware)
//绑定第三层中间件
const resDataMiddleware = require('./middleware/koa_response_data')
app.use(resDataMiddleware)

//3.绑定端口号 8082
app.listen(8082)
//4.设置响应头 允许跨域
// app.use(async,(ctx,next) => {
//     ctx.set("Access-Control-Allow-Origin", "*")
//     ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE")
//     await next()
// })

const webSocket = require('./service/webSocket_service')
//开启服务器端的监听， 监听客户端的连接
//当一个客户端连接成功之后，就会对这个客户端进行message事件的监听
webSocket.listen()

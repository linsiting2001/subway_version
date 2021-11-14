const path = require('path')
const webSocket = require('ws')
const fileUtils = require('../utils/file_utils')
//1.创建webSocket服务器对象，绑定端口号 9998
const ws = new webSocket.Server({
    port: 9998
})
//服务器端开始了监听
module.exports.listen = () => {
    //2.连接事件监听 client 代表的是客户端连接socket对象
    ws.on('connection', client => {
        console.log('有客户连接成功...')
        //3.对客户端的连接对象进行message事件的监听 msg 是客户端发送给服务器端的数据
        client.on('message', async msg => {
            console.log('客户端发送数据给服务端了：' + msg)
            let payload = JSON.parse(msg)
            const action = payload.action
            if(action === 'getData'){
               // payload.chartName  yearpl trend train pie map linepl
                let filePath = '../data/' + payload.chartName + '.json'
                filePath = path.join(__dirname,filePath)
                const ret = await fileUtils.getJsonData(filePath)
                //需要在服务端获取数据的基础上，增加一个data的字段
                // data所对应的值就是json文件的内容
                payload.data = ret
                client.send(JSON.stringify(payload))
            }else {
                //原封不动的将所接收到的数据发送给每一个处于连接状态的客户端
                // ws.clients 获取所有客户端的连接
                ws.clients.forEach(client => {
                    //???
                    client.send(msg)
                })
            }
            // 4.由服务器端往客户端发送数据
            //client.send('hello socket from backend!')
        })
    })
}

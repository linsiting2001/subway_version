//处理业务逻辑的中间件，读取某个json文件的数据
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async(ctx,next) => {
    //获取url
    const url = ctx.request.url
    let filePath = url.replace('/api','')
    filePath = '../data' + filePath + '.json'
    filePath = path.join(__dirname,filePath)
    try{
        const res = await fileUtils.getJsonData(filePath)
        ctx.response.body = res
    } catch(error){
        const err = {
            message: '读取文件内容失败，文件资源不存在',
            status:404
        }
        ctx.response.body = JSON.stringify(err)
        console.log(filePath)
        await next()
    }
}
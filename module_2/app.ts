import express from 'express'
import bodyParser from 'body-parser'
//导入路由，接口
import demoRouter from './routes/demo'


const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// 拦截所有请求
// extended: false  方法内部使用 querystring 模块处理请求参数的格式
// extended: true   方法内部使用第三方模块 qs 来处理请求参数的格式
app.use(bodyParser.urlencoded({
  extended: false
}));
//配置新增的路由（接口），如此便可以在postman中发起请求
app.use('/users', demoRouter)



//监听端口
app.listen(3000) //请求时的端口：localhost:3000
console.log("服务启动成功！")
export default app
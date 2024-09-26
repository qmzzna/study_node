import express from 'express'
import bodyParser from 'body-parser'
//导入路由，接口
import demoRouter from './routes/demo'
import morgan from 'morgan'

//导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');
//导入用于将客户端发送过来的JWT字符串解析还原成JSON对象的包
const expressJWT = require('express-jwt');
//secret 密钥的本质: 一个字符串
const secretKey = 'secretkey!!!'

const cors = require('cors')

const app = express();

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
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


function error_handler_middleware(err:any,res:any){
  if(err){
    const{statusMessage,method} = err
    // console.log('111',statusMessage,statusCode,method,err);
    res.status(404).json({
      code: 404,
      method: `${method }`,
      message:`${statusMessage|| '服务器异常'}`
    })
  }else{

  }
}
// app.use(error_handler_middleware)

// 容错， 就算报错也不退出程序
process.on('uncaughtException', function(err) {
  console.error(' Caught exception: ' + err.stack);
});


//登录接口
app.post('/api/login', (req, res) => {
  //将 req.body 请求体中的数据 转存为 userinfo 常量
  const userinfo = req.body;
  //登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
      return res.send({
          status: 400,
          msg: '登录失败!'
      })
  }
  //登录成功
  //在登录成功之后 调用 jwt.sign() 方法生成JWT字符串 并通过 token 属性发送给客户端
  //参数1: 用户的信息对象
  //参数2: 加密的密钥
  //参数3: 配置对象 可以配置当前 token 的有效期
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' });
  res.send({
      status: 200,
      msg: '登录成功',
      token: tokenStr //要发送给客户端的token字符串
  })
})
//使用 app.use() 注册将JWT字符串解析还原成JSON对象的中间件
//.unless() 方法通过正则表达式 指定哪些接口不需要通过权限
//正则中 '\'用来转义 '^'表示指定以什么开头的字符串
app.use(expressJWT({ secret: secretKey,algorithms:['HS256'] }).unless({path: [/^\/api\//]}));
//如果出现报错 尝试在 secret: secretKey的后面加上 ", algorithms: ['HS256'] "


//有权限的接口
app.get('/admin/getinfo', (req:any, res) => {
  //使用 req.user 获取用户信息 并使用data属性将用户信息发送给客户端
  console.log(req.user);
  res.send({
      status: 200,
      message: '获取用户信息成功!',
      data: req.user //要发送给客户端的信息
  })
})

app.use((err:any,res)=>{
  if(err.name==='UnauthorizedError'){
      return res.send({status:401,message:'无效token'})
  }
  res.send({status:500,message:'未知错误'})
})

//监听端口
app.listen(3000) //请求时的端口：localhost:3000
console.log("服务启动成功！")
export default app
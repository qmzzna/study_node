import express from 'express'
import {urlencodedParser,validateSchema} from '../utils/index';
import userSchema from '../utils/userSchema';
import user from '../controller/userController'


const router = express.Router()



//添加学生
router.post('/add', validateSchema(userSchema), (req, res) => {
  const result =  user.add(req.body)
  result.then(data => {
    res.json({
      data
    })
  })
})


//查询学生
router.get('/query', (req, res,next) => {
  const result = user.query();
  result.then((data)=> {
    // res.json({
    //   data
    //   // data:data.filter(item=>item.isDelete = true)
    // })
    res.send({
      status: 200,
      message: '获取用户信息成功!',
      data: data //要发送给客户端的信息
  })

  }).catch(next)
})

//根据id查询学生
router.get('/queryById/:id', (req, res) => {
    const {id} = req.params
    const result = user.queryById(id);
    result.then(data=> {
      res.send({
        status: 200,
        message: '获取信息成功!',
        data: data //要发送给客户端的信息
    })
    })
})

//修改学生
router.put('/update', urlencodedParser, (req, res) => {
  const result = user.update(req.query)
  result.then(()=>{
    res.send({
      status: 200,
      message: '修改成功!',
  })
  })
})

//删除学生
router.delete("/delelte", (req, res) => {
  const result = user.del(req.query.login)
  console.log('result',result);
  result.then(() => {
    res.send({
      status: 200,
      message: `成功删除${req.query.login}`,
   })
  })
})

export default router
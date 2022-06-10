import express from 'express'
import {urlencodedParser,validateSchema} from '../utils/index';
import userSchema from '../utils/userSchema';
import user from '../controller/userController'
import { any, ArraySchema, object } from 'joi';

let router = express.Router()

//添加学生
router.post('/add', validateSchema(userSchema), (req, res, next) => {
  let result = user.add(req.body)
  result.then(data => {
    console.log('data', data);
    res.json({
      data
    })
  })

})

//查询学生
router.get('/query', (req, res, next) => {
  let result = user.query();
  result.then(data=> {
    res.json({
      data
    })
  })
})

//修改学生
router.put('/update', urlencodedParser, (req, res, next) => {
  let result = user.update(req.query)
  result.then(row => {
    res.json({
      row
    })
  })
})

//删除学生
router.delete("/delelte", (req, res, next) => {
  let result = user.del(req.query.login)
  result.then(row => {
    res.json({
      row
    })
  })
})

export default router
import express from 'express'
import bodyParser from 'body-parser'
let router = express.Router()
import user from '../controller/userController'
import Joi from 'joi'

// 解析提交的form表单参数
let urlencodedParser = bodyParser.urlencoded({
  extended: true
})

function errorResponse(schemaErrors:any) {
  const errors = schemaErrors.map((error:any) => {
    let {
      path,
      message,
    } = error;
    return {
      path,
      message,
    }
  });
  return {
    status: 'failed',
    errors,
  }
}

function validateSchema(schema:any) {
  return (req:any, res:any, next:any) => {
    const {
      error
    } = schema.validate(req.body, {
      abortEarly: false,
      allowUkown: false,
    });

    if (error.isJoi) {
      res.status(400).json(errorResponse(error.details));
    } else {
      next()
    }
  }
}

const userSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  age: Joi.number().integer().min(4).max(130),
  isDelete: Joi.boolean().required(),
})

//添加学生
router.post('/add', validateSchema(userSchema), (req, res, next) => {
  let result = user.add(req.body)
  result.then(data => {
    console.log('data', data);
    if (data.id > 1) {
      res.json({
        code: 200,
        msg: "添加成功",
        data
      })
    } else {
      res.json({
        code: 500,
        msg: "添加失败",
        data
      })
    }
  })

})

//查询学生
router.get('/query', (req, res, next) => {
  let result = user.query();
  result.then(data => {
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
router.delete("/del", (req, res, next) => {
  let result = user.del(req.query.login)
  result.then(row => {
    res.json({
      row
    })
  })
})

export default router
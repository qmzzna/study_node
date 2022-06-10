import bodyParser from 'body-parser'

// 解析提交的form表单参数
 const urlencodedParser = bodyParser.urlencoded({
  extended: true
})


function validateSchema(schema:any) {
  return (req:any, res:any, next:any) => {
    const {
      error
    } = schema.validate(req.body, {
      abortEarly: false,
      allowUkown: false,
    });
    next()

    // if (error.isJoi) {
    //   res.status(400).json(errorResponse(error.details));
    // } else {
    //   next()
    // }
  }
}

export  {urlencodedParser,validateSchema}